import classes from './App.module.css'
import { Item } from '../Item/Item'
import { Empty } from '../Empty/Empty'
import { useState } from 'react'
import { Top } from '../Top/Top';

const localStorageName = 'items';

function saveItems(items) {
  if(items == null) {
    localStorage.setItem(localStorageName, []);
  } else {
    localStorage.setItem(localStorageName, JSON.stringify(items));
  }
}

function getItems() {
  let items = localStorage.getItem(localStorageName);
  return JSON.parse(items || "[]")
}

export default function App() {
  const [title, setTitle] = useState('');
  const [items, setItems] = useState(getItems);
  const [draggedItem, setDraggedItem] = useState(null);
  const [isEmpty, setIsEmpty] = useState(items.length == 0);

  function handleDragStart(index) {
    setDraggedItem(index);
  };

  function handleDrop(index) {
    const newItems = [...items];
    const [removed] = newItems.splice(draggedItem, 1);
    newItems.splice(index, 0, removed);
    setItems(newItems);
    saveItems(newItems);
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
    setItems(prev => {
      const newArray = [
        ...prev,
        {
          'id': items.length,
          'title': title,
          'time': currentTime.toLocaleTimeString()
        }
      ]
      saveItems(newArray);
      return newArray;
    });
    setTitle('')
    setIsEmpty(false);
  }

  function removeItem(itemId) {
    setItems(prev => {
      const filteredItems = prev.filter(item => item.id != itemId)
      setIsEmpty(filteredItems.length == 0)
      if (filteredItems.length == 0) {
        saveItems(null);
      } else {
        saveItems(filteredItems);
      }
      return filteredItems
    })
  }

  function removeAll() {
    setIsEmpty(true);
    saveItems(null)
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
                onRemove={() => removeItem(item.id)}
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
