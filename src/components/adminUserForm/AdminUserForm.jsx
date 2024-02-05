"use client"

import styles from './adminUserForm.module.css'
import { useFormState } from 'react-dom';
import { addUser } from '@/lib/serverActions';


const AdminUserForm = () => {
    const [state, formAction] = useFormState(addUser, undefined)

  return (
    <form action={formAction} className={styles.container}>
        <h1>Add New User</h1>
        <input type="text" name='username' placeholder='Name' />
        <input type="text" name='email' placeholder='Email' />
        <input type="password" name='password' placeholder='Password' />
        <input type="text" name='image' placeholder='Image' />
        <select name="isAdmin" id="">
            <option value="false">Is Admin?</option>
            <option value="false">No</option>
            <option value="true">Yes</option>
        </select>
        <button>Add Post</button>
        {state && state.error}
    </form>
  )
}

export default AdminUserForm