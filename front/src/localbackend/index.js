import cocktails_ from "./cocktail.json";
import ingredients_ from "./ingredients.json";

export function splitSentences(str) {
    return (str || "").replace(/([.?!])\s*(?=[A-Z])/g, "$1|").split("|");
}

export function Cocktail(data) {
    const ingredients = [...Array(15).keys()]
        .map((i) => i + 1)
        .map((i) => [data[`strIngredient${i}`], data[`strMeasure${i}`]?.trim()])
        .filter(([ingName, measure]) => {
            return ingName !== null && measure !== null;
        });
    return {
        id: data.idDrink,
        name: data.strDrink,
        isAlcohol: data.strAlcoholic === "Alcoholic",
        description: splitSentences(data.strInstructions),
        abv: "Unknown",
        category: data.strCategory,
        photo: data.strDrinkThumb,
        glass: data.strGlass,
        ingredients: ingredients,
        mode: "cock"
    };
}

const cocktails = cocktails_.map((cocktail) => Cocktail(cocktail));

export function Ingredient(data) {
    const drinks = cocktails
        .filter((cocktail) => {
            const ingsName = cocktail.ingredients.map(
                ([ingName, measure]) => ingName
            );
            return ingsName.includes(data.strIngredient);
        })
        .map((cocktail) => cocktail.name);
    return {
        id: data.idIngredient,
        name: data.strIngredient,
        isAlcohol: data.strAlcohol === "Yes",
        description: splitSentences(data.strDescription),
        abv: data.strABV || "Unknown",
        type: data.strType,
        drinks: drinks,
        mode: "ing"
    };
}

const ingredients = ingredients_.map((ingredient) => Ingredient(ingredient));

export function search(name) {
    const filteredCocktails = cocktails
        .filter((cocktail) => cocktail.name === name);
    const filteredIngredients = ingredients
        .filter((ing) => ing.name === name);
    const data = [...filteredIngredients, ...filteredCocktails][0];
    return data;
}

export function autoComplete(name) {
    const filteredCocktails = cocktails
        .filter(
            (cocktail) => cocktail.name === name || cocktail.name.includes(name)
        );
    const filteredIngredients = ingredients
        .filter((ing) => ing.name.includes(name));
    const data = [
        ...filteredCocktails.map((cocktail) => ["Cocktail", cocktail.name]),
        ...filteredIngredients.map((ing) => ["Ingredient", ing.name]),
    ];
    return data;
}

export function combination(names) {
    const filteredIngs = ingredients.filter((ing) => names.includes(ing.name));
    const allDrinks = new Set();
    filteredIngs.forEach((ing) => {
        ing.drinks.forEach((drink) => {
            allDrinks.add(drink);
        });
    });
    const possibleDrinks = [];
    allDrinks.forEach((drink) => {
        const canBeMade = filteredIngs.every((ing) => {
            return ing.drinks.includes(drink);
        });
        if (canBeMade) {
            possibleDrinks.push(drink);
        }
    });
    return possibleDrinks;
}

// console.log(Ingredient(ingredients[0]));
// console.log(Cocktail(cocktails[0]));
// console.log(search("wergfdfkogroedfg"));