import React, {useContext, useEffect, useRef, useState} from 'react'
import TaskContext from '../Context/Tasks/taskContext';
import Taskitem from './Taskitem';
import Addtask from './Addtask';
import {useNavigate } from 'react-router-dom'

const Tasks = (props) => {
    let navigate = useNavigate()
    const context = useContext(TaskContext)
    const {tasks, getTasks, editTask} = context;
    useEffect(()=>{
        if(localStorage.getItem('token')){
            getTasks()
        }else {
            navigate("/login")
        }
    },[])
    
    const ref = useRef(null)
    const refClose = useRef(null)
    const [task, setTask] = useState({id: "", etitle:"", edescription:"", edue_date:""}) 

    const updateTask = (currentTask) =>{
        ref.current.click();
        setTask({id: currentTask._id, etitle:currentTask.title, edescription:currentTask.description,edue_date:currentTask.due_date})
    }


    const handleOnClick = (e) =>{
        editTask(task.id, task.etitle, task.edescription, task.edue_date)
        refClose.current.click();
        // addTask(task.title, task.description, task.tag);
        props.showAlert("Task Updated Successfully", "success")
    }

    const onChange = (e) =>{
        setTask({...task,[e.target.name]: e.target.value})
    }

  return (
    <>
    <Addtask showAlert = {props.showAlert}/>
        <button ref ={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
        </button>

        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
            <div className="modal-content">
            <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Task</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
        
            <form>
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input type="text" className="form-control my-2" id="etitle" value ={task.etitle} name = "etitle" aria-describedby="emailHelp" onChange = {onChange} minLength = {5} required/>
                </div>
                <div className="form-group my-3">
                    <label htmlFor="description">Description</label>
                    <input type="text" className="form-control my-2" id="edescription" value ={task.edescription} name = "edescription" onChange = {onChange} minLength = {5} required/>
                </div>
                <div className="form-group my-3">
                    <label htmlFor="due_date">Deadline</label>
                    <input type="text" className="form-control my-2" id="edue_date" value ={task.edue_date} name = "edue_date" onChange = {onChange} minLength = {4} required/>
                </div>
            </form>
        </div>
            <div className="modal-footer">
                <button ref = {refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button disabled ={task.etitle.length<5 || task.edescription.length < 5} type="button" onClick ={handleOnClick} className="btn btn-primary">Update Task</button>
            </div>
            </div>
            </div>
        </div>
        
        <div className="row my-3">
                <h1> Your Tasks </h1>
                <div className="container mx-2">
                {/* {tasks.length === 0 && "No Tasks to display"} */}
                {Array.isArray(tasks) && tasks.length === 0 && "No Task to display"}

                </div>
                   
            {Array.isArray(tasks) && tasks.length > 0 ? (
                tasks.map((task)=>{
                    return <Taskitem key ={task._id} updateTask = {updateTask} task = {task} showAlert = {props.showAlert}/>
                })
            ):(
                <p>No Tasks to display</p>
            )}
        </div>
    </>
  )
}

export default Tasks