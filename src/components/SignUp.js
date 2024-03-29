import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignUp = (props) => {
  const [credentials, setCredentials] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  let navigate = useNavigate();

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const { username, email, password, confirmPassword } = credentials;

    // Check if passwords match
    if (password !== confirmPassword) {
      props.showAlert('Passwords do not match', 'danger');
      return;
    }

    try {
      // Sending signup request
      const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username,
          email,
          password,
          confirmPassword
        }),
      });

      const json = await response.json();
      // console.log(json);

      // Handle response
      if (json.success) {
        localStorage.setItem('token', json.authtoken);
        props.showAlert("Your Account Created Successfully", "success");
        navigate('/');
      } else {
        props.showAlert("Something went wrong! Please Try Again.", "danger");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="container mt-3">
    <div className="row justify-content-center">
      <div className="col-md-6">
        <h2>Create an account to use TaskHub</h2>
        <form onSubmit={handleOnSubmit}>
          <div className="row">
            <div className="col">
              <input type="text" name="username" onChange={onChange} id="username" className="my-3 form-control" placeholder="Enter Your Name" aria-label="Enter Your Name" required />
            </div>
          </div>
          <div className="mb-3">
            <input type="email" name="email" className="form-control" onChange={onChange} id="email" placeholder="Enter Your Email" required />
          </div>
          <div className="mb-3">
            <input type="password" name="password" className="form-control" onChange={onChange} id="password" placeholder="Enter Password" minLength={5} required />
          </div>
          <div className="mb-3">
            <input type="password" name="confirmPassword" className="form-control" onChange={onChange} id="confirmPassword" placeholder="Confirm Password" minLength={5} required />
          </div>
          <div className="col-12">
            <div className="form-check">
              <input className="form-check-input" type="checkbox" onChange={onChange} id="gridCheck" />
              <label className="form-check-label" htmlFor="gridCheck">
                I accept the Terms of Use & Privacy Policy
              </label>
            </div>
          </div>
          <div className="col-12">
            <button type="submit" className="btn btn-primary my-3">SignIn</button>
          </div>
        </form>
      </div>
    </div>
  </div>
  );
};

export default SignUp;