import random
import json
import requests
import os

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

offset_value = 0
value_tracker = 0
sample_url = 'https://api.eia.gov/v2/electricity/state-electricity-profiles/emissions-by-state-by-fuel/data/?frequency=annual&data[0]=co2-thousand-metric-tons&data[1]=nox-short-tons&data[2]=so2-short-tons&facets[fuelid][]=COL&facets[fuelid][]=NG&facets[fuelid][]=OTH&facets[fuelid][]=PET&facets[stateid][]=AK&facets[stateid][]=AL&facets[stateid][]=AR&facets[stateid][]=AZ&facets[stateid][]=CA&facets[stateid][]=CO&facets[stateid][]=CT&facets[stateid][]=DC&facets[stateid][]=DE&facets[stateid][]=FL&facets[stateid][]=GA&facets[stateid][]=HI&facets[stateid][]=IA&facets[stateid][]=ID&facets[stateid][]=IL&facets[stateid][]=IN&facets[stateid][]=KS&facets[stateid][]=KY&facets[stateid][]=LA&facets[stateid][]=MA&facets[stateid][]=MD&facets[stateid][]=ME&facets[stateid][]=MI&facets[stateid][]=MN&facets[stateid][]=MO&facets[stateid][]=MS&facets[stateid][]=MT&facets[stateid][]=NC&facets[stateid][]=ND&facets[stateid][]=NE&facets[stateid][]=NH&facets[stateid][]=NJ&facets[stateid][]=NM&facets[stateid][]=NV&facets[stateid][]=NY&facets[stateid][]=OH&facets[stateid][]=OK&facets[stateid][]=OR&facets[stateid][]=PA&facets[stateid][]=RI&facets[stateid][]=SC&facets[stateid][]=SD&facets[stateid][]=TN&facets[stateid][]=TX&facets[stateid][]=UT&facets[stateid][]=VA&facets[stateid][]=VT&facets[stateid][]=WA&facets[stateid][]=WI&facets[stateid][]=WV&facets[stateid][]=WY&sort[0][column]=period&sort[0][direction]=asc'

## API Helper Method ##

def eia_url_offset(offset, url):
    url_offsets = f'&offset={offset}&length=5000' 
    url_api_mod = '&api_key=' + os.environ.get('EIA_API_KEY')

    return url + url_offsets + url_api_mod

def api_request(url):
    r = requests.get(url)

    if r.status_code == requests.codes.ok:
        return r.json()
    else:
        r.raise_for_status()
        return {}

def pull_period_data(data):
    for i in data['response']['data']:
        period = Period(year=int(i['period']), state_id=State.query.filter_by(name=i['stateDescription']).first().id, fuel_id=Fuel.query.filter_by(name=i['fuelDescription']).first().id, 
                        nox=int(i['nox-short-tons']), so2=int(i['so2-short-tons']), co2=int(i['co2-thousand-metric-tons']))
        db.session.add(period)

## SEEDING DATA ##
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
    data = api_request(eia_url_offset(0, sample_url))
    pull_period_data(data)

    if int(data['response']['total']) > 5000:
        value_tracker = int(int(data['response']['total'])/5000)
        offset_value += 5000

        while value_tracker > 0:
            data = api_request(eia_url_offset(offset_value, sample_url))
            pull_period_data(data)
            offset_value += 5000
            value_tracker -= 1
            print(offset_value, value_tracker)

    
    print("ValueTracker: ", value_tracker, "Offset Value: ", offset_value)

    # Fetch data first to see how much data I am dealing with
    # if data is less than or equal to 5000, just continue with regular data integration
    # IF NOT, then enter a loop until data is completly integrated.

    ## RANDOM DATA ##
    # for p in period:
    #     first_state_id = State.query.first().id
    #     last_state_id = State.query.order_by(State.id.desc()).first().id

    #     current_state = random.randint(first_state_id, last_state_id) # each period gives a random state

    #     for f in range(1, 4):
    #         # each period with the set State gets Coal, Petroleum and Natural Gas
    #         period = Period(year=p, state_id=current_state, fuel_id=f, nox=random.randint(0, 50000), so2=random.randint(0, 50000), co2=random.randint(0, 50000))
    #         db.session.add(period)

    print('Committing transaction...')
    db.session.commit()
    print('Complete.')


    ## Pulling test data from testdata.json in client folder ##
    # f = open('testdata.json')
    # data = json.load(f)