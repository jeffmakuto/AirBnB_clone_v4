#!/usr/bin/python3
"""Start Flask web application.

The application listens on 0.0.0.0, port 5000.
Routes:
    /hbnb: HBnB home page.
"""
from models import storage
from flask import Flask, render_template
from os import uuid

app = Flask(__name__)


@app.route("/hbnb", strict_slashes=False)
def hbnb():
    """Display the main HBnB filters HTML page."""
    states = storage.all("State")
    amenities = storage.all("Amenity")
    places = storage.all("Place")
    return render_template("3-hbnb.html",
                           states=states, amenities=amenities, places=places, cache_id = (uuid.uuid4()))


@app.teardown_appcontext
def teardown(exc):
    """Remove the current SQLAlchemy session."""
    storage.close()


if __name__ == "__main__":
    app.run(host="0.0.0.0")