import classes from './Items.module.css'
import { Item } from '../Item/Item'
import { Empty } from '../Empty/Empty'
import { useState } from "react";

export function Items({items, setItems}) {
    const [draggedItem, setDraggedItem] = useState(null);
    
    function handleDragStart(index) {
        setDraggedItem(index);
    }

    function handleDrop(index) {
        if (draggedItem === null) return;

        const newItems = [...items];
        const [removed] = newItems.splice(draggedItem, 1);
        newItems.splice(index, 0, removed);

        setItems(newItems);
        setDraggedItem(null);
    }

    function removeItem(itemId) {
        const filteredItems = items.filter(item => item.id !== itemId);
        setItems(filteredItems);
    }
    
    return(
        <div className={classes.items}>
            {items.length === 0 ? (
                <Empty />
            ) : (
                items.map((item, index) => (
                <Item
                    key={item.id}
                    {...item}
                    onRemove={() => removeItem(item.id)}
                    draggable
                    onDragStart={() => handleDragStart(index)}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={() => handleDrop(index)}
                />
                ))
            )}
        </div>
    )
}
