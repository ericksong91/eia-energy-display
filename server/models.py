import datetime
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from sqlalchemy_serializer import SerializerMixin

metadata = MetaData(naming_convention={
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
}) # investigate this later

db = SQLAlchemy(metadata=metadata) # investigate this later

class BaseTable(db.Model, SerializerMixin):
    __abstract__ = True

    id = db.Column(db.Integer, primary_key=True)
    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)

class State(BaseTable):
    __tablename__ = 'states'

    serialize_rules = ('-fuels.state_id',)

    name = db.Column(db.String)
    abbrev = db.Column(db.String)
    total_generated = db.Column(db.Integer)
    total_nox = db.Column(db.Integer)
    total_sox = db.Column(db.Integer)
    total_co2 = db.Column(db.Integer)

    fuels = db.relationship('Fuel', backref='state')

    def __repr__(self):
        return f'<State: {self.name}, {self.abbrev}, Total Generated Energy: {self.total_generated}, Total NOx Emissions: {self.total_nox}, 
            Total SOx Emissions: {self.total_sox}, Total CO2 Emissions: {self.total_co2}>'

class Fuel(BaseTable):
    __tablename__ = 'fuels'

    serialize_rules = ('-state.fuels',)

    name = db.Column(db.String)
    consumption = db.Column(db.Integer)
    period = db.Column(db.Integer)
    nox = db.Column(db.Integer)
    sox = db.Column(db.Integer)
    co2 = db.Column(db.Integer)

    state_id = db.Column(db.Integer, db.ForeignKey('states.id'))

    def __repr__(self):
        return f'<Fuel: {self.name}, Period: {self.period}, Total Consumption: {self.consumption}, Total NOx Emissions: {self.nox}, 
            Total SOx Emissions: {self.sox}, Total CO2 Emissions: {self.co2}>'