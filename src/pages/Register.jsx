import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from 'react-redux'
import { register } from '../features/auth/authSlice'

const Register = () => {

  const [inputs, setInputs] = useState({
    username: '',
    email: '',
    password: '',
    first_name: '',
    last_name: ''
  });
  
  const {username, email, password, first_name, last_name} = inputs;
  
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) =>{
        setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))

  }
  
  const onSubmit = (e) =>{
    e.preventDefault()

    const registerInfo = {
      username, email, password, first_name, last_name    }

    dispatch(register(registerInfo))
    .unwrap()
    .then((user) => {
      // NOTE: by unwrapping the AsyncThunkAction we can navigate the user after
      // getting a good response from our API or catch the AsyncThunkAction
      // rejection to show an error message
      toast.success(`Logged in as ${user.username}`)
      navigate('/home')
    })
    .catch(toast.error)

  }

  const onClick = () => {
    navigate('/');
  }

  return (
    <>
    <div className='title'>Register</div>
    <section className='form'>
    <form onSubmit={onSubmit}>
    <div className='form-group'>
        <input
          type='first_name'
          className='form-control'
          id='first_name'
          name='first_name'
          value={first_name}
          onChange={handleChange}
          placeholder='Enter your first name'
          required
        />
      </div>
      <div className='form-group'>
        <input
          type='last_name'
          className='form-control'
          id='last_name'
          name='last_name'
          value={last_name}
          onChange={handleChange}
          placeholder='Enter your last name'
          required
        />
      </div>
      
      <div className='form-group'>
        <input
          type='email'
          className='form-control'
          id='email'
          name='email'
          value={email}
          onChange={handleChange}
          placeholder='Enter your email address'
          required
        />
      </div>
      <div className='form-group'>
        <input
          type='username'
          className='form-control'
          id='username'
          name='username'
          value={username}
          onChange={handleChange}
          placeholder='Enter your username'
          required
        />
      </div>
      <div className='form-group'>
        <input
          type='password'
          className='form-control'
          id='password'
          name='password'
          value={password}
          onChange={handleChange}
          placeholder='Enter password'
          required
        />
      </div>

      <div className='form-group'>
        <button className='btn btn-block'>Register</button>
      </div>
      <p onClick={onClick}>Have an account? Login here.</p>
      
    </form>
  </section>
</>  )
}

export default Register