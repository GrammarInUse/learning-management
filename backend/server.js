const db = require("./models/db");

const Users = require("./models/users");
const Information = require("./models/information");
const TopicTypes = require("./models/topic-types");
const Topics = require("./models/topics");
const Learnings = require("./models/learnings");
const LearningDetails = require("./models/learning-details");


const userRoutes = require("./api/router/users");
const completedThingRoutes = require("./api/router/completed-things");
const topicRoutes = require("./api/router/topics");

const Express = require("express");
const bodyParser = require("body-parser");


const App = Express();


//What is extended ???????? Explain below code!!!!
App.use(bodyParser.urlencoded({extended: false}));
App.use(bodyParser.json());


App.use(Express.static("public"));
//SET HEADER
App.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-with, Content-Type, Accept, Authorization");
    res.header("Access-Control-Expose-Headers", "Authorization");
    res.header('Access-Control-Allow-Credentials', true);

    if(req.method === "OPTIONS"){
        res.header("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, PUT");

        return res.status(200).json({ });
    }

    next();
});

//Using route user to get request
App.use("/users", userRoutes);
App.use("/completedthing", completedThingRoutes);
App.use("/topics", topicRoutes);

//Using current routes
App.get("/", async (req, res, next) => {
    await TopicTypes.initialize();
    
    next();
})

//Create error: Page not found
App.use((req, res, next) => {
    const error = new Error("404 - Page not found!");
    error.status = 404;
    
    next(error);
});

App.use((error, req, res, next) => {
    res.status(error.status);

    res.json({
        userMessage: error.message
    });
});


//Build app at port: environment variable or 8080 
const port = process.env.PORT || 8080;
App.listen(port, () => {
    console.log("You are listening at port: " + port);
});