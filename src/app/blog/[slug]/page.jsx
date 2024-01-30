import Image from 'next/image'
import styles from './single-page.module.css'
import PostUser from '@/components/postUser/PostUser'
import { Suspense } from 'react';
// import { getSignlePost } from '@/lib/data';


const getPost = async (slug) => {
  const res = await fetch(`http://localhost:3000/api/blog/${slug}`);
  if(!res.ok){
    throw new Error('Something went wrong. Post not found!')
  };
  return res.json();
}

export const generateMetadata = async ({params}) => {
  const { slug } = params;
  const post = await getPost(slug);

  return {
    title: post.title,
    description: post.desc
  }
}

const SinglePost = async ({ params }) => {

  const { slug } = params;
  const post = await getPost(slug);

  return (
    <div className={styles.container}>
      <div className={styles.imgContainer}>
        <Image className={styles.img} src={post.image} alt='' fill />
      </div>
      <div className={styles.textContainer}>
        <h1 className={styles.title}>{post.title}</h1>
        <div className={styles.details}>
           {post && (
            <Suspense fallback={<div>Loading...</div>}>
              <PostUser id={post.userId} />
            </Suspense>
           )}
          <div className={styles.detailText}>
            <div className={styles.detailTitle}>Published</div>
            <div className={styles.detailValue}>{post.createdAt.toString().slice(4, 16)}</div>
          </div>
        </div>
        <div className={styles.content}>
          {post.desc}
        </div>
      </div>
    </div>
  )
}

export default SinglePost