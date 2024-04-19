import {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';

import styles from './NovoLivro.module.css';

import Input from '../components/form/Input';
import Select from '../components/form/Select';

function NovoLivro() {

    /*Objeto de navegação*/
    const navigate = useNavigate();

    /*State de dados das categorias vindas do arquivo db.json*/ 
    const [categories, setCategories] = useState([]);

    /*State de dados que vai armazenar o objeto json de livro*/
    const [book, setBook] = useState({});

    /*Recupera od dados de catefpriadp arquivo db.jso*/
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

        console.log(book)

        /*Inserção dos dados de livro*/
        function createBook(book) {
            fetch('http://localhost:5000/books', {
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body: JSON.stringify(book)
            })
            .then(
                (resp)=>resp.json()
            )
            .then(
                (data)=>{
                    console.log(data)
                    navigate('/livros', {state:'Livro cadastrado com sucesso!'})
                }
            )
            .catch(
                (err)=>{
                    console.log(err)
                }
            )
        } 

        /*Função de submit*/
        function submit(event){
            event.preventDefault();
            createBook(book)
        }
        
    return(
       <section className={styles.novo_livro_container}>
            <h1>Cadastro de livro</h1>
            <form onSubmit={submit}>

                <Input type='text' name='name_livro' id='name_livro' text='Título do livro' placeholder='Digite o título do livro' handlerOnchange={handlerChangeBook} />
                <Input type='text' name='name_autor' id='name_autor' text='Autor' placeholder='Digite o nome do autor' handlerOnchange={handlerChangeBook} />
                <Input type='text' name='descricao_livro' id='descricao_livro' text='Descrição' placeholder='Digite a descrição do livro' handlerOnchange={handlerChangeBook} />

                <Select name='categoria_id' text='Selecione a categoria do livro' options={categories} handlerOnchange={handlerChangeCategory} />

                <p>
                    <input type='submit' value='Cadastrar livro' />
                </p>   

            </form>
       </section>
    )
}

export default NovoLivro;