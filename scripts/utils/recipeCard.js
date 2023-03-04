//

export function renderRecipeCard(recipe) {

    const ingredients = recipe.ingredients;

    let ingredientsList = "";
    
    ingredients.forEach(ingredient => {        
        
        if (!ingredient.quantity && !ingredient.unit) {
            ingredientsList += `<li><span class="ingredient">${ingredient.ingredient}</span><li>`;
        }
        else if (!ingredient.unit) {
            ingredientsList += `<li><span class="ingredient">${ingredient.ingredient} : </span>${ingredient.quantity}<li>`;
        }
        else if (ingredient.unit === "grammes") {
            ingredientsList += `<li><span class="ingredient">${ingredient.ingredient} : </span>${ingredient.quantity}g<li>`;
        }
        else if (ingredient.unit === "ml" || ingredient.unit === "cl" || ingredient.unit === "kg") {
            ingredientsList += `<li><span class="ingredient">${ingredient.ingredient} : </span>${ingredient.quantity}${ingredient.unit}<li>`;
        }
        else {
            ingredientsList += `<li><span class="ingredient">${ingredient.ingredient} : </span>${ingredient.quantity} ${ingredient.unit}<li>`;
        }

    });

    const ingredientsView = `<ul>${ingredientsList}</ul>`;
    
    return `
        <article class="recipe" id="${recipe.id}">
            <div class="recipe-img"></div>
            <div class="recipe-text">
                <h1><span class="title">${recipe.name}</span><span class="time"><i class="far fa-clock"></i>&nbsp;&nbsp;${recipe.time} min</span></h1>
                <div class="ingredients-description-wrapper">
                    <div class="ingredients">${ingredientsView}</div>
                    <div class="description">${recipe.description}</div>
                </div>
            </div>
        </article>
        `
}