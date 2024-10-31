import os

from dotenv import load_dotenv
load_dotenv()

from flask import Flask, jsonify, make_response, render_template
from flask_migrate import Migrate
from flask_restful import Api, Resource

from models import db, State

# app = Flask(__name__)

app = Flask(
    __name__,
    static_url_path='',
    static_folder="../client/build",
    template_folder="../client/build"
)

app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URI')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False

migrate = Migrate(app, db)
db.init_app(app)

@app.errorhandler(404)
def not_found(e):
    return render_template("index.html")

api = Api(app)

class States(Resource):

    # def get(self):
    #     states = [state.to_dict() for state in State.query.all()]
    #     return make_response(jsonify(states), 200)

    def get(self):
        return "Hello"

api.add_resource(State, '/states')