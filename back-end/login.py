from flask import Flask, render_template, request, redirect, session, Blueprint

login_bp = Blueprint('login', __name__)

users = { # later get from sql
    "kathy": "123",
    "claire": "456"
}

def is_valid_credentials(username, password):
    if username in users and users[username] == password:
        return True
    return False

@login_bp.route("/login", methods=["GET", "POST"])
def login():
    if request.method == "POST":
        info = request.get_json()
        username = info['username']
        password = info['password']
        print(username, password)
        print(is_valid_credentials(username,password))
        if is_valid_credentials(username, password):
            # session["username"] = username
            return 'valid'
        else:
            error_message = "Invalid credentials. Please try again."
            return 'invalid'
            #return render_template("login.html", error=error_message)

    return render_template("login.html")

@login_bp.route("/logout")
def logout():
    session.pop("username", None)
    return redirect("/")