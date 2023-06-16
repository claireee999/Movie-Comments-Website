from flask import Flask, render_template, request, redirect, session, Blueprint
from connection import connect

register_bp = Blueprint('register', __name__)
users = {  # later get from sql
    "kathy": "123",
    "claire": "456"
}


def dup_username(username):
    if username in users:
        return True
    return False


@register_bp.route("/check_username", methods=["GET", "POST"])
def check_username():
    if request.method == "POST":
        info = request.get_json()
        # uid = connect("SELECT id FROM Reviewer WHERE username = '" + str(info['username']) + "'")
        # if uid is None:
        if dup_username(info['username']) is False:
            return 'valid'
        else:
            error_message = "Username already exists."
            return render_template("login.html", error=error_message)
    return render_template("login.html")


@register_bp.route("/register", methods=["GET", "POST"])
def register():
    if request.method == "POST":
        info = request.get_json()
        username = info['username']
        password = info['password']
        # connect(insert into)
    return 'success'
