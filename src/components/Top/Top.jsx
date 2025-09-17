import classes from './Top.module.css'

export function Top(props) {
    return(
        <div className={classes.top}>
            <input 
                type="text" 
                value={props.title} 
                onChange={props.changeTitle} 
                onKeyDown={props.addItem} 
                placeholder='Введите задание' 
            />
            <button onClick={props.addItem}>Добавить</button>
            <button onClick={props.removeAll}>Удалить все</button>
        </div>
    )
}
