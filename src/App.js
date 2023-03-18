import './App.css';
import {useState , useEffect} from 'react';
import Recipe from './Recipe';
import style from './recipe.module.css';
function App() {

      const APP_ID = 'b75687c5';
      const APP_KEY = '467b4865960e9205f3c80599652de952';

      const[search , setSearch]=useState("");
      const[recipes , setRecipes]=useState([]);
      const[query , setQuery]=useState('paneer');

  useEffect(()=>{
    getRecipes();
  },[query]);
//////////////////////////////////////////
  const getRecipes=async() =>{
    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
    const data = await response.json();
    setRecipes(data.hits);
    console.log(data.hits);

  };
  /////////////////////////////////////////
  const update = (e)=>{
      setSearch(e.target.value);
  };
////////////////////////////////////////////
  const getSearch = (e)=>{
      e.preventDefault();
      setQuery(search);
      setSearch("");
  };
  return (
    <div className="App">
      <form onSubmit={getSearch} className='form'>
        <input type="text" className='search-bar' value={search} onChange={update} placeholder="Search Recipies"/>
        <button type="submit" className={style.btn}> Search </button>
      </form>
      <div className='recipies'>
         {recipes.map(recipe =>(
          <Recipe 
          key={recipe.recipe.label}
          title={recipe.recipe.label}
          calories={recipe.recipe.calories}
          image={recipe.recipe.image}
          ingredients={recipe.recipe.ingredients}/>
      ))}
      </div>
    </div>
  );
}

export default App;
