import cors from "cors";
// import "dotenv/config";
import express from "express";
import mysql from "mysql";

const connection = mysql.createConnection({
  host     : '34.64.69.222',
  user     : 'root',
  password : '0701',
  database : 'cocktail'
});

connection.connect();

const app: express.Application = express();
app.use(cors());

app.get('/', (req:express.Request, res:express.Response) => {
  res.send('Hello World!')
})


app.post("/batch/database/setting", (req:express.Request, res:express.Response) => {
  
  connection.query()

  
  res.send('database setting finish')
})

const port = 3000;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
