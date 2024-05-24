import {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {useNavigate} from 'react-router-dom';

import styles from './EditarLivro.module.css'

import Input from '../components/form/Input';
import Select from '../components/form/Select';

function EditarLivro() {

    const [categories, setCategories] = useState([]);

    const [book, setBook] = useState({});

    const navigate = useNavigate();

    //Recuperando o ID da URL
    const {id} = useParams(); //Paramêtro via URL
    console.log('ID:' + id);

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
    
     //Funcionalidade de edição de livro
    function editBook(book) {
        fetch(`http://localhost:5000/books/${book.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify(book)
        })
        .then(resp=>resp.json())
        .then((data)=>{
            setBook(data)
            navigate('/livros', {state:'Livro alterado com sucesso!'})
        })
        .catch((err)=>{console.log(err)});
    }

    //Função de submit controlado por dados
    function submit(event) {
        event.preventDefault();
        editBook(book);
    }
    
    return(
        <div className={styles.book_container}>
            <hi className={styles.book_text}>Edição de Livro</hi>
            <form onSubmit={submit}>

                <Input type='text' name='name_livro' id='name_livro' text='Título do livro' placeholder='Digite o título do livro' value={book.name_livro} handlerOnchange={handlerChangeBook}/>
                <Input type='text' name='name_autor' id='name_autor' text='Autor' placeholder='Digite o nome do autor' value={book.name_autor} handlerOnchange={handlerChangeBook}/>
                <Input type='text' name='descricao_livro' id='descricao_livro' text='Descrição' placeholder='Digite a descrição do livro' value={book.descricao_livro} handlerOnchange={handlerChangeBook}/>

                <Select name='categoria_id' text='Selecione a categoria do livro' options={categories} handlerOnchange={handlerChangeCategory} />

                <p>
                    <input type='submit' value='Editar livro' />
                </p>
            
            </form>
        </div>
    )
}

export default EditarLivro;