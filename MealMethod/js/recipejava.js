
// Variable to keep track of the meal counter
let mealCounter = 0;
// Arrays to store the undo and redo actions
var undoStack = [];
var redoStack = [];

// Object to store selected meals with meal types as keys
let selectedMeals = {
    'Breakfast': null,
    'Lunch': null,
    'Dinner': null
};

// Links the API
const appId = 'a6db65af';
const appKey = '7fd93bc864f525bed3a4cb9c18c9e31e';


// Function to shrink header when user scrolls
window.addEventListener("scroll", function () {
    var header = document.querySelector("header");
    header.classList.toggle("sticky", window.scrollY > 0);

    var logoImg = document.querySelector(".logo img");

    // Calculate the scale factor based on the scroll position
    var scaleFactor = 1 - window.scrollY / 1000;

    scaleFactor = Math.max(0.9, scaleFactor);

    // Apply the scale transformation to the logo image
    logoImg.style.transform = "scale(" + scaleFactor + ")";
});


// ---------------------------- RECIPE PAGE / API  ---------------------------

// Function to search recipes using Edamam API-
function searchRecipes() {
     // Get values from input fields
    const query = document.getElementById('query').value;
    const mealType = document.getElementById('meal-type').value;
    const dietType = document.getElementById('diet-type').value;
    let url = `https://api.edamam.com/search?q=${query}&app_id=${appId}&app_key=${appKey}`;

    // Add meal type to the URL if selected
    if (mealType) {
        url += `&mealType=${mealType}`;
    }

    // Add health type to the URL if selected
    if (dietType) {
        url += `&health=${dietType}`;
    }

// Fetch recipes from API
    fetch(url)
        .then(response => response.json())
        .then(data => {
          //Display fetched recipes
            displayRecipes(data.hits);
        })
        .catch(error => console.error('Error fetching recipes:', error));
}


// Function to display recipes on the webpage
function displayRecipes(recipes) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';

 // Loop through each recipe and create a card for it
    recipes.forEach(recipe => {
        const recipeDiv = document.createElement('div');
        recipeDiv.classList.add('recipe-card');
        recipeDiv.innerHTML = `
            <img src="${recipe.recipe.image}" alt="${recipe.recipe.label}">
            <div class="recipe-card-content">
                <h2>${recipe.recipe.label}</h2>
                <p>Calories: ${recipe.recipe.calories.toFixed(2)}</p>
                <p>Servings: ${recipe.recipe.yield}</p>
                <p><a href="${recipe.recipe.url}" target="_blank">View Recipe</a></p>
            </div>
        `;
        resultsDiv.appendChild(recipeDiv);
    });
}
