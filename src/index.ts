import express from 'express';
import mongoose from 'mongoose';
import userRouter from "./routes/userRoute.js";


const app = express();
const port =3000;

mongoose.connect('mongodb://localhost:27017/ecommerce')
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(port, () => {
      console.log(`Server is running at http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

app.use(express.json());
app.use('/user', userRouter);


app.get('/', (req, res) => {
  res.send('Welcome to the E-commerce API');
});