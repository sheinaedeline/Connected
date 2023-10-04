Developer Guide (Backend)

Running The Code:
    1. First make sure your terminal is currently in the backend folder directory, then run npm install
    2. using the sample-env file replace the MONGODB_URL with your local mongodb connection url and then rename the file into .env
    3. To run the application in development just type in the the terminal npm run dev


Adding an API:
The Steps to creating an API can be divided into multiple steps.

    1.Creating a Controller.ts file for the API (If it has not exist yet):
    To add an API to the backend server, First create the controller.ts file in the controller folder. For example if you are creating APIs 
    related to the user such as the login/register/ or get profile API, then all of the logic for these APIs can be bundled inside one .ts file where the 
    naming convention of the file can be described as [featureName]Controller.ts so in this case since we are making the API for users then it is named userController.ts.

    2. Defining the function for the API
    Following the example above, lets say we want to define the logic for the login API, to do this what we need to do is to define a function that represents the login api logic.
    To do this go to the respective controller file (in this case the userController.ts) and define the login function.
    Do note that the format of a function that represents for an api is always the same which is :
    '
    export async function [functionName](req: Request, res: Response): Promise<Response> {
        try {
            /
                Code Block (Main Logic)
            /
            return response_success(res,{json response object},"[Success Response]")

        } catch (error:any) {
            if(error instanceof Error){
                return response_bad_request(res,error.message)
            } 
            return response_internal_server_error(res, error.message)
        }
    }
    '
    3. Registering the function as an API Route.
    To register the function as an API route, add it to its corresponding .ts file in the routes directory.
    If the corresponding routes directory .ts file does not exist yet then you can define it as [featureName].ts so in this case it becomes user.ts
    The barebone code of a route directory file is always:
    '
    import express from "express"
    const router = express.Router();
    
    //Insert the routes here
    
    export default router;
    '
    If you just created the route directory file, lets say in this case you just created user.ts then register it to the root router by adding a line
    in the rootRouter.ts file such as:
    
    import express from "express" //DONT TOUCH THIS
    import user from "@routes/user"; //REMEMBER TO IMPORT YOUR DEFINED ROUTE FILE (This imports the user.ts)
    const router = express.Router();

    router.use("/user",user);  //Here we register all the api associated to the user to the /user endpoint
    // Add Additional routes here later

    export default router
    '

    Now going back to the user.ts file, to register the login function as a route, all you need to do in the user.ts file is:
    
    '
    import express from "express" //Dont touch this
    const router = express.Router(); // Dont touch this
    import {login} from "@controller/userController" //Import the function

    router.post("/login",login); //Register the login function as a POST Api where the "/login" (or the first parameter) is the api path
    export default router;

    '

    Then you can just test your api using postman in http where for the example above we can test the api in postman where the url is 'http://localhost:3000/user/login'
    


Additional Stuff:
- Add all Mongoose Model to the mongodb folder where the file naming convention is [modelName]Model.ts
- For functions that is used all across the components (Such as utility functions) just add them inside the utils folder where you can either create a new ts file or just insert
them into the util.ts folder
- Add all interfaces to the interface fodler




