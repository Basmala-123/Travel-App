import { useState } from "react";
import "./index.css";
function App() {
  const [items, setItems] = useState([]);
  function handleAddItems(item) {
    setItems((items) => [...items, item]);
  }
  function handleDeleteItem(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }
  function handleResetItems() {
    setItems([]);
  }
  function handleToggleItem(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }
  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList
        items={items}
        onDeleteItems={handleDeleteItem}
        onToggleItem={handleToggleItem}
        onClearItems={handleResetItems}
      />
      <Stats items={items} />
    </div>
  );
}

function Logo() {
  return <h1>Far away 💼</h1>;
}
function Form({ onAddItems }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(event) {
    event.preventDefault();
    if (!description) return;
    const newItem = {
      id: Date.now(),
      quantity,
      description,
      packed: false,
    };
    onAddItems(newItem);
    setDescription("");
    setQuantity(1);
  }
  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>what do you need for your trip ?</h3>
      <select value={quantity} onChange={(e) => setQuantity(+e.target.value)}>
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button>Add</button>
    </form>
  );
}
function PackingList({ items, onDeleteItems, onToggleItem, onClearItems }) {
  const [sortedBy, setSorted] = useState("input");
  let sortedItem;
  if (sortedBy === "input") sortedItem = items;
  if (sortedBy === "description")
    sortedItem = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));
  if (sortedBy === "packed")
    sortedItem = items
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));

  return (
    <div className="list">
      <ul>
        {sortedItem.map((item) => (
          <Item
            item={item}
            key={item.id}
            deleteItem={onDeleteItems}
            toggleItem={onToggleItem}
          />
        ))}
      </ul>

      <div className="actions">
        <select value={sortedBy} onChange={(e) => setSorted(e.target.value)}>
          <option value="input">Sort by input</option>
          <option value="description">Sort by description</option>
          <option value="packed">Sort by packed</option>
        </select>
        <button onClick={onClearItems}>Clear items</button>
      </div>
    </div>
  );
}

function Item({ item, deleteItem, toggleItem }) {
  return (
    <li>
      <input
        type="checkbox"
        value={item.packed}
        onChange={() => toggleItem(item.id)}
      />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        <span>{item.quantity}</span>
        {item.description}
      </span>
      <button onClick={() => deleteItem(item.id)}>❌</button>
    </li>
  );
}
function Stats({ items }) {
  if (!items.length) {
    return <footer className="stats"> you need to add item 🤦‍♂️ </footer>;
  }
  let numOfItems = items.length;
  let packedItems = items.filter((item) => item.packed).length;
  let percentage = Math.round((packedItems / numOfItems) * 100);
  return (
    <footer className="stats">
      {percentage === 100
        ? "you got everything you ready to go ✈"
        : `
      you have ${numOfItems} items in your bagage and you already packed ${packedItems} ${percentage}%
      `}
    </footer>
  );
}

export default App;
