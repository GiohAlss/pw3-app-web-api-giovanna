import {useLocation} from 'react-router-dom';
import Message from '../components/message/Message';
import styles from './Livros.module.css';

function Livros() {

    const location = useLocation();
    let message='';

    console.log('Location State: ' + location.state)

    if(location.state) {
        message = location.state;
    }

    return(
       <section className={styles.livros_container}>
            <h1>Aqui serão listados os livros</h1>

            {
                message && (
                    <Message
                        msg={message}
                        type='success'
                    />
                )
            }
       </section>
    )
}

export default Livros;