Connected Website How To Install and Run

How to Install for Windows (Window Version that is used during development is Windows 10):
1. Ensure you have Node and NPM Installed (Node Version That is used during Development: v18.16.0. NPM Version Used During Development: 9.5.1 )
2. Install MongoDB Community Server on your computer (https://www.mongodb.com/try/download/community), Make sure to also install MongoDB compass which should come in one package with the MongoDB Community Server Installer
3. Using your commandline, Go to the backend folder and run npm install.
4. Afterwards Open Your MongoDB Compass and Click Connect
<img src="https://github.com/unsw-cse-comp3900-9900-23T3/capstone-project-9900m13aokbuddy/assets/43334334/ed82bbe5-4990-4331-bf55-98ccde652a8b">
5. Then Copy the Connection String which should give you something like 'mongodb://localhost:27017'
<img src="https://github.com/unsw-cse-comp3900-9900-23T3/capstone-project-9900m13aokbuddy/assets/43334334/230c01b3-af3b-41a2-963d-d7f1e7b8a730">
6. Aftewards, Copy the .sample-env file and make a copy of it inside the backend folder and rename it to .env, Then delete the comment in the first line and replace the value for the MONGODB URLto your connection string. Make sure to change the localhost string in the mongodb URL String into the actual local host ip which should be 127.0.0.1. Overall the env file should look like this
<img src="https://github.com/unsw-cse-comp3900-9900-23T3/capstone-project-9900m13aokbuddy/assets/43334334/9b51611e-cff0-4059-ba6d-c7fb5729546b">


