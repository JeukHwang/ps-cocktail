// app.get('/cocktail/:name', async (req:express.Request, res:express.Response) => {
//     const name = req.params.name;
//     console.log(name);
//     const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`);
//     const data:any = await response.json();
//     const json = {
//         "ingredient": (data.ingredients || []).map((ingredient:any)=>readableIngredient(ingredient)),
//         "drinks":     (data.drinks || []).map((drink:any)=>readableDrink(drink))
//     };
//     console.log(json);
//     res.send(json)
// })