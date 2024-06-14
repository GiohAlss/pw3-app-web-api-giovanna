import {useState, useEffect} from 'react';
import {useLocation} from 'react-router-dom';
import Message from '../components/message/Message';
import CardBook from '../components/cardBook/CardBook';
import styles from './Livros.module.css';

function Livros() {

    const [books, setBooks] = useState([]);

    //Estado de dados da mensagem de exclusão de livros
    const [bookMessage, setBookMessage] = useState('');

    useEffect(()=>{
        fetch('http://localhost:5000/listagemLivros', {
            method:'GET',
            mode:'cors',
            headers: {
              'Content-Type':'application/json',
              'Access-Control-Allow-Origin':'*',
              'Access-Control-Allow-Headers':'*',
            }
        })
        .then((resp)=>resp.json())
        .then((data)=>setBooks(data.data))
        .catch((err)=>{console.log(err)});
    }, []);

    //Função de exclusão de livro
    function removeBooks(id) {
        fetch(`http://localhost:5000/excluirLivro/${id}`, {
            method:'DELETE',
            mode:'cors',
            headers: {
              'Content-Type':'application/json',
              'Access-Control-Allow-Origin':'*',
              'Access-Control-Allow-Headers':'*',
            }
        })
        .then((resp)=>resp.json())
        .then(
            (data)=>{
                setBooks(books.filter((book_data)=>book_data.cod_livro !== id)) //filtra e deleta o único id que é diferente dos demais
                setBookMessage('Livro escluído com sucesso!')
            }
        )
        .catch((err)=>{console.log(err)});
    }
    
    const location = useLocation();
    let message='';

    //console.log('Location State: ' + location.state)

    if(location.state) {
        message = location.state;
    }

    return(
       <section className={styles.livros_container}>
            <h1>Aqui serão listados os livros</h1>
            
            {//Mensagem de sucesso para cadastro
                message && (
                    <Message
                        msg={message}
                        type='success'
                    />
                )
            }

            {//Mensagem de sucesso para exclusão
                bookMessage && (
                    <Message
                        msg={bookMessage}
                        type='success'
                    />
                )
            }

            {
                books.map((book)=>(
                    <CardBook
                        id={book.cod_livro}
                        livro={book.nome_livro}
                        autor={book.autor_livro}
                        //categoria={book.category.category}
                        key={book.cod_livro}
                        handlerRemove={removeBooks}
                    />
                    
                ))
            }
       </section>
    )
}

export default Livros;