import {useState, useEffect} from 'react';
import styles from './NovoLivro.module.css';

import Input from '../components/form/Input';
import Select from '../components/form/Select';

function NovoLivro() {

    const [categories, setCategories] = useState([]);

    useEffect(() =>{
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

    return(
       <section className={styles.novo_livro_container}>
            <h1>Cadastro de livro</h1>
            <form>

                <Input type='text' name='name_livro' text='Título do livro' placeholder='Digite o título do livro' />
                <Input type='text' name='name_autor' text='Autor' placeholder='Digite o nome do autor' />
                <Input type='text' name='descricao_livro' text='Descrição' placeholder='Digite a descrição do livro' />

                <Select name='categoria_id' text='Selecione a categoria do livro' options={categories} />

                <p>
                    <input type='submit' value='Cadastrar livro' />
                </p>   

            </form>
       </section>
    )
}

export default NovoLivro;