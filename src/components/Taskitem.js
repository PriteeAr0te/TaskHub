import React, {useContext}  from 'react';
import TaskContext from '../Context/Tasks/taskContext';

const Taskitem = (props) => {
    const context = useContext(TaskContext)
    const {deleteTask} = context;
    const{task, updateTask} = props;
  return (
    <div className="col-sm-4 mb-3 mb-sm-0 my-3">
      <div className="card text-bg-light my-3">
      <div className="card-header fs-3">{task.title}</div>
        <div className="card-body">
          <p className="card-title fw-bold text-end">Your Deadline: {task.due_date}</p>
          <p className="card-text">{task.description}</p>
          <i className="fa-solid fa-trash mx-2" onClick={()=>{deleteTask(task._id); props.showAlert("Task Deleted", "Successfully")}}></i>
          <i className="fa-solid fa-pen-to-square mx-2" onClick={()=>{updateTask(task)}}></i>
        </div>
      </div>
    </div>
  )
}

export default Taskitem;