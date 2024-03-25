from flask import Flask, url_for, redirect, session
from authlib.integrations.flask_client import OAuth
from flask_cors import CORS
import os

CLIENT_ID = os.environ.get("CLIENT_ID", None)
CLIENT_SECRET = os.environ.get("CLIENT_SECRET", None)
ORIGIN = os.environ.get("ORIGIN", None)

app = Flask(__name__)
app.secret_key = os.urandom(12)

CORS(app, origins=[ORIGIN], supports_credentials=True)

oauth = OAuth(app)

@app.route("/")
def index():
    return "It works"

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
    print(" Google User ", user_info)
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
    app.run(debug=True, port=3000)
