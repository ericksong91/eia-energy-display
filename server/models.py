from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData, DateTime, func
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy

metadata = MetaData(naming_convention={
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
})

db = SQLAlchemy(metadata=metadata)

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

    # Relationships
    periods = db.relationship('Period', back_populates='state', cascade='all, delete-orphan')
    fuels = association_proxy('periods', 'fuel', creator=lambda fu: Period(fuel=fu))

    def __repr__(self):
        return f'<ID: {self.id} | Name: {self.name}>'

class Period(BaseTable):
    __tablename__="periods"

    serialize_rules = ('-fuel.periods', '-state.periods')

    year = db.Column(db.Integer)
    # consumption = db.Column(db.Integer)
    # price = db.Column(db.Integer)
    nox = db.Column(db.Integer) # short-tons
    sox = db.Column(db.Integer) # short-tons
    co2 = db.Column(db.Integer) # co2-thousand-metric-tons

    state_id = db.Column(db.Integer, db.ForeignKey('states.id'))
    fuel_id = db.Column(db.Integer, db.ForeignKey('fuels.id'))

    # Relationships
    state = db.relationship('State', back_populates="periods")
    fuel = db.relationship('Fuel', back_populates="periods")

    def __repr__(self):
        return f'<ID: {self.id} | Period: {self.year} | State: {self.state} | Fuel: {self.fuel}>'

class Fuel(BaseTable):
    __tablename__ = 'fuels'

    serialize_rules = ('-states.fuels',)

    name = db.Column(db.String)

    # Relationships
    periods = db.relationship('Period', back_populates='fuel', cascade='all, delete-orphan')
    states = association_proxy('periods', 'state', creator=lambda st: Period(state=st))

    def __repr__(self):
        return f'<ID: {self.id} | Fuel Name: {self.name}>'