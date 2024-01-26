import React from "react";
import Tasks from './Tasks'

const Home = (props) => {
 const {showAlert} = props
  return (
    <div>
        <Tasks showAlert = {showAlert}/>
        
    </div>
  )
}

export default Home