import styles from './Container.module.css';

function Container(props) {
    return(
        <div className={`${styles.container} ${styles.min_height}`}>
            {props.children}
        </div>
    )
}

export default Container;