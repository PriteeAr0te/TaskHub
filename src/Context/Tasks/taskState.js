import React, {useState}from "react";
import TaskContext from "./taskContext";


const TaskState = (props) => {
  const host = "http://localhost:5000"
    
    const taskInitial = []
    const [tasks,setTasks] = useState(taskInitial)

      //Get All Tasks
       //Add a Task
       const getTasks = async() =>{
        //API Call
        const response = await fetch(`${host}/api/tasks/fetchalltasks`,{
          method: "GET", 
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem('token')
          } 
        });
        const json = await response.json(); 
        setTasks(json)
        // json ? setTasks(json) : setTasks([])
      }

      //Add a Task
      const addTask = async(title, description, due_date) =>{
        //API Call

        const response = await fetch(`${host}/api/tasks/addtask`, {
          method: "POST", 
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem('token')
          }, 
          body: JSON.stringify({title,description,due_date}),
        });
        const task = await response.json(); 
        setTasks(tasks.concat(task))
        // setTasks(prevTasks => ({
        //   ...prevTasks,
        //   taskArray: [...prevTasks.taskArray, task]
        // }));
        }

      //Delete a task
      const deleteTask = async(id) =>{
        //API Call 
        const response = await fetch(`${host}/api/tasks/deletetask/${id}`, {
          method: "DELETE", 
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem('token')
          }
        });
        const json = await response.json();
        const newTasks = tasks.filter((task)=>{return task._id !== id})
        setTasks(newTasks)
      }

      //Edit a task
      const editTask = async(id, title, description, due_date) =>{
        //API call
        const response = await fetch(`${host}/api/tasks/updatetask/${id}`, {
          method: "PUT", 
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem('token')
          }, 
          body: JSON.stringify({title,description,due_date}),
        });
        const json = await response.json(); 
        // console.log(json)
        //Code to editTask
        let newTasks = JSON.parse(JSON.stringify(tasks))
        for (let index = 0; index < newTasks.length; index++) {
          const element = newTasks[index];
          if(element._id === id){
            newTasks[index].title = title;
            newTasks[index].description = description;
            newTasks[index].due_date = due_date;
            break;
          }
        }
        setTasks(newTasks)
        
      }

    return (
        <TaskContext.Provider value={{tasks, addTask, deleteTask, editTask, getTasks}}>
            {props.children}
        </TaskContext.Provider>
    )
}

export default TaskState;
