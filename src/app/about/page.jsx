import Image from "next/image"
import styles from './about.module.css'

export const metadata = {
  title: "Blog Posts About Page",
  description: "About Page Description",
};

const AboutPage = () => {
  return (
    <div className={styles.container}>
     <div className={styles.textContainer}>
      <h2 className={styles.subtitle}>About CodingPappas</h2>
      <h1 className={styles.title}>
        We create digital ideas that are bigger, bolder, braver and better.
      </h1>
      <p className={styles.desc}>
       Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae eius ut
       quibusdam veniam, molestiae nobis consectetur deleniti, dolor maiores blanditiis
       tenetur iste est maxime pariatur consequatur adipisci? Repellat, error illum?
      </p>
      <div className={styles.boxes}>
        <div className={styles.box}>
          <h1>10 K+</h1>
          <p>Years of experience</p>
        </div>
        <div className={styles.box}>
          <h1>10 K+</h1>
          <p>Years of experience</p>
        </div>
        <div className={styles.box}>
          <h1>10 K+</h1>
          <p>Years of experience</p>
        </div>
      </div>
     </div>
     <div className={styles.imgContainer}>
      <Image src='/about.png' alt="about image" fill className={styles.img} />
     </div>
    </div>
  )
}

export default AboutPage