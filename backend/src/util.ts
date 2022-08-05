type Ingredient = {
    id: number,
    name: string,
    isAlcohol: boolean,
    description: string[],
    abv: number,

    type: string,

    drinks: string[]
}

type Drink = {
    id: number,
    name: string,
    isAlcohol: boolean,
    description: string[],
    abv: number,

    category: string,
    photo: string,
    glass: string,

    ingredients: [string, string][]
}


function splitSentences(str:string):string[] {
    return (str || "").replace(/([.?!])\s*(?=[A-Z])/g, "$1|").split("|");
}

export function readableIngredient(data:any): Ingredient {
    console.log(data);
    return {
        id: parseInt(data.idIngredient, 10),
        name: data.strIngredient,
        isAlcohol: data.strAlcohol === "Yes",
        description: splitSentences(data.strDescription),
        abv: parseInt(data.strABV || "-1", 10),

        type: data.strType,
        drinks: []
    }
}
// https://www.thecocktaildb.com/api/json/v1/1/search.php?i=vodka
// https://www.thecocktaildb.com/api/json/v1/1/search.php?i=Tequila

export function readableDrink(data:any): Drink {
    const ingredients = [...Array(15).keys()]
        .map((i) => (i+1))
        .map((i):[string, string] => [data[`strIngredient${i}`], data[`strMeasure${i}`]?.trim()])
        .filter(([ingredient, measure]) => {return ingredient !== null && measure !== null});
    return {
        id: parseInt(data.idDrink, 10),
        name: data.strDrink,
        isAlcohol: data.strAlcoholic === "Alcoholic",
        description: splitSentences(data.strInstructions),
        abv: -1, 

        category: data.strCategory,
        photo: data.strDrinkThumb,
        glass: data.strGlass,
        ingredients: ingredients
    }
}

// https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita