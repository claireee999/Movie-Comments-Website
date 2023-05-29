from flask import Flask, render_template, request, url_for, redirect, send_file, jsonify
from flask_cors import CORS, cross_origin
from connection import connect

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

# api for feature 1,2,3,4
@app.route("/", methods=['POST', 'GET'])
def main():
    if request.method == 'GET':
        data = connect("SELECT * FROM Movie ORDER BY (avg_rate) DESC")
        return jsonify(data)
    elif request.method == 'POST':
        searchTerm = request.get_json()
        sql_str = "SELECT * FROM("
        sql_str += "SELECT *, RANK() OVER (ORDER BY (avg_rate) DESC) as r FROM Movie WHERE name LIKE '%" + searchTerm['data'] + \
                  "%' and avg_rate >= " + str(searchTerm['grt_n']) + ") as T"
        #sql_str += " ORDER BY (avg_rate) DESC LIMIT " + str(searchTerm['num']) + ") as T"
        sql_str += " WHERE T.r <= " + str(searchTerm['num'])
        if searchTerm['order'] == 'Rating High to Low':
            sql_str += ' ORDER BY (avg_rate) DESC '
        elif searchTerm['order'] == 'Rating Low to High':
            sql_str += ' ORDER BY (avg_rate) ASC '

        #print(sql_str)
        data = connect(sql_str)
        return jsonify(data)

@app.route('/comment', methods=['GET'])
def get_comments():
    movie = request.args
    sql = "SELECT rid, rate, comment FROM Rating where mid = " + str(movie.get('id'))
    data = connect(sql)
    d = []
    for entry in data:
        username = connect("SELECT username FROM Reviewer WHERE id = " + str(entry[0]))
        rating = entry[1]/2
        d.append((username[0][0], rating, entry[2]))
    # print(d)
    return jsonify(d)


# api for feature 5
@app.route('/add_review', methods=['POST'])
def add_review():
    if request.method == 'POST':
        # review json content
        # reviews['rname']: reviewer name
        # reviews['mid']: movie id
        # reviews['rating']: rating, a number
        # reviews['comment']: string
        review = request.get_json()
        # print(rid)
        search_reviewer = "SELECT * FROM Reviewer WHERE username = '" + str(review['username']) + "'"
        reviewer = connect(search_reviewer)
        if reviewer:
            id = connect("SELECT id FROM Reviewer WHERE username = '" + reviewer[0][1] + "'")
            rid = id[0][0]
            find_review = "SELECT * FROM Rating WHERE rid = " + str(rid) + " and mid = " + str(review['mid'])
            review_exist = connect(find_review)
            # print("r:", bool(review_exist))
            if review_exist:
                connect("UPDATE Rating SET rate = " + str(review['rating']) + ", comment = '" +
                        str(review['comment']) + "' WHERE rid = " + str(rid) + " and mid = " + str(review['mid']))
            else:
                # print("INSERT INTO Rating VALUES (%d, %d, %d, '" % (rid, review['mid'], review['rating']) + review['comment'] + "');")
                connect("INSERT INTO Rating VALUES (%d, %d, %d, '" % (rid, review['mid'], review['rating']) + review['comment'] + "');")
        else:
            add_reviewer = "INSERT INTO Reviewer (username, num_of_ratings) VALUES ('" + str(review['username']) + "', 0);"
            connect(add_reviewer)
            id = connect("SELECT id FROM Reviewer WHERE username = '" + str(review['username'] + "'"))
            rid = id[0][0]
            connect("INSERT INTO Rating VALUES (%d, %d, %d, '" % (rid, review['mid'], review['rating']) + review['comment'] + "');")

        result = "Comment added"
        return jsonify(result)

# feature for updating rating
@app.route('/update_review', methods=['POST'])
def update_review():
    if request.method == 'POST':
        # review json content
        # reviews['rname']: reviewer name
        # reviews['mname']: movie name
        # reviews['rating']: rating, a number
        # reviews['comment']: string
        review = request.get_json()
        # print(review)
        # print("SELECT id FROM Reviewer WHERE username = '" + str(review['username']) + "'")
        rid = connect("SELECT id FROM Reviewer WHERE username = '" + str(review['username']) + "'")
        # print(rid)
        connect("UPDATE Rating SET rate = " + str(review['rating']) + ", comment = '" + str(review['comment']) + "' WHERE rid = " + str(rid[0][0]) + " and mid = " + str(review['mid']))

        result = "Update success"
        return jsonify(result)


if __name__ == '__main__':
    app.run(port=5000, debug=False)
