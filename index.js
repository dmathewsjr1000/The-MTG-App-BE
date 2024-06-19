import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import mongoose from 'mongoose'
import magicRouter from './Routes/planeswalkers.js'
import error from './Utilities/error.js'
import cors from 'cors'

dotenv.config()
mongoose.connect(process.env.ATLAS_URI)

const app = express()
const PORT = process.env.PORT || 4000

app.use(cors())
app.use(morgan('dev'))
app.use(express.json());
app.use('/user', magicRouter);

app.get('/', (req, res) => {
    res.send('Welcome to my API')
})

app.use((req, res, next) => {
    next(error(404, "Resource Not Found"));
  });

  app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}.`);
  });

  