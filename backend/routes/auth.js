const express = require('express');
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
router.use(express.json())
const fetchuser = require('../middleware/fetchuser')

const JWT_SECRET = "youareverry$pretty";

//Route1: Create a user using Post "/api/auth/createuser" No Login Required
router.post('/createuser',[
    body('username', 'Enter a valid username').isLength({ min: 3 }).matches(/^[a-zA-Z][a-zA-Z0-9\s]*$/, 'g'),
   body('email', 'Enter a valid mail').isEmail(),
   body('password', 'Password must be greater than 5 characters').isLength({min:6}),
   body('confirmPassword', 'Passwords do not match').custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Passwords do not match');
      }
      return true;
    }),
] , async(req, res)=>{
   let success = false;
   try{
      //Check if there are any errors in received data
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      // check if the user with same email exist or not 
      let user = await User.findOne({email: req.body.email})
      if(user){
         return res.status(400).json({error:"Email Already Exist."})
      }
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt)

      //Create a User
      user = await User.create({
         username: req.body.username,
         email: req.body.email,
         password: secPass
       })
       //Creating Authtoken 
       //Prepare data about the user to create a token
       const data = {
         user: {
            id : user.id,
         }
       }
       //Genetate JWT using user's data and a secret key
       const authtoken = jwt.sign(data, JWT_SECRET);
       //Sending JWT token back to the user
       success = true;
       res.json({success, "Authtoken": authtoken})

   }
   catch(error){
      console.error("Error Occured in User Creation", error)
   }
})


//Route 2: Authenticate a user using Post "/api/auth/login" No Login Required
router.post('/login',[
   body('email', 'Enter a valid mail').isEmail(),
   body('password', 'Password must be greater than 5 characters').exists()
] , async(req, res)=>{

   // Check if there are any errors in the received data.
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
   }
   const {email, password} = req.body;
   
   try{
      let user = await User.findOne({email});
      if(!user){
         res.status(400).json({error: "Enter Valid Credentials."})
      }
      const comparePassword = await bcrypt.compare(password, user.password)
      if(!comparePassword){
         res.status(400).json({error: "Invalid Credentials"})
      }
      //Prepare data about the user to create a token
      const data = {
         user: {
            id: user.id,
         }
      }
      //Genetate JWT using user's data and a secret key
      const authtoken = jwt.sign(data, JWT_SECRET);
      //Sending JWT token back to the user
      let success = true;
      res.json({success, authtoken})
   }
   catch(error){
      return res.status(400).json({error: "Error Occured in Login"})
   }
})



//Route 3: Get user data using Post "/api/auth/getuser" Login Required
router.get('/getuser', fetchuser, async(req, res)=>{
try{
   let userId = req.user.id;
   let user = await User.findById(userId).select('-password');
   res.send(user)
}
catch(err){
   console.log(err)
   return res.status(400).json({error: "Internal Server Error"});
}
})

module.exports = router;
