"use client"

import { addPost } from '@/lib/serverActions';
import styles from './adminPostForm.module.css'
import { useFormState } from 'react-dom';


const AdminPostForm = ({ session }) => {

    const [state, formAction] = useFormState(addPost, undefined)

  return (
    <form action={formAction} className={styles.container}>
        <h1>Add New Post</h1>
        <input type="hidden" name='userId' value={session.user.id} />
        <input type="text" name='title' placeholder='Title' />
        <input type="text" name='slug' placeholder='Slug' />
        <input type="text" name='image' placeholder='Image' />
        <textarea type="text" name='desc' rows={10} placeholder='Description' />
        <button>Add Post</button>
        {state && state.error}
    </form>
  )
}

export default AdminPostForm