const Food = [
  {
    id: 1,
    title: "Chicken Masala",
    ingredients: "Chicken, Tumeric, Yoghurt, Onion, Tamatoes",
    tags: "Dinner",
    image: "public/images/chicken-masala.jpg",
  },
  {
    id: 2,
    title: "Fish Curry",
    ingredients: "Fish, Tumeric, Onion, Tamatoes",
    tags: "Lunch",
    image: "public/images/fish-curry.jpg",
  },
  {
    id: 3,
    title: "Omlette",
    ingredients: "Egg, Coriander",
    tags: "Breakfast",
    image: "public/images/omlette.jpg",
  },
  {
    id: 4,
    title: "Masala Dosa",
    ingredients: "Dosa, Mashed Potato, Chutney",
    tags: "Brunch",
    image: "public/images/masala-dosa.jpg",
  },
];

import { useState } from "react";

function App() {
  const [itemList, setItemList] = useState(Food);

  function handleSearch(e) {
    console.log(e);
    setItemList((Food) =>
      Food.filter((food) => {
        return food.title.toLowerCase().includes(e.toLowerCase());
      }),
    );
  }

  return (
    <div className="App">
      <Navigation />
      <SearchBar handleSearch={handleSearch} />
      <FilterOptions setItemList={setItemList} />
      <Menu itemList={itemList} />
    </div>
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

function Menu({ itemList }) {
  return (
    <div className="Menu-Container">
      <div className="Menu">
        {itemList.map((fooditem) => (
          <Item
            key={fooditem.id}
            desc={fooditem.ingredients}
            image={fooditem.image}
            name={fooditem.title}
          />
        ))}
      </div>
    </div>
  );
}

function Item({ desc, image, name }) {
  return (
    <div className="item">
      <h3>{name}</h3>
      <img className="item-image" src={image} alt={name} />
      <p>{desc}</p>
    </div>
  );
}
