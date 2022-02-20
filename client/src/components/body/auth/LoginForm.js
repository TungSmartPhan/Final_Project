import React from 'react'
import {FcGoogle} from 'react-icons/fc'
import  Input from './input/Input'
function LoginForm() {
  return (
    <form className="login">
        {/* Drop down prop into Input so we got */}
      <Input type="email"  text="Email"/>
      <Input type="password"  text="Password"/>
      <div className="login_btn">
          <button>Login</button>
          <button className="login_btn-gg">Sign In with Google <FcGoogle/> </button>
      </div>
      </form>
  )
}

export default LoginForm