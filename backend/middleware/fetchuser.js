const jwt = require('jsonwebtoken');
const JWT_SECRET = "youareverry$pretty";

const fetchuser = (req, res, next) =>{
//Get the user data from JWT token and add it to req object
    const token = req.header('auth-token')
    if(!token){
        return res.status(401).json({error: "Please Authenticate Using Valid Token"})
    }
   try{
    const data = jwt.verify(token, JWT_SECRET)

    //Get data into req.user
    req.user = data.user;
    next();
   }
   catch(error){
    return res.status(401).json({error: "Please Authenticate Using Valid Token"})

   }
}

module.exports = fetchuser;