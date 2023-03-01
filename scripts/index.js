// imports

import { getAPI } from "./api/api.js";


//  url API

const api_url = "datas/recipes.json";



// init() s'execute au chargement de la page :
//   1. récupération data API
//   2. création des array ingredients + appliances + ustensils 
//   3. affichage photographes

async function init() {

	const recipes = await getAPI(api_url);
	console.log(recipes);

    
}

init();