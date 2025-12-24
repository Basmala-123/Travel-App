export default function Stats({ items }) {
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