import random
import json
import requests

from app import app
from models import db, State, Fuel, Period

states = [
    {
        "name": "United States",
        "abbreviation": "USA"
    },
    {
        "name": "Alabama",
        "abbreviation": "AL"
    },
    {
        "name": "Alaska",
        "abbreviation": "AK"
    },
    {
        "name": "Arizona",
        "abbreviation": "AZ"
    },
    {
        "name": "Arkansas",
        "abbreviation": "AR"
    },
    {
        "name": "California",
        "abbreviation": "CA"
    },
    {
        "name": "Colorado",
        "abbreviation": "CO"
    },
    {
        "name": "Connecticut",
        "abbreviation": "CT"
    },
    {
        "name": "Delaware",
        "abbreviation": "DE"
    },
    {
        "name": "District of Columbia",
        "abbreviation": "DC"
    },
    {
        "name": "Florida",
        "abbreviation": "FL"
    },
    {
        "name": "Georgia",
        "abbreviation": "GA"
    },
    {
        "name": "Hawaii",
        "abbreviation": "HI"
    },
    {
        "name": "Idaho",
        "abbreviation": "ID"
    },
    {
        "name": "Illinois",
        "abbreviation": "IL"
    },
    {
        "name": "Indiana",
        "abbreviation": "IN"
    },
    {
        "name": "Iowa",
        "abbreviation": "IA"
    },
    {
        "name": "Kansas",
        "abbreviation": "KS"
    },
    {
        "name": "Kentucky",
        "abbreviation": "KY"
    },
    {
        "name": "Louisiana",
        "abbreviation": "LA"
    },
    {
        "name": "Maine",
        "abbreviation": "ME"
    },
    {
        "name": "Maryland",
        "abbreviation": "MD"
    },
    {
        "name": "Massachusetts",
        "abbreviation": "MA"
    },
    {
        "name": "Michigan",
        "abbreviation": "MI"
    },
    {
        "name": "Minnesota",
        "abbreviation": "MN"
    },
    {
        "name": "Mississippi",
        "abbreviation": "MS"
    },
    {
        "name": "Missouri",
        "abbreviation": "MO"
    },
    {
        "name": "Montana",
        "abbreviation": "MT"
    },
    {
        "name": "Nebraska",
        "abbreviation": "NE"
    },
    {
        "name": "Nevada",
        "abbreviation": "NV"
    },
    {
        "name": "New Hampshire",
        "abbreviation": "NH"
    },
    {
        "name": "New Jersey",
        "abbreviation": "NJ"
    },
    {
        "name": "New Mexico",
        "abbreviation": "NM"
    },
    {
        "name": "New York",
        "abbreviation": "NY"
    },
    {
        "name": "North Carolina",
        "abbreviation": "NC"
    },
    {
        "name": "North Dakota",
        "abbreviation": "ND"
    },
    {
        "name": "Ohio",
        "abbreviation": "OH"
    },
    {
        "name": "Oklahoma",
        "abbreviation": "OK"
    },
    {
        "name": "Oregon",
        "abbreviation": "OR"
    },
    {
        "name": "Pennsylvania",
        "abbreviation": "PA"
    },
    {
        "name": "Rhode Island",
        "abbreviation": "RI"
    },
    {
        "name": "South Carolina",
        "abbreviation": "SC"
    },
    {
        "name": "South Dakota",
        "abbreviation": "SD"
    },
    {
        "name": "Tennessee",
        "abbreviation": "TN"
    },
    {
        "name": "Texas",
        "abbreviation": "TX"
    },
    {
        "name": "Utah",
        "abbreviation": "UT"
    },
    {
        "name": "Vermont",
        "abbreviation": "VT"
    },
    {
        "name": "Virginia",
        "abbreviation": "VA"
    },
    {
        "name": "Washington",
        "abbreviation": "WA"
    },
    {
        "name": "West Virginia",
        "abbreviation": "WV"
    },
    {
        "name": "Wisconsin",
        "abbreviation": "WI"
    },
    {
        "name": "Wyoming",
        "abbreviation": "WY"
    }
]

fuels = ["Coal", "Natural Gas", "Petroleum", "Other"]

period = [x for x in range(1999, 2024)]

## API Helper Method ##

def api_request(url):
    r = requests.get('url')

    if r.status_code == requests.codes.ok:
        return r.json()
    else:
        r.raise_for_status()
        return {}


with app.app_context():
    print('Deleting existing States, Fuels and Periods...')
    State.query.delete()
    Fuel.query.delete()
    Period.query.delete()

    print('Creating State objects...')
    for st in states:
        state = State(name=st['name'], abbrev=st['abbreviation'])
        db.session.add(state)

    print('Creating Fuel objects...')
    for fu in fuels:
        fuel = Fuel(name=fu)
        db.session.add(fuel)

    print('Creating Period objects....')
    ## RANDOM DATA ##
    # for p in period:
    #     first_state_id = State.query.first().id
    #     last_state_id = State.query.order_by(State.id.desc()).first().id

    #     current_state = random.randint(first_state_id, last_state_id) # each period gives a random state

    #     for f in range(1, 4):
    #         # each period with the set State gets Coal, Petroleum and Natural Gas
    #         period = Period(year=p, state_id=current_state, fuel_id=f, nox=random.randint(0, 50000), so2=random.randint(0, 50000), co2=random.randint(0, 50000))
    #         db.session.add(period)

    ## Pulling test data from testdata.json in client folder ##
    # f = open('testdata.json')
    # data = json.load(f)

    # for i in data['response']['data']:
    #     period = Period(year=int(i['period']), state_id=State.query.filter_by(name=i['stateDescription']).first().id, fuel_id=Fuel.query.filter_by(name=i['fuelDescription']).first().id, 
    #                     nox=int(i['nox-short-tons']), so2=int(i['so2-short-tons']), co2=int(i['co2-thousand-metric-tons']))
    #     db.session.add(period)

    ## API Call ##

    print('Committing transaction...')
    db.session.commit()
    print('Complete.')