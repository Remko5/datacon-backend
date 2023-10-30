# datacon-backend

HOSTED VERSION:

https://atlantic-shard-bream.glitch.me    backend URL

GET Routes:
https://atlantic-shard-bream.glitch.me/data                 Get all data 
https://atlantic-shard-bream.glitch.me/user                 Get all users
https://atlantic-shard-bream.glitch.me/tracker              Get all trackers
https://atlantic-shard-bream.glitch.me/user_tracker         Get all relations between users and trackers

https://atlantic-shard-bream.glitch.me/data/{tracker_id}    Get data from one tracker (example: https://atlantic-shard-bream.glitch.me/data/1)
https://atlantic-shard-bream.glitch.me/user/{id}            Get one user (example: https://atlantic-shard-bream.glitch.me/user/1)
https://atlantic-shard-bream.glitch.me/tracker/{id}         Get one tracker (example: https://atlantic-shard-bream.glitch.me/tracker/1)
                                    
POST Routes:                                              
https://atlantic-shard-bream.glitch.me/data/add             Add new data*1      Format -> {tracker_id: integer, lat: number, long: number}
https://atlantic-shard-bream.glitch.me/user/add             Add new user        Format -> {username: string(20), password: integer}
https://atlantic-shard-bream.glitch.me/tracker/add          Add new tracker*2   Format -> {naam: string(20), user_id: integer}

*1 The tracker_id needs to be from an existing tracker in the database otherwise this request fails.

*2 While adding the new tracker the user_id gets used to automatically create a relationship between the user and the new tracker (user_tracker).
   The user_id needs to be from an existing user in the database otherwise this request fails.

LOCAL VERSION:

Run: "npm install" in the root directory to install all the packages required to run this program
To start the program run: "npm start"
The program listens on port 3000

127.0.0.1:3000    backend URL

GET Routes:
127.0.0.1:3000/data                 Get all data 
127.0.0.1:3000/user                 Get all users
127.0.0.1:3000/tracker              Get all trackers
127.0.0.1:3000/user_tracker         Get all relations between users and trackers

127.0.0.1:3000/data/{tracker_id}    Get data from one tracker (example: 127.0.0.1:3000/data/1)
127.0.0.1:3000/user/{id}            Get one user (example: 127.0.0.1:3000/user/1)
127.0.0.1:3000/tracker/{id}         Get one tracker (example: 127.0.0.1:3000/tracker/1)
                                    
POST Routes:                                              
127.0.0.1:3000/data/add             Add new data*1      Format -> {tracker_id: integer, lat: number, long: number}
127.0.0.1:3000/user/add             Add new user        Format -> {username: string(20), password: integer}
127.0.0.1:3000/tracker/add          Add new tracker*2   Format -> {naam: string(20), user_id: integer}

*1 The tracker_id needs to be from an existing tracker in the database otherwise this request fails.

*2 While adding the new tracker the user_id gets used to automatically create a relationship between the user and the new tracker (user_tracker).
   The user_id needs to be from an existing user in the database otherwise this request fails.
