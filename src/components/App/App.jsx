import classes from './App.module.css'
import { Items } from '../Items/Items'
import { Top } from '../Top/Top'
import { useItems } from '../../common/LocalStorage.js'

export default function App() {
  const [items, setItems] = useItems();

  return (
    <div className={classes.container}>
      <Top items={items} setItems={setItems} />
      <Items items={items} setItems={setItems} />
    </div>
  );
}
