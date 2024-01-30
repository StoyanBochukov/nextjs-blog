import React from 'react'
import { handleGitHubLogin, login } from '@/lib/serverActions';

const LoginPage = async() => {

  return (
    <div>
      <form action={handleGitHubLogin}>
        <button>Login with GitHub</button>
      </form>
      <form action={login}>
        <input type="text" placeholder='Email' name='email' />
        <input type="password" placeholder='Password' name='password' />
        <button type='submit'>Login with Credentials</button>
      </form>
    </div>
  )
}

export default LoginPage