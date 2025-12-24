import { useState } from "react";
import Item from "./Item";

export default function PackingList({ items, onDeleteItems, onToggleItem, onClearItems }) {
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