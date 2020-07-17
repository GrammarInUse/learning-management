const jwt = require("jsonwebtoken");
module.exports = (req, res, next) => {
    try{
        const bearerToken = req.headers['authorization'];

        const token = bearerToken.split(" ")[1];
        
        const decoded = jwt.verify(token, "mysecret", {
            algorithms: ["HS256"]
        }, (err, decoded) => {
            // console.log("DONE: ");
            // console.log(err + "ERR");
            // console.log(decoded + "DECODED");
        });
        
        req.userData = decoded;
        next();
    }catch(err){
        console.log("ERROR: " + err);
    }
}