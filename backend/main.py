from flask import Flask, send_from_directory, url_for, redirect, session
from authlib.integrations.flask_client import OAuth
from flask_cors import CORS
import os

CLIENT_ID = os.getenv("CLIENT_ID")
CLIENT_SECRET = os.getenv("CLIENT_SECRET")
ORIGIN = os.getenv("ORIGIN")

app = Flask(__name__)
app.secret_key = os.urandom(12)

CORS(app, origins=[ORIGIN], supports_credentials=True)

oauth = OAuth(app)

@app.route("/")
def index():
    return send_from_directory("frontend/dist", "index.html")

@app.route("/", defaults={"path": "index.html"})
@app.route("/<path:path>")
def static_files(path):
    if path == "index.html" or path.startswith("assets"):
        return send_from_directory("frontend/dist", path)
    return redirect("/")

@app.route("/google/")
def google():
    CONF_URL = "https://accounts.google.com/.well-known/openid-configuration"
    oauth.register(
        name="google",
        client_id=CLIENT_ID,
        client_secret=CLIENT_SECRET,
        server_metadata_url=CONF_URL,
        client_kwargs={
            "scope": "openid email profile"
        }
    )
    redirect_uri = url_for("google_auth", _external=True)
    return oauth.google.authorize_redirect(redirect_uri)

@app.route("/google/callback/")
def google_auth():
    token = oauth.google.authorize_access_token()
    user_info = oauth.google.parse_id_token(token, False)
    session["userInfo"] = user_info
    return redirect(ORIGIN)

@app.route("/user-info")
def user_info():
    user_info = session.get("userInfo")
    if user_info is None:
        return "Unauthorized", 401
    return user_info

@app.route("/logout")
def logout():
    session.pop("userInfo")
    return redirect(ORIGIN)

if __name__ == "__main__":
    app.run(debug=True, port=8080)
