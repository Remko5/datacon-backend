# datacon-backend

Run: "npm install" in the root directory to install all the packages required to run this program
To start the program run: "npm start"
The program listens on port 3000

127.0.0.1:3000

Routes:

Get all data (GET):
127.0.0.1:3000/data

Get all users (GET):
127.0.0.1:3000/user

Get all trackers (GET):
127.0.0.1:3000/tracker

Get all relations between users and trackers (GET):
127.0.0.1:3000/user_tracker

Get data from one tracker (GET): (example: 127.0.0.1:3000/data/1)
127.0.0.1:3000/data/{tracker_id}

Get one user (GET): (example: 127.0.0.1:3000/user/1)
127.0.0.1:3000/user/{id}

Get one tracker (GET): (example: 127.0.0.1:3000/tracker/1)
127.0.0.1:3000/tracker/{id}

Add new data (POST):
127.0.0.1:3000/data/add

Json post request expected (data):
{tracker_id: integer, lat: number, long: number}

The tracker_id needs to be from an existing tracker in the database otherwise this request fails.

Add new user (POST):
127.0.0.1:3000/user/add

Json post request expected (user):
{voornaam: string(20), achternaam: string(20)}

Add new tracker (POST):
127.0.0.1:3000/tracker/add

Json post request expected (tracker):
{naam: string(20), user_id: integer}

While adding the new tracker the user_id gets used to automatically create a relationship between the user and the new tracker (user_tracker).
The user_id needs to be from an existing user in the database otherwise this request fails.
