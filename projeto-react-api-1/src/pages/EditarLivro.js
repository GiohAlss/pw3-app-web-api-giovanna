import {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';

import styles from './EditarLivro.module.css';

import Input from '../components/form/Input';
import Select from '../components/form/Select';

function EditarLivro() {

    const [categories, setCategories] = useState([]);

    //Recuperando o ID da URL
    const {id} = useParams(); //Paramêtro via URL
    console.log('ID:' + id);

    const [book, setBook] = useState({});

    //
    useEffect(()=> {
        fetch(
            'http://localhost:5000/categorias',
            {
                method:'GET',
                headers:{
                    'Content-Type':'application/json'
                }
            }).then(
                (resp)=>
                    resp.json()
            ).then(
                (data)=>{
                    setCategories(data);
                    console.log(data);
                }
            ).catch(
                (error)=>{
                    console.log(error);
                }
            )
        }, [])

    //Recuperando os dados de livro para edição
    useEffect(()=>{
        fetch(`http://localhost:5000/books/${id}`, {
            method: 'GET',
            headers: {
              'Content-Type':'application/json'
            }
        })
        .then((resp)=>resp.json())
        .then((data)=>setBook(data))
        .catch((err)=>{console.log(err)});
    }, []);

     /*Handler de captura dos dados de input*/
     function handlerChangeBook(event) {
        setBook({...book, [event.target.name] : event.target.value});
        console.log(book)
    }

    /*Handler de captura dos dados de select (id e categoria)*/
    function handlerChangeCategory(event) {
        setBook({...book, category:{
            id: event.target.value,
            category: event.target.options[event.target.selectedIndex].text
        }});
    }

    return(
        <div className={styles.book_container}>
            <hi className={styles.book_text}>Edição de Livro</hi>

            <form>

                <Input type='text' name='name_livro' id='name_livro' text='Título do livro' placeholder='Digite o título do livro' value={book.name_livro} handlerOnchange={handlerChangeBook}/>
                <Input type='text' name='name_autor' id='name_autor' text='Autor' placeholder='Digite o nome do autor' value={book.name_autor} handlerOnchange={handlerChangeBook}/>
                <Input type='text' name='descricao_livro' id='descricao_livro' text='Descrição' placeholder='Digite a descrição do livro' value={book.descricao_livro} handlerOnchange={handlerChangeBook}/>

                <Select name='categoria_id' text='Selecione a categoria do livro' options={categories} handlerOnchange={handlerChangeCategory} />

            </form>
        </div>
    )
}

export default EditarLivro;