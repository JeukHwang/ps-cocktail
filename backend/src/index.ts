import cors from "cors";
import express from "express";
import fetch from "node-fetch";
import { readableDrink, readableIngredient } from "./util";

const app: express.Application = express();
app.use(cors());


app.get('/search/:name', async (req:express.Request, res:express.Response) => {
    const name = req.params.name;
    console.log("search", name);
    const drinkResponse = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`);
    const drinkData:any = await drinkResponse.json();
    const integredientResponse = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?i=${name}`);
    const integredientData:any = await integredientResponse.json();
    console.log({ing:integredientData.ingredients});
    const data = {
        "ingredient": integredientData.ingredients !== null ? (await Promise.all(integredientData.ingredients.map((ingredient:any)=> readableIngredient(ingredient)))) : [],
        "drinks": drinkData.drinks !== null ? drinkData.drinks.map((drink:any)=>readableDrink(drink)) : []
    };
    console.log(data);
    res.json(data);
})

app.get('/autocomplete/:name', async (req:express.Request, res:express.Response) => {
    const name = req.params.name;
    console.log("autocomplete", name);
    const drinkResponse = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`);
    const drinkData:any = await drinkResponse.json();
    const integredientResponse = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?i=${name}`);
    const integredientData:any = await integredientResponse.json();
    const data = {
        "ingredient": integredientData.ingredients !== null ? integredientData.ingredients.map((ingredient:any)=>ingredient.strIngredient) : [],
        "drinks":     drinkData.drinks !== null ? drinkData.drinks.map((drink:any)=>drink.strDrink) : []
    };
    res.json(data)
})

app.get('/combination/:names', async (req:express.Request, res:express.Response) => {
    const ingredients = (req.params.names as string).split(",");
    console.log("combination", ingredients);
    const drinksForEachIngredient = await Promise.all(ingredients.map( async (ingredient):Promise<string[]> => {
        const drinkResponse = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`);
        const drinkData:any = await drinkResponse.json();
        return drinkData.drinks.map((drink:any) => drink.strDrink);
    }));
    const allDrinks = new Set<string>();
    drinksForEachIngredient.forEach(async (drinks)=>{
        drinks.forEach(drink => {
            allDrinks.add(drink);
        });
    })
    const possibleDrinks:string[] = [];
    allDrinks.forEach((drink) => {
        const canBeMade  = drinksForEachIngredient.every(async (drinks) => { 
            return drinks.includes(drink)  
        })
        if (canBeMade) { possibleDrinks.push(drink); }
    })
    res.json(possibleDrinks)
})

const port = 5500;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

// http://localhost:5500/search/vodka
// http://localhost:5500/search/vodvovovo

// http://localhost:5500/search/margarita
// http://localhost:5500/autocomplete/au