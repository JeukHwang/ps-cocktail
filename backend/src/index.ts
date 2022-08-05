import cors from "cors";
// import "dotenv/config";
import express from "express";

const app: express.Application = express();
app.use(cors());

app.get('/', (req:express.Request, res:express.Response) => {
  res.send('Hello World!')
})

const port = 3000;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
