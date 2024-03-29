import styles from './NovoLivro.module.css';
import Input from '../components/form/Input';

function NovoLivro() {
    return(
       <section className={styles.novo_livro_container}>

            <h1>Cadastro de livro</h1>

            <form>
                
                {/* <p>
                    <input type='text' placeholder='Nome do livro' />
                </p> */}

                <Input 
                    type='text'
                    name='name_livro'
                    placeholder='Digite o título do livro'
                    text='Digite o título do livro'
                />

                {/* <p>
                    <input type='text' placeholder='Nome do autor' />
                </p> */}

                <Input 
                    type='text'
                    name='name_autor'
                    placeholder='Digite o nome do autor'
                    text='Digite o título do livro'
                />
             
                {/* <p>
                    <input type='text' placeholder='Descrição do livro' />
                </p> */}

                <Input 
                    type='text'
                    name='descricao_livro'
                    placeholder='Digite a descrição do livro'
                    text='Descrição'
                />

                <p>
                    <input type='submit' value='Cadastrar livro' />
                </p>   
                
            </form>

       </section>
    )
}

export default NovoLivro;