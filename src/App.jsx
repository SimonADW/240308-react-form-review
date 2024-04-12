import { useRef, useState } from 'react'

import './App.css'

function App() {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: ""
  });
  const [errors, setErrors] = useState({});
  const [userList, setUserList] = useState([]);
  const userFormRef = useRef(null);

  const handleChange = (e)=> {
    setErrors((prevError)=> ({...prevError, [`${e.target.name}Error`]:""}))
    const userFormData = new FormData(userFormRef.current);
    const newUser = Object.fromEntries(userFormData.entries());
    setUser(newUser)
  }

  const validateForm = ()=> {
    let isValid = true;
    const clonedErrors = {...errors};

    if(!user.firstName.trim()) {      
      clonedErrors.firstNameError = "Firstname required";
      isValid = false;
    }

    if(!user.lastName.trim()) {      
      clonedErrors.lastNameError = "Lastname required";
      isValid = false;
    }

    if(!user.email.trim()) {      
      clonedErrors.emailError = "Email required";
      isValid = false;
    }

    setErrors(clonedErrors);
    return isValid;
  }

  const handleSubmit = (e)=> {
    e.preventDefault();

    if(validateForm()) {
      console.log("Submit successful"); 
      setUserList((prev)=> [...prev, user]);
      userFormRef.current.reset()
    }
  }

  return (
    <>
      <h3>Simons Review session</h3>
      <h1>React Forms</h1>
      <form action="" ref={userFormRef} onSubmit={handleSubmit} noValidate>
        <input type="text" name='firstName' placeholder='Enter first name' onChange={handleChange}/>
        <p>{errors.firstNameError}</p>
        <input type="text" name='lastName' placeholder='Enter last name' onChange={handleChange}/>
        <p>{errors.lastNameError}</p>
        <input type="email" name='email' placeholder='Enter email' onChange={handleChange}/>
        <p>{errors.emailError}</p>
        <button>Submit</button>
      </form>


      {/* RENDER LIST OF USERS */}
      <h3>Userlist</h3>
      <div>
        {userList.map((user)=> `${user.firstName} ${user.lastName} - Email: ${user.email}   `
           //OR A DYMAMIC WAY
          //  Object.entries(user).map(([key, value],index) => <div key={Date.now()+index}>{key}: {value}</div>)
        )}
      </div>
    </>
  )
}

export default App
