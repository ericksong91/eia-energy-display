from flask_sqlalchemy import SQLAlchemy
from sqlalchemy_serializer import SerializerMixin

db = SQLAlchemy()

class BaseTable(db.Modelk, SerializerMixin):
    __abstract__ = True
    id = db.Column(db.Integer, primary_key=True)
    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)

class State(BaseTable):
    __tablename__ = 'states'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    abbrev = db.Column(db.String)
    total_generated = db.Column(db.Integer)
    total_emissions = db.Column(db.Integer)

class Fuel(BaseTable):
    __tablename__ = 'fuels'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    consumption = db.Column(db.Integer)
    # emissions = db.Column(db.List)
    # Do I need to add another table for emissions?

    # def __repr__(self):
    #     return f'<Bird {self.name} | Species: {self.species}>'