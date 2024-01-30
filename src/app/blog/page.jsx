// import { getPosts } from '@/lib/data';
import styles from './blog.module.css'
import PostCard from '@/components/postCard/PostCard'


export const metadata = {
  title: "Blog Posts - Blogs Page",
  description: "Blogs Page Description",
};

const getPosts = async() => {
  const res = await fetch('http://localhost:3000/api/blog');
  if(!res.ok){
    throw new Error('Something went wrong. Feiled to fetch data!')
  };
  return res.json();
}

const BlogPage = async () => {

  const posts = await getPosts()

  return (
    <div className={styles.container}>
      {posts.map((post) => (
      <div className={styles.post} key={post.id}>
        <PostCard post={post} />
      </div>      
      ))}
    </div>
  )
}

export default BlogPage