const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser')
const Task = require('../models/Tasks');
const { body, validationResult } = require('express-validator');

//Route 1: Get all Tasks using Get "/api/task/fetchalltasks" Login Required
router.get('/fetchalltasks', fetchuser, async(req, res)=>{
  try{
    const task = await Task.find({user: req.user.id});
    res.json(task)
  }
  catch(error){
    res.status(500).json({error: "Error Occured in fetching Tasks"})

  }
})


//Route 2: Add Tasks using Post "/api/task/addtask" Login Required
router.post('/addtask', fetchuser, [
    body('title','Enter a valid title').isLength({min:3}),
   body('description', 'Enter a valid description').isLength({min:3}),
   body('due_date', 'Enter a valid due date').isISO8601().toDate(),
], async(req, res)=>{
    const {title, description, due_date} = req.body;
    try{
        const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const task = new Task({
        title, description, due_date, user: req.user.id
      })
      const savedTask = await task.save()
      res.json(savedTask)
    }
    catch(error){
        console.log(error)
        res.status(500).json({error: "Error Occured in adding Task"})
    }
 })
 


// Route 3: Update Tasks using Put "/api/task/updatetask" Login Required
router.put('/updatetask/:id', fetchuser, [
    body('title','Enter a valid title').isLength({min:3}),
    body('description', 'Enter a valid description').isLength({min:3}),
    body('due_date', 'Enter a valid due date').isISO8601().toDate(),
], async(req, res)=>{
    const {title, description, due_date} = req.body;
    try{
        //Create newTask Object
        const newTask = {}
        if(title){newTask.title= title}
        if(description){newTask.description= description}
        if(due_date){newTask.due_date= due_date}

        //Find a newTask to uodate and update
        let task = await Task.findById(req.params.id);
        if(!task){
            return res.status(404).json({error: "Not Found"});
        }

        if(task.user.toString() !== req.user.id){
            return res.status(401).json({error: "Not Allowed To Update"})
        }

        task = await Task.findByIdAndUpdate(req.params.id, {$set: newTask}, {new:true})
        res.json({task});
    }
    catch(error){
        // console.log(error)
        res.status(500).json({error: "Error Occured in Updating Task"})
    }

})


// Route 4: Delete Task using Delete "/api/task/deletetask" Login Required
router.delete('/deletetask/:id', fetchuser, async(req, res)=>{
    try{
        //Find a newTask to udate and update
        let user = await User.findById(req.params.id);
        if(!task){
            return res.status(404).json({error: "Not Found"});
        }
        // Check if User ows this Task
        if(task.user.toString() !== req.user.id){
            return res.status(401).json({error: "Not Allowed To Delete"})
        }

        task = await Task.findByIdAndDelete(req.params.id)
        res.json({"Success": "Task has been deleted Successfully"});
    }
    catch(error){
        // console.log(error)
        res.status(500).json({error: "Error Occured in Updating Task"})
    }

})

module.exports = router;