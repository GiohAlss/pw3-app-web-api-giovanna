import {Link} from 'react-router-dom';
import styles from './CardBook.module.css';

function CardBook({id, livro, autor, categoria, handlerRemove}) {

    const remove = (event)=> {
        event.preventDefault();
        handlerRemove(id);
    }

    return(
        <div className={styles.book_card}>
            <h4>{livro}</h4>
            <p>{autor}</p>
            <p className={styles.category_text}>
                <span></span>{categoria}
            </p>

            <div className={styles.book_card_actions}>

                <Link to={`/editarLivro/${id}`}>
                    Editar
                </Link>

                <button onClick={remove}>
                    Excluir
                </button>
            </div>
        </div>
    )
}

export default CardBook;