from app import app
from models import db, State, Fuel, Period

states = [
    {
        "name": 'Maryland',
        "abbrev": 'MD'
    },
    {
        "name": 'Virginia',
        "abbrev": 'VA'
    },
    {
        "name": 'Delaware',
        "abbrev": 'DE'
    }
]

fuels = ["Coal", "Natural Gas", "Nuclear", "Coal"]

# periods = [1999, 2000, 2001]

with app.app_context():
    print('Deleting existing States, Fuels and Periods...')
    State.query.delete()
    print('1')
    Fuel.query.delete()
    print('2')
    # Period.query.delete()

    # print('Creating Period (years) objects...')
    # for p in periods:
    #     period = Period(year=p)
    #     db.session.add(period)
    #     db.session.commit()

    print('Creating State objects...')
    for st in states:
        state = State(name=st['name'], abbrev=st['abbrev'])
        db.session.add(state)
        db.session.commit()

    print('Creating Fuel objects...')
    for fu in fuels:
        fuel = Fuel(name=fu)
        db.session.add(fuel)
        db.session.commit()
    

# Use .append

    # print('Adding state objects to transaction...')
    # db.session.add_all([maryland, delaware, virginia])
    # print('Committing transaction...')
    # db.session.commit()
    print('Complete.')