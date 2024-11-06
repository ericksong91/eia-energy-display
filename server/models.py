from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData, DateTime, func
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy

metadata = MetaData(naming_convention={
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
}) # investigate this later

db = SQLAlchemy(metadata=metadata) # investigate this later

class BaseTable(db.Model, SerializerMixin):
    __abstract__ = True

    id = db.Column(db.Integer, primary_key=True)
    created_at = db.Column(db.DateTime, server_default=func.now())
    updated_at = db.Column(db.DateTime, onupdate=func.now())

class State(BaseTable):
    __tablename__ = 'states'

    serialize_rules = ('-fuels.states',)

    name = db.Column(db.String)
    abbrev = db.Column(db.String)

    periods = db.relationship('Period', back_populates='state', cascade='all, delete-orphan')
    fuels = association_proxy('periods', 'fuel', creator=lambda fu: Period(fuel=fu))

    def __repr__(self):
        # return f'<State: {self.name}, {self.abbrev}, Total Generated Energy: {self.total_generated}, Total NOx Emissions: {self.total_nox}, Total SOx Emissions: {self.total_sox}, Total CO2 Emissions: {self.total_co2}>'
        # return f'ID: <{self.id}>, State: <{self.name}>, Periods: <{self.periods}, Fuels: <{self.fuels}>'
        return f'ID: <{self.id}>, State: <{self.name}>'

class Period(BaseTable):
    __tablename__="periods"

    serialize_rules = ('-fuel.periods', '-state.periods')

    year = db.Column(db.Integer)

    state_id = db.Column(db.Integer, db.ForeignKey('states.id'))
    fuel_id = db.Column(db.Integer, db.ForeignKey('fuels.id'))
    
    state = db.relationship('State', back_populates="periods")
    fuel = db.relationship('Fuel', back_populates="periods")

    def __repr__(self):
        # return f'<Fuel: {self.name}, Period: {self.period}, Total Consumption: {self.consumption}, Total NOx Emissions: {self.nox}, Total SOx Emissions: {self.sox}, Total CO2 Emissions: {self.co2}>'
        return f'Period: <{self.year}>' + f' <State ID: {self.state_id}>' + f' <Fuel ID: {self.fuel_id}>'

    # total_generated = db.Column(db.Integer)
    # total_nox = db.Column(db.Integer)
    # total_sox = db.Column(db.Integer)
    # total_co2 = db.Column(db.Integer)

class Fuel(BaseTable):
    __tablename__ = 'fuels'

    serialize_rules = ('-states.fuels',)

    name = db.Column(db.String)
    # consumption = db.Column(db.Integer)
    # price = db.Column(db.Integer)
    # nox = db.Column(db.Integer)
    # sox = db.Column(db.Integer)
    # co2 = db.Column(db.Integer)

    periods = db.relationship('Period', back_populates='fuel', cascade='all, delete-orphan')
    states = association_proxy('periods', 'state', creator=lambda st: Period(state=st))

    def __repr__(self):
        # return f'<Fuel: {self.name}, Period: {self.period}, Total Consumption: {self.consumption}, Total NOx Emissions: {self.nox}, Total SOx Emissions: {self.sox}, Total CO2 Emissions: {self.co2}>'
        # return f'ID: <{self.id}>, Fuel: <{self.name}>, Periods: <{self.periods}, States: <{self.states}>'
        return f'ID: <{self.id}>, Fuel: <{self.name}>'

# ### Testing 

# db = SQLAlchemy()

# class State(db.Model, SerializerMixin):
#     __tablename__ = 'states'

#     id = db.Column(db.Integer, primary_key=True)
#     name = db.Column(db.String)
#     abbrev = db.Column(db.String)

#     def __repr__(self):
#         return f'asdf'