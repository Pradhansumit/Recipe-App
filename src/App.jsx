import { useState } from "react";
import { Food } from "./Food";

function App() {
  const [itemList, setItemList] = useState(Food);
  const [modalVisible, setModalVisible] = useState(null);
  const [selectedItem, setSelectedItem] = useState([]);

  function handleSearch(e) {
    console.log(e);
    setItemList((Food) =>
      Food.filter((food) => {
        return food.title.toLowerCase().includes(e.toLowerCase());
      }),
    );
  }

  function setModalOn(id) {
    setModalVisible(1);
    setSelectedItem(itemList.filter((item) => item.id === id));
    console.log(selectedItem);
  }
  function setModalOff() {
    setModalVisible(null);
  }

  return (
    <>
      <div className={`App ${modalVisible ? "blur" : ""}`}>
        <Navigation />
        <SearchBar handleSearch={handleSearch} />
        <FilterOptions setItemList={setItemList} />
        <Menu itemList={itemList} setModalOn={setModalOn} />
      </div>
      <div>
        <Modal
          setModalOff={setModalOff}
          modalVisible={modalVisible}
          selectedItem={selectedItem}
        />
      </div>
    </>
  );
}

export default App;

function Navigation() {
  return (
    <nav>
      <img className="nav-logo" src="images/recipe.png" alt="Logo" />
      <h1>Recipe Hooks</h1>
    </nav>
  );
}

function SearchBar({ handleSearch }) {
  const [recipeValue, setRecipeValue] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    handleSearch(recipeValue);
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="search"
          placeholder="Find recipe"
          value={recipeValue}
          onChange={(e) => setRecipeValue(e.target.value)}
        />
        <input className="submit-btn" type="submit" />
      </form>
    </div>
  );
}

function FilterOptions({ setItemList }) {
  function handleClick(name) {
    if (name) {
      setItemList((items) => items.filter((item) => item.tags.includes(name)));
    }
  }
  return (
    <div className="filter-options">
      <button
        type="submit"
        className="filter-btn"
        onClick={() => handleClick("Breakfast")}
      >
        BreakFast
      </button>
      <button
        type="submit"
        className="filter-btn"
        onClick={() => handleClick("Brunch")}
      >
        Brunch
      </button>
      <button
        type="submit"
        className="filter-btn"
        onClick={() => handleClick("Lunch")}
      >
        Lunch
      </button>
      <button
        className="filter-btn"
        type="submit"
        onClick={() => handleClick("Dinner")}
      >
        Dinner
      </button>
      <button
        type="submit"
        className="filter-btn"
        onClick={() => {
          setItemList(Food);
        }}
      >
        Clear
      </button>
    </div>
  );
}

function Menu({ itemList, setModalOn }) {
  return (
    <div className="Menu-Container">
      <div className="Menu">
        {itemList.map((fooditem) => (
          <Item
            key={fooditem.id}
            id={fooditem.id}
            desc={fooditem.ingredients}
            image={fooditem.image}
            name={fooditem.title}
            setModalOn={setModalOn}
          />
        ))}
      </div>
    </div>
  );
}

function Item({ id, desc, image, name, setModalOn }) {
  function handleClick() {
    setModalOn(id);
  }

  return (
    <div className="item">
      <h3>{name}</h3>
      <img className="item-image" src={image} alt={name} />
      <p>{desc}</p>
      <button onClick={handleClick} className="know-more">
        Know More
      </button>
    </div>
  );
}

function Modal({ setModalOff, modalVisible, selectedItem }) {
  function handleClick() {
    setModalOff();
  }
  return (
    modalVisible && (
      <div className="Modal">
        <div className="Modal-body">
          <button onClick={handleClick} className="modal-close">
            &times;
          </button>
          <h2>{selectedItem[0].title}'s Recipe</h2>
          <ul>
            <h4>Ingredients:</h4>
            <p>{selectedItem[0].ingredients}</p>
            <h4>Description:</h4>
            <p>{selectedItem[0].description}</p>
          </ul>
        </div>
      </div>
    )
  );
}
