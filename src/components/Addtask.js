import React, {useContext, useState}  from 'react';
import TaskContext from '../Context/Tasks/taskContext';

const AddTask = (props) => {
    const context = useContext(TaskContext)
    const {addTask} = context;
    const [task, setTask] = useState({title:"", description:"", due_date:""}) 

    const handleOnClick = (e) =>{
        e.preventDefault()
        addTask(task.title, task.description, task.due_date);
        setTask({title:"", description:"", due_date:""})
        props.showAlert("New Task Added", "success")
    }

    const onChange = (e) =>{
        setTask({...task,[e.target.name]: e.target.value})
    }

  return (
    <div className="container">
      <h1> Add New Task </h1>
        <div className="container my-3">
            <form>
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input type="text" className="form-control my-2" id="title" value = {task.title} name = "title" aria-describedby="emailHelp" onChange = {onChange} minLength ={5} required/>
                </div>
                <div className="form-group my-3">
                    <label htmlFor="description">Description</label>
                    <input type="text" className="form-control my-2" id="description" value = {task.description} name = "description" onChange = {onChange} minLength = {5} required />
                </div>
                <div className="form-group my-3">
                    <label htmlFor="due_date">Deadline</label>
                    <input type="text" className="form-control my-2" id="due_date" value = {task.due_date} name = "due_date" onChange = {onChange} minLength = {4} required/>
                </div>
                <button disabled ={task.title.length<5 || task.description.length< 5} type="submit" className="btn btn-primary" onClick={handleOnClick}> Add New Task</button>
            </form>
        </div>
    </div>
  )
}

export default AddTask;