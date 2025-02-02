import os

from dotenv import load_dotenv
load_dotenv()

from flask import Flask, jsonify, make_response, render_template
from flask_migrate import Migrate
from flask_restful import Api, Resource

from models import db, State, Fuel, Period

app = Flask(
    __name__,
    static_url_path='',
    static_folder="../client/build",
    template_folder="../client/build"
)

app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URI') # uncomment to access external database
# app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False

migrate = Migrate(app, db)
db.init_app(app)

@app.errorhandler(404)
def not_found(e):
    return render_template("index.html")

api = Api(app)

### STATES ###
class ShowStates(Resource):
    def get(self):
        states = [state.to_dict() for state in State.query.all()]
        return make_response(jsonify(states), 200)
    
api.add_resource(ShowStates, '/states')

# class StateByID(Resource):
#     def get(self, id):
#         state = State.query.filter_by(id=id).first().to_dict()
#         return make_response(jsonify(state), 200)

# api.add_resource(StateByID, '/states/<int:id>')

# # ### FUELS ###
# class ShowFuels(Resource):
#     def get(self):
#         fuels = [fuel.to_dict() for fuel in Fuel.query.all()]
#         return make_response(jsonify(fuels), 200)
    
# api.add_resource(ShowFuels, '/fuels')

# class FuelByID(Resource):
#     def get(self, id):
#         fuel = Fuel.query.filter_by(id=id).first().to_dict()
#         return make_response(jsonify(fuel), 200)

# api.add_resource(FuelByID, '/fuels/<int:id>')

# # ### PERIODS ###
# class ShowPeriods(Resource):
#     def get(self):
#         periods = [period.to_dict() for period in Period.query.all()]
#         return make_response(jsonify(periods), 200)
    
# api.add_resource(ShowPeriods, '/periods')

# class PeriodByID(Resource):
#     def get(self, id):
#         period = Period.query.filter_by(id=id).first().to_dict()
#         return make_response(jsonify(period), 200)

# api.add_resource(PeriodByID, '/periods/<int:id>')