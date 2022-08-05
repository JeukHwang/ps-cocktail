// import axios from "axios-esm";
import fetch from "node-fetch";
import fs from "fs";

// 재료
const ingredientsList = [];
for (let i = 1; i < 616; i++) {
    console.log("id : ", i);
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?iid=${i}`);
    const data = await response.json();

    if (data.ingredients != null) { 
        ingredientsList.push(data.ingredients[0]);
    }
}

fs.writeFileSync("./ingredients.json", JSON.stringify(ingredientsList));
console.log(ingredientsList.length);


// 칵테일
const searchKey = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '1', '2', '3', '4', '5', '6', '7', '8', '9']
// const searchKey = ['a', 'b']
const cocktailList = [];
for (let i = 0; i < searchKey.length; i++) {
    console.log("key : ", searchKey[i]);
    const response = await fetch(`http://www.thecocktaildb.com/api/json/v1/1/search.php?f=${searchKey[i]}`);
    const data = await response.json();

    if (data.drinks != null) {
        data.drinks.forEach(drink => cocktailList.push(drink));
    }
}

fs.writeFileSync("./cocktail.json", JSON.stringify(cocktailList));
console.log("cocktailList : ", cocktailList.length);
