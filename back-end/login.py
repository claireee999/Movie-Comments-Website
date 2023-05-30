from flask import Flask, render_template, request, redirect, session

app = Flask(__name__)
app.secret_key = "your_secret_key"

users = {
    "john": "password123",
    "jane": "password456"
}

def is_valid_credentials(username, password):
    if username in users and users[username] == password:
        return True
    return False

@app.route("/")
def home():
    if "username" in session:
        return f"Hello, {session['username']}! You are already logged in."
    else:
        return redirect("/login")

@app.route("/login", methods=["GET", "POST"])
def login():
    if request.method == "POST":
        username = request.form.get("username")
        password = request.form.get("password")

        if is_valid_credentials(username, password):
            session["username"] = username
            return redirect("/")
        else:
            error_message = "Invalid credentials. Please try again."
            return render_template("login.html", error=error_message)

    return render_template("login.html")

@app.route("/logout")
def logout():
    session.pop("username", None)
    return redirect("/")

if __name__ == "__main__":
    app.run()