import styles from './home.module.css'
import Image from 'next/image'

const Home = () => {
  return (
    <div className={styles.container}>
      <div className={styles.textContainer}>
        <h1 className={styles.title}>Creative Thoughts Agenccy</h1>
        <p className={styles.desc}>Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Sit saepe labore dolores nemo voluptates laboriosam, illo corporis voluptatem?
          Placeat molestiae sint obcaecati? 
          Nisi velit reprehenderit repudiandae dignissimos nostrum obcaecati minus!</p>
          <div className={styles.buttons}>
            <button className={styles.button}>Learn More</button>
            <button className={styles.button}>Contact</button>
          </div>
          <div className={styles.brands}>
            <Image src='/brands.png' alt='brands' fill  className={styles.brandImg}/>
          </div>
      </div>
      <div className={styles.imageContainer}>
        <Image src='/hero.gif' alt='img' fill className={styles.heroImg} />
      </div>
    </div>
  )
}

export default Home