import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from 'react-redux'
import { login } from '../features/auth/authSlice'

const Register = () => {

  const [inputs, setInputs] = useState({
    username: '',
    password: '',
  });
  
  const {username, password} = inputs;
  
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

    const loginInfo = {
      username,
      password,
    }

    dispatch(login({username: username, password:password}))
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
    <div className='title'>Login</div>
    <section className='form'>
    <form onSubmit={onSubmit}>
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
        <button className='btn btn-block'>Login</button>
      </div>
      <p onClick={onClick}>Don't have an account? Register here.</p>
      
    </form>
  </section>
</>  )
}

export default Register