import classes from './Empty.module.css'

export function Empty() {
    return(
        <div className={classes.empty}>
            <h3>Ничего нету</h3>
            <p>Нажмите добавить чтобы добавить свой первый элемент</p>
        </div>
    )
}