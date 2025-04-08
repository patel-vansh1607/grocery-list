import React, { useState } from "react";
import "../styles/list.css";

const GroceryList = () => {
  const [groceryData, setGroceryData] = useState({
    General: [],
  });
  const [checkedItems, setCheckedItems] = useState({});
  const [newItem, setNewItem] = useState("");

  const handleCheck = (category, item) => {
    setCheckedItems((prev) => ({
      ...prev,
      [category + "-" + item]: !prev[category + "-" + item],
    }));
  };

  const handleAddItem = () => {
    if (!newItem.trim()) return;

    setGroceryData((prev) => {
      const updated = { ...prev };
      updated["General"] = [...(updated["General"] || []), newItem.trim()];
      return updated;
    });

    setNewItem("");
  };

  return (
    <div className="grocery-container">
      <h1>🛒 Grocery List</h1>

      <div className="add-section">
        <input
          type="text"
          placeholder="Add new item"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
        />
        <button onClick={handleAddItem}>Add</button>
      </div>

      {Object.entries(groceryData).map(([category, items]) => (
        <div key={category} className="category-block">
          <h2>{category}</h2>
          <ul>
            {items.map((item, i) => {
              const key = category + "-" + item + i;
              return (
                <li key={key}>
                  <input
                    type="checkbox"
                    checked={!!checkedItems[key]}
                    onChange={() => handleCheck(category, item + i)}
                  />
                  <span className={checkedItems[key] ? "checked" : ""}>{item}</span>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default GroceryList;
