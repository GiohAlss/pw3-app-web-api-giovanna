import styles from './Home.module.css';

function Home() {
    return(
        <section className={styles.home_container}>
            <h1>Bem vindo ao Web App <span>LIBRI</span></h1>
            <p>Comece a gerenciar seus livros agora mesmo!</p>
        </section>
    )
}

export default Home;