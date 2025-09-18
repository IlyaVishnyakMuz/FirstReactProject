import { useState } from "react";
import classes from "./Top.module.css";

export function Top({ items, setItems }) {
  const [title, setTitle] = useState("");

  function changeTitle(e) {
    setTitle(e.target.value);
  }

  function addItem(e) {
    if (e.key && e.key !== "Enter") return;

    if (title.trim().length === 0) return;

    const currentTime = new Date();
    setItems([
      ...items,
      {
        id: Date.now(),
        title,
        time: currentTime.toLocaleTimeString(),
      },
    ]);
    setTitle("");
  }

  function removeAll() {
    setItems([]);
  }

  return (
    <div className={classes.top}>
      <input
        type="text"
        value={title}
        onChange={changeTitle}
        onKeyDown={addItem}
        placeholder="Введите задание"
      />
      <button onClick={addItem}>Добавить</button>
      <button onClick={removeAll}>Удалить все</button>
    </div>
  );
}
