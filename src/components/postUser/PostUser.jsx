import { getUser } from '@/lib/data';
import styles from './post-user.module.css';
import Image from 'next/image';

const PostUser = async ({ id }) => {

    const user = await getUser(id);

  return (
    <div className={styles.container}>
      <Image className={styles.avatar} 
          src={user.image ? user.image : '/noavatar.png'}
           alt='' width={50}
           height={50} />
           <div className={styles.text}>
            <span className={styles.title}>Author</span>
            <span className={styles.username}>{user.username}</span>
           </div>
    </div>
  )
}

export default PostUser