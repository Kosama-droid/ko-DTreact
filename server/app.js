//imports
import dotenv from "dotenv";

//installed modules
import express from "express";
//import mongoose from "mongoose";

//mongoose.set('strictQuery', false);

dotenv.config();

//local modules
const PORT = process.env.PORT || 3001;

const app = express();

//has to be before the PORT connection
app.get("/api", (req, res) => {
  res.json({ message: "Hello from Express!" });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

// create a GET route
app.get('/express_backend', (req, res) => { 
  res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
});

export default app;