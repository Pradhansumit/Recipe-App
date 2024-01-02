const itemList = [
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
  return (
    <div className="App">
      <SearchBar />
      <FilterOptions />
      <Menu />
    </div>
  );
}

export default App;

function SearchBar() {
  const [recipeValue, setRecipeValue] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
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
        <input type="submit" />
      </form>
    </div>
  );
}

function FilterOptions() {
  return (
    <div className="filter-options">
      <button type="submit" className="filter-btn">
        BreakFast
      </button>
      <button type="submit" className="filter-btn">
        Brunch
      </button>
      <button type="submit" className="filter-btn">
        Lunch
      </button>
      <button type="submit" className="filter-btn">
        Dinner
      </button>
    </div>
  );
}

function Menu() {
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
