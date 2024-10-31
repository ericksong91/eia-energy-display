# seed data

from app import app
from models import db, State

db.init_app(app)

with app.app_context():
    print('Deleting existing States...')
    State.query.delete()

    print('Creating state objects...')
    maryland = State(
        name='Maryland',
        abbrev='MD'
    )

    virginia = State(
        name='Virginia',
        abbrev='VA'
    )

    delaware = State(
        name='Delaware',
        abbrev='DE'
    )

    print('Adding state objects to transaction...')
    db.session.add_all([maryland, delaware, virginia])
    print('Committing transaction...')
    db.session.commit()
    print('Complete.')