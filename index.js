const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require('dotenv');
const cors = require('cors');
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const movieRoute = require("./routes/movies");
const listRoute = require("./routes/lists");
dotenv.config();

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'https://mern-netflix-frontend.onrender.com/');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
  });
mongoose
        .connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // useCreateIndex: true,
        })
        .then(()=> console.log("DB Connection Successful"))
        .catch((err)=> console.log(err));
        app.use(express.json());
        app.use("/api/auth", authRoute);
        app.use("/api/users", userRoute);
        app.use("/api/movies", movieRoute);
        app.use("/api/lists", listRoute);
        app.use(cors({
            origin: 'https://mern-netflix-frontend.onrender.com'
          }));
    
app.listen(process.env.PORT || 8800 ,()=>{
    console.log("Backend server is running!");
});