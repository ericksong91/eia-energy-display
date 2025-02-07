import random
import json
import requests
import os

from app import app
from models import db, State, Fuel, Period

states = [
    {
        "name": "United States (Total)",
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

fuels = ["Coal", "Natural Gas", "Petroleum", "Other", "Combined"]

period = [x for x in range(1999, 2024)]

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

    print('Committing State and Fuel transactions...')
    db.session.commit()

    print('Creating Period objects....')
    offset_value = 0
    value_tracker = 0
    emissions_url = "https://api.eia.gov/v2/electricity/state-electricity-profiles/summary/data/?frequency=annual&data[0]=carbon-dioxide&data[1]=nitrogen-oxide&data[2]=sulfer-dioxide&sort[0][column]=period&sort[0][direction]=desc&offset=800&length=5000"
    net_gen_url = "https://api.eia.gov/v2/electricity/state-electricity-profiles/summary/data/?frequency=annual&data[0]=net-generation&sort[0][column]=period&sort[0][direction]=desc&offset=0&length=5000"
    avg_price_url = "https://api.eia.gov/v2/electricity/state-electricity-profiles/summary/data/?frequency=annual&data[0]=average-retail-price&sort[0][column]=period&sort[0][direction]=desc&offset=0&length=5000"
    url_list = [emissions_url, net_gen_url, avg_price_url]
    data_list = [api_request(eia_url_offset(0, url)) for url in url_list] # using list comp to generate each url's data into one list. Solved Expression (in this case the function) for url in url_list 

    # for data in data_list:
    #     # going into array
    #     for i in data['response']['data']:
    #         # if period object is empty, make a new one
    #         # if period object is NOT empty, update with new values
    #         period = Period(year=int(i['period']), state_id=State.query.filter_by(name=i['stateDescription']).first().id, fuel_id=Fuel.query.filter_by(name=i['Combined']).first().id, 
    #                         nox=int(i['nox-short-tons']), so2=int(i['so2-short-tons']), co2=int(i['co2-thousand-metric-tons']))
    #         db.session.add(period)

    print('Committing transaction...')
    db.session.commit()
    print('Complete.')


    ## Pulling test data from testdata.json in client folder ##
    # f = open('testdata.json')
    # data = json.load(f)

    ## RANDOM DATA ##
    # for p in period:
    #     first_state_id = State.query.first().id
    #     last_state_id = State.query.order_by(State.id.desc()).first().id

    #     current_state = random.randint(first_state_id, last_state_id) # each period gives a random state

    #     for f in range(1, 4):
    #         # each period with the set State gets Coal, Petroleum and Natural Gas
    #         period = Period(year=p, state_id=current_state, fuel_id=f, nox=random.randint(0, 50000), so2=random.randint(0, 50000), co2=random.randint(0, 50000))
    #         db.session.add(period)
