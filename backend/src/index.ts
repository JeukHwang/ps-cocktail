// import axios from "axios-esm";
import cors from "cors";
import express from "express";
import fetch from "node-fetch";
import { readableDrink, readableIngredient } from "./util";

const app: express.Application = express();
app.use(cors());


app.get('/search/:name', async (req:express.Request, res:express.Response) => {
    const name = req.params.name;
    console.log(name);

    const drinkResponse = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`);
    const drinkData:any = await drinkResponse.json();
    const integredientResponse = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?i=${name}`);
    const integredientData:any = await integredientResponse.json();
    const data = {
        "ingredient": (integredientData.ingredients || []).map((ingredient:any)=>readableIngredient(ingredient)),
        "drinks":     (drinkData.drinks || []).map((drink:any)=>readableDrink(drink))
    };
    res.send(data)
})

app.get('/autocomplete/:name', async (req:express.Request, res:express.Response) => {
    const name = req.params.name;
    console.log(name);
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`);
    const data:any = await response.json();
    const json = {
        "ingredient": (data.ingredients || []).map((ingredient:any)=>readableIngredient(ingredient)),
        "drinks":     (data.drinks || []).map((drink:any)=>readableDrink(drink))
    };
    // const json = {
    //     "ingredient": data.ingredients,
    //     "drinks": data.drinks
    // };
    console.log(json);
    res.send(json)
})

const port = 5500;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
