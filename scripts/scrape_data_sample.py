# Script to scrape data from IMDB database

# need to install from:
# pip install cinemagoer
from imdb import Cinemagoer

# create an instance of the Cinemagoer class
ia = Cinemagoer()

# get a movie by movie id on the imdb website, which is a 7-digit string
# you can visit the website of the movie on imdb with (https://www.imdb.com/title/tt{movie_id}/)

# we chose 4 movies in this example, which are: The Matrix 1-4
# hardcoded the four movie ids
movie_ids  = ['0133093', '0234215', '0242653', '10838180']
for movie_id in movie_ids:
    
    movie = ia.get_movie(movie_id)
    print("Info for Movie ID ={}".format(movie_id))
    print('Title:')
    print(movie['title'])
    # print the casts of the directors of the movie
    print('Casts:')
    for cast in movie['cast']:
        print(cast)
    print('Year:')
    print(movie['year'])
    print('Time:')
    print(movie['runtimes'])
    print('Language:')
    for language in movie['language codes']:
        print(language)
    # print the names of the directors of the movie
    print('Directors:')
    for director in movie['directors']:
        print(director['name'])

    # print the genres of the movie
    print('Genres:')
    for genre in movie['genres']:
        print(genre)

