import {Outlet, Link} from 'react-router-dom';
import styles from './NavBar.module.css';
import Container from './Container';

function NavBar() {
    return(
        <>
            <Container>
                <ul className={styles.list}>

                    <li className={styles.item}>
                        <Link to='/'>HOME</Link>
                    </li>

                    <li className={styles.item}>
                        <Link to='/livros'>LIVROS</Link>
                    </li>
                    
                    <li className={styles.item}>
                        <Link to='/novolivro'>CADASTRAR LIVRO</Link>
                    </li>

                </ul>

                <Outlet/>

            </Container>
    </>
 )
};

export default NavBar;