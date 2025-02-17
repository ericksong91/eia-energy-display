# EIA ENERGY DISPLAY 

## Description

This application was made to show different U.S. State statistics listed on [EIA Gov. API](https://www.eia.gov/opendata/browser/electricity/state-electricity-profiles/summary).

A demo of the application can be found here: https://eia-energy-display.onrender.com/

*(Takes a minute or two to spin up the instance)*

### Some key statistics include:

1. Emission trends from 2008-2023

2. Net electricity generation from 2008-2023

3. Average price of electricity per KWh from 2008-2023

4. Emissions per MWh of energy generated

## Requirements

1. PostgreSQL 14 or higher
2. NodeJS v16.18.0 or higher
3. Python v3.8 and pipenv (or whichever environment shell you prefer)
4. API key from [EIA API](https://www.eia.gov/opendata/)

## Installation

#### Backend Installation

1. Clone the repository to your device

![Repository](/readme_images/rootdirectory.png)

2. In the root folder, type `pipenv install`.
    - `requirements.txt` has all of the required dependencies for the backend server.

3. Type `pipenv shell` to activate the shell then type `touch .env` to make an environment file.

4. In the `.env` file you just made, type `API_KEY=` then your actual API key you received from EIA.gov. The backend will need this later, when we run our seed file.
    - If you are using an external database, you can also type in `DATABASE_URI=` with the external database URI from whichever service you are using.

![Example of API Key and database URI](/readme_images/envfile.png)

5. Now, type `cd server` to move into the server directory.

6. Open up `app.py` and uncomment line 19 if you would like to use an external database or uncomment line 20 if you would like to use a local instance for your postgreSQL server.

![Flask app configuration](/readme_images/apppy_comment.png)

7. Run `flask db upgrade head` to initialize and update migrations for the database.

8. Now type `python seed.py` to seed the database.

9. Type `flask run` while still in the `server` folder to start the application locally (default port is 5000).

10. Check your work by accessing `http://127.0.0.1:5000/states`. If done correctly, you should see a response with EIA gov data.

![JSON response](/readme_images/successfuljson.png)

#### Frontend Installation

11. Return to the root folder with `cd ..` then move into the `client` folder with `cd client`.

12. Type `npm install` to install all of the dependencies.

13. After installation, you can type `npm start` to view your app (default port is 4000).

## How To Use:



## Updates

25/02/17 - 1.0 Complete

## To-Do

- Replace search bar with a component that is more user friendly
- Add tables for each graph
- Automatic pulls from EIA.gov API once a week

## Credits

This application was created by Eric Song.

[EIA API](https://www.eia.gov/opendata/)
[EIA Govt. Glossary](https://www.eia.gov/tools/glossary/)