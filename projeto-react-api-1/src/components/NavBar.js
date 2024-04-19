import {Outlet, Link} from 'react-router-dom';
import Container from './Container';
import styles from './NavBar.module.css';

function NavBar() {
    return(
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
 )
}

export default NavBar;