import express from 'express';
import cors from 'cors';
import clientRouter from "./routers/clientRouter.js"

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api', clientRouter)


app.listen(5000, () => {
  console.log('server is listening on port 5000...')
})
