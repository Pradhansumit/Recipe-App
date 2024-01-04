const Food = [
  {
    id: 1,
    title: "Chicken Masala",
    ingredients: "Chicken, Tumeric, Yoghurt, Onion, Tamatoes",
    tags: "Dinner",
    image: "public/images/chicken-masala.jpg",
    description:
      "Chicken masala is a simple Indian dish made with Chicken, spices, herbs, onions and tomatoes. Serve this with rice or any flatbreads like naan, roti or paratha.",
  },
  {
    id: 2,
    title: "Fish Curry",
    ingredients: "Fish, Tumeric, Onion, Tamatoes",
    tags: "Lunch",
    image: "public/images/fish-curry.jpg",
    description:
      "Simple fish curry made in INdian style. Mildly spicy, flavorful and delicious tasting fish curry. Serve it with rice or roti.",
  },
  {
    id: 3,
    title: "Omlette",
    ingredients: "Egg, Coriander",
    tags: "Breakfast",
    image: "public/images/omlette.jpg",
    description:
      "An omelet is a dish you might order for breakfast or brunch — it's kind of like a folded pancake made of beaten eggs, sometimes with the addition of vegetables, cheese, or meat. Yum. A good omelet is a little bit fluffy, but firm enough to contain its filling",
  },
  {
    id: 4,
    title: "Masala Dosa",
    ingredients: "Dosa, Mashed Potato, Chutney",
    tags: "Brunch",
    image: "public/images/masala-dosa.jpg",
    description:
      "Dosa is a crepe made using fermented rice and lentil batter. Masala Dosa is one that is crisp, aromatic, flavorful and has a potato masala or spiced seasoned potatoes stuffed in it.",
  },
];

import { useState } from "react";

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
