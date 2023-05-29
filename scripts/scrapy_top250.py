# Script to scrape data from IMDB database

# need to install from:
# pip install cinemagoer
from imdb import Cinemagoer
import os
# create an instance of the Cinemagoer class
ia = Cinemagoer()


def insert_person(type, person):
    person_id = person.personID
    person_name = person["name"]
    names = person_name.split(" ")
    first_name = ""
    surname = ""
    index = 0
    for part in names:
        if index == 0:
            first_name = part
        elif index == 1:
            surname += part
        else:
            surname += " " + part
        index += 1

    return f"INSERT IGNORE INTO {type} VALUES ({person_id}, \"{first_name}\", \"{surname}\");\n"


top = ia.get_top250_movies()

insert_movies = "BEGIN;\n"
insert_actors = "BEGIN;\n"
insert_genres = "BEGIN;\n"
insert_directors = "BEGIN;\n"
insert_movie_genres = "BEGIN;\n"
insert_directions = "BEGIN;\n"
insert_casts = "BEGIN;\n"

count = 0
genre_id = 1
genre_ids = {}
for movie in top:
    id = movie.movieID
    mv = ia.get_movie(id)
    name = mv["title"]
    year = mv["year"]
    runtime = mv["runtimes"]
    rate = mv["rating"]
    insert_movie = f"INSERT INTO Movie VALUES ({id}, \"{name}\", {year}, {int(runtime[0])}, {rate}, 0);\n"
    insert_movies += insert_movie

    genres = mv["genres"]
    for genre in genres:
        if genre not in genre_ids:
            genre_ids[genre] = genre_id
            insert_genre = f"INSERT INTO Genre VALUES ({genre_id}, \"{genre}\");\n"
            insert_genres += insert_genre
            genre_id += 1

        insert_movie_genre = f"INSERT INTO Movie_Genre VALUES ({genre_ids[genre]}, {mv.movieID});\n"
        insert_movie_genres += insert_movie_genre

    for cast in mv["cast"]:
        insert_actor = insert_person("Actor", cast)
        insert_actors += insert_actor
        insert_cast = f"INSERT INTO Cast VALUES ({cast.personID}, {mv.movieID});\n"
        insert_casts += insert_cast

    for director in mv["directors"]:
        insert_director = insert_person("Director", director)
        insert_directors += insert_director
        insert_direction = f"INSERT INTO Direction VALUES ({director.personID}, {mv.movieID});\n"
        insert_directions += insert_direction

    count += 1
    print("processing movie", count)

print("done!")
insert_movies += "COMMIT;\n"
insert_actors += "COMMIT;\n"
insert_genres += "COMMIT;\n"
insert_directors += "COMMIT;\n"
insert_movie_genres += "COMMIT;\n"
insert_directions += "COMMIT;\n"
insert_casts += "COMMIT;\n"

cur_path = os.path.dirname(__file__)
new_path = os.path.relpath('../sql/production-data.sql', cur_path)

file = open(new_path, "w", encoding="utf-8")
file.write(insert_movies)
file.close()

file = open(new_path, "a", encoding="utf-8")
file.write(insert_actors)
file.write(insert_genres)
file.write(insert_directors)
file.write(insert_movie_genres)
file.write(insert_directions)
file.write(insert_casts)
file.close()
