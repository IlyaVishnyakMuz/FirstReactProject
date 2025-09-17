import classes from './App.module.css'
import { Item } from './components/Item/Item'
import { Empty } from './components/Empty/Empty'
import { useState } from 'react'
import { Top } from './components/Top/Top';

export default function App() {
  const [title, setTitle] = useState('');
  const [items, setItems] = useState([]);
  const [draggedItem, setDraggedItem] = useState(null);
  const [isEmpty, setIsEmpty] = useState(items.length == 0);

  function handleDragStart(index) {
    setDraggedItem(index);
  };

  function handleDrop(index) {
    console.log(index)
    const newItems = [...items];
    const [removed] = newItems.splice(draggedItem, 1);
    newItems.splice(index, 0, removed);
    setItems(newItems);
    setDraggedItem(null);
  };

  function changeTitle(e) {
    setTitle(e.target.value);
  }

  function addItem(e) {
    if(title.length == 0 || e.keyCode != undefined && e.keyCode != 13) {
      return
    }
    const currentTime = new Date()
    setItems(prev => [
      ...prev,
      {
        'id': items.length,
        'title': title,
        'time': currentTime.toLocaleTimeString()
      }]
    );
    setTitle('')
    setIsEmpty(false);
  }

  function removeItem(itemId) {
    setItems(prev => {
      const filteredItems = prev.filter(item => item.id != itemId)
      setIsEmpty(filteredItems.length == 0)
      return filteredItems
    })
  }

  function removeAll() {
    setIsEmpty(true);
    setItems([])
  }

  return (
    <div className={classes.container}>
      <Top 
        addItem={addItem} 
        removeAll={removeAll} 
        changeTitle={changeTitle} 
        title={title} 
      />
      <div className={classes.items}>
          {
            isEmpty ? <Empty/> : 
            items.map((item, index) => 
              <Item 
                key={item.id} 
                {...item} 
                onClick={() => removeItem(item.id)}
                draggable
                onDragStart={() => handleDragStart(index)}
                onDragOver={(e) => e.preventDefault()}
                onDrop={() => handleDrop(index)}
              />
            )
          }
      </div>
    </div>
  )
}
