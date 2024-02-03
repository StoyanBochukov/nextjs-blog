import styles from './login.module.css'
import LoginForm from '@/components/loginForm/LoginForm';
import { handleGitHubLogin } from '@/lib/serverActions';
import { FaGithub } from 'react-icons/fa'

const LoginPage = () => {

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <form action={handleGitHubLogin}>
          <button className={styles.github}>
            Login with GitHub
            <FaGithub />
          </button>
        </form>
        <LoginForm />
      </div>
    </div>
  )
}

export default LoginPage