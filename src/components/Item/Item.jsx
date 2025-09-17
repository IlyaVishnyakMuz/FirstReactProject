import classes from './Item.module.css'

export function Item(props) {
    return(
        <div 
            className={classes.item}
            draggable
            onDragStart={props.onDragStart}
            onDragOver={props.onDragOver}
            onDrop={props.onDrop}
        >
            <h3>{props.title}</h3>
            <p>{props.time}</p>
            <button onClick={props.onRemove}>Сделано</button>
        </div>
    )
}
