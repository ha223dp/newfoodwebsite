let searchBtn = document.getElementById('search-btn');
let mealList = document.getElementById('meal');
let mealDetailsContent = document.querySelector('.the-meal-details-contents');
let recipeCloseBtn = document.getElementById('recipe-close-btn');

// event listeners
searchBtn.addEventListener('click', getTheMeals);
mealList.addEventListener('click', getTheMealRecipe);
recipeCloseBtn.addEventListener('click', () => {
    mealDetailsContent.parentElement.classList.remove('showRecipe');
});

async function getTheMeals() {
    let searchInputTxt = document.getElementById('search-input').value.trim();
    try {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputTxt}`);
      const data = await response.json();
  
      let html = "";
      if (data.meals) {
        data.meals.forEach(meal => {
          html += `
            <div class="meal-item" data-id="${meal.idMeal}">
              <div class="meal-img">
                <img src="${meal.strMealThumb}" alt="food">
              </div>
              <div class="meal-name">
                <h3>${meal.strMeal}</h3>
                <a href="#" class="recipe-btn">Get Recipe</a>
              </div>
            </div>
          `;
        });
        mealList.classList.remove('notFound');
      } else {
        html = "Sorry, we didn't find any meal!";
        mealList.classList.add('notFound');
      }
  
      mealList.innerHTML = html;
    } catch (error) {
      console.error(error);
    }
  }

// get recipe of the meal
async function getTheMealRecipe(e) {
    e.preventDefault();
    if (e.target.classList.contains('recipe-btn')) {
      let mealItem = e.target.parentElement.parentElement;
      try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`);
        const data = await response.json();
        mealRecipeModal(data.meals);
      } catch (error) {
        console.error(error);
      }
    }
  }

// create a model for the template
function mealRecipeModal(meal){
    console.log(meal);
    meal = meal[0];
    let html = `
        <h2 class = "recipe-title">${meal.strMeal}</h2>
        <p class = "recipe-category">${meal.strCategory}</p>
        <aside class = "recipe-instruct">
            <h3>Instructions:</h3>
            <p>${meal.strInstructions}</p>
        </aside>
        <aside class = "recipe-meal-img">
            <img src = "${meal.strMealThumb}" alt = "">
        </aside>
        <aside class = "recipe-link">
            <a href = "${meal.strYoutube}" target = "_blank">Watch Video</a>
        </aside>
    `;
    mealDetailsContent.innerHTML = html;
    mealDetailsContent.parentElement.classList.add('showRecipe');
}

