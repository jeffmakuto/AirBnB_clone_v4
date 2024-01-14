#!/usr/bin/python3
"""Starts a Flask web application.

The application listens on 0.0.0.0, port 5000.
Routes:
    /hbnb: HBnB home page.
"""
from models import storage
from models.state import State
from models.city import City
from models.amenity import Amenity
from models.place import Place
from flask import Flask
from flask import render_template
import uuid

app = Flask(__name__)


@app.route("/0-hbnb", strict_slashes=False)
def hbnb():
    """Displays the main HBnB filters HTML page."""
    states = storage.all(State).values()
    states = sorted(states, key=lambda k: k.name)
    st_ct = []

    for state in states:
        st_ct.append([state, sorted(state.cities, key=lambda k: k.name)])

    amenities = storage.all(Amenity).values()
    amenities = sorted(amenities, key=lambda k: k.name)

    places = storage.all(Place).values()
    places = sorted(places, key=lambda k: k.name)

    return render_template('0-hbnb.html',
                           states=st_ct,
                           amenities=amenities,
                           places=places,
                           cache_id=uuid.uuid4())


@app.teardown_appcontext
def teardown(exc):
    """Remove the current SQLAlchemy session."""
    storage.close()


if __name__ == "__main__":
    app.run(host="0.0.0.0")
