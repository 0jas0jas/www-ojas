import Image from 'next/image'
import Link from 'next/link'
import styles from './page.module.css'

export default function Home() {
  return (
    <main className={styles.main}>

      <div className={styles.center}>
        <h1> Ojas Srivastava </h1>
        
        <h2>Hiuehflisjkfbhskfhnfishblifshfifbsfihbflsbfhihdjksfhshfuhfsiufh</h2>

        <p> Hey, I'm Ojas! I'm an Undergraduate student at McGill University
           studying Mathematics and Computer Science. I program <Link className={styles.link} href="/">projects</Link> and
           make ramen for fun, while being an aspiring Research Scientist. </p>
      </div>

    </main>
  )
}
