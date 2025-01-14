import { useEffect, useState } from 'react';
import './App.css';
import LoaderPage from './LoaderPage';
import Nutrition from './Nutrition';
import Swal from 'sweetalert2';

function App() {
  const my_ID = "4f88523f";
  const my_key = "c1c88ced18c7ff7d1a9afbf99472d870";
  const APP_URL = 'https://api.edamam.com/api/nutrition-details';

  const [mySearch, setMySearch] = useState();
  const [myNutrition, setMyNutrition] = useState();
  const [wordSubmitted, setWordSubmitted] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchData = async(ingr) => {
    setLoading(true);

    const response = await fetch(`${APP_URL}?app_id=${my_ID}&app_key=${my_key}`, {
    method: 'POST',
    cache: 'no-cache',  
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      },
    body: JSON.stringify({ ingr: ingr })
    });

    if(response.ok) {
      setLoading(false);
      const data = await response.json();
      setMyNutrition(data);
    } else {
      setLoading(false);
      const handleAlert = () => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Check the ingredients!",
          footer: 'They should be entered like this: <br> 1 cup of milk, 2 bananas, 100 g sugar, etc..'
        });
      }
      handleAlert();
    }
  }

  const finalSearch = (e) => {
    e.preventDefault();
    setWordSubmitted(mySearch);
  }

  const myIngrSearch = (e) => {
    setMySearch(e.target.value);
  }

  useEffect(() => {
    if (wordSubmitted !=='') {
      let ingr = wordSubmitted.split(/[,,;,\n,\r]/);
      fetchData(ingr);
    }
  }, [wordSubmitted])

  return (
    <div>
      {loading && <LoaderPage />}
      <div className="App">
        <div className='header-text'>
          <h1>NUTRITION ANALYSIS</h1>
        </div>
        <form className='input-container' onSubmit={finalSearch}>
          <input className='ingredientsInput' 
                placeholder='Example: 150 g beef, 2 apples ...' 
                onChange={myIngrSearch}>
          </input>
        </form>
        <div className='btnSearch-container'>
          <button className='btnSearch' type='submit' onClick={finalSearch}>Search</button>
        </div>

        {
          myNutrition && 
          <div className='results'>
            <div className='total-container'> 
              <p className='totals'>Total calories: <br></br> {myNutrition.calories.toFixed()} kcal</p>
              <p className='totals'>Total weight: <br></br> {myNutrition.totalWeight.toFixed()} g</p>
            </div>
            <div className='nutrients-container'>
              <p className='amountPerServing'>*Amount Per Serving</p>
              {
              myNutrition && Object.values(myNutrition.totalNutrients)
              .map(({ label, quantity, unit}, index ) =>
              <Nutrition key={index}
                label={label}
                quantity={quantity}
                unit={unit} />
              )
              }
            </div>
          </div>
        }
        
      <div className="link">
        <a className="myInfo" href="https://yanaos-portfolio.glitch.me/" target="_blank" rel="noreferrer">Developed by <span className="myName">YanaOS</span></a>
        <a className="myInfo" href="https://www.edamam.com/" target="_blank" rel="noreferrer">Powered by www.edamam.com</a>
      </div>
      </div>
    </div>
  );
}

export default App;
