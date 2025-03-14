import random
import json
import requests
import os

from app import app
from models import db, State, Fuel, Period
from sqlalchemy import and_

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
    Period.query.delete()
    State.query.delete()
    Fuel.query.delete()

    print('Creating State objects...')
    for st in states:
        state = State(name=st['name'], abbrev=st['abbreviation'])
        db.session.add(state)

    print('Creating Fuel objects...')
    for fu in fuels:
        fuel = Fuel(name=fu)
        db.session.add(fuel)

    db.session.flush()

    print('Creating Period objects....')
    print('Fetching data...')
    conversion_st_mt = 0.9071847 
    offset_value = 0
    value_tracker = 0
    data_url = "https://api.eia.gov/v2/electricity/state-electricity-profiles/summary/data/?frequency=annual&data[0]=average-retail-price&data[1]=carbon-dioxide&data[2]=carbon-dioxide-lbs&data[3]=net-generation&data[4]=nitrogen-oxide&data[5]=nitrogen-oxide-lbs&data[6]=sulfer-dioxide&data[7]=sulfer-dioxide-lbs&sort[0][column]=period&sort[0][direction]=asc&offset=0&length=5000"
    data = api_request(eia_url_offset(0, data_url))

    print('Setting data...')
    for d in data['response']['data']:
        state_id_query = State.query.filter_by(name=d['stateDescription']).first().id # load state ID using state's name as a search query
        fuel_id_query = Fuel.query.filter_by(name="Combined").first().id
        period = Period(year=int(d['period']), state_id=state_id_query, fuel_id=fuel_id_query, 
                                nox=int(d['nitrogen-oxide']) * conversion_st_mt, so2=int(d['sulfer-dioxide']) * conversion_st_mt, co2=int(d['carbon-dioxide']),
                                net_generation=int(d['net-generation']) / 1000, avg_price=float(d['average-retail-price']), nox_per_mwh = float(d['nitrogen-oxide-lbs']),
                                so2_per_mwh = float(d['sulfer-dioxide-lbs']), co2_per_mwh = float(d['carbon-dioxide-lbs']))
        db.session.add(period)
  
    print('Committing transaction...')
    db.session.commit()
    print('Complete.')