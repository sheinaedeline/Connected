Connected Website How To Install and Run

How to Install for Windows (Window Version that is used during development is Windows 10):
1. Ensure you have Node and NPM Installed (Node Version That is used during Development: v18.16.0. NPM Version Used During Development: 9.5.1 )
2. Install MongoDB Community Server on your computer (https://www.mongodb.com/try/download/community), Make sure to also install MongoDB compass which should come in one package with the MongoDB Community Server Installer
3. Using your commandline, Go to the backend folder and run npm install.
4. Afterwards Open Your MongoDB Compass and Click Connect
<img src="https://github.com/unsw-cse-comp3900-9900-23T3/capstone-project-9900m13aokbuddy/assets/43334334/ed82bbe5-4990-4331-bf55-98ccde652a8b"> <br>
5. Then Copy the Connection String which should give you something like 'mongodb://localhost:27017'
<img src="https://github.com/unsw-cse-comp3900-9900-23T3/capstone-project-9900m13aokbuddy/assets/43334334/230c01b3-af3b-41a2-963d-d7f1e7b8a730"> <br>
6. Aftewards, Copy the .sample-env file and make a copy of it inside the backend folder and rename it to .env, Then delete the comment in the first line and replace the value for the MONGODB URLto your connection string. Make sure to change the localhost string in the mongodb URL String into the actual local host ip which should be 127.0.0.1. Overall the env file should look like this
<img src="https://github.com/unsw-cse-comp3900-9900-23T3/capstone-project-9900m13aokbuddy/assets/43334334/9b51611e-cff0-4059-ba6d-c7fb5729546b"> <br>

(Optional: Populating The Database)
1. To Populate the Database, First download the MongoDB Command Line Database Tools Download from https://fastdl.mongodb.org/tools/db/mongodb-database-tools-windows-x86_64-100.9.1.zip or https://www.mongodb.com/try/download/database-tools.
<img src="https://github.com/unsw-cse-comp3900-9900-23T3/capstone-project-9900m13aokbuddy/assets/43334334/993e8da8-44dd-4f0b-a0e9-3a867571150b"> <br>
2. Extract the files inside the bin folder of the downloaded file into any folder. Inside that folder create another folder called dump
<img src="https://github.com/unsw-cse-comp3900-9900-23T3/capstone-project-9900m13aokbuddy/assets/43334334/e58c3119-5408-45ac-9722-35849d517b75"> <br>
3. From the project folder, Copy the webApp folder into the dump folder you just created
<img src="https://github.com/unsw-cse-comp3900-9900-23T3/capstone-project-9900m13aokbuddy/assets/43334334/c1bfd6ff-f275-4c5b-8d4b-2bc17dc84b52"> <br>



