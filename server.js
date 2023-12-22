import express from "express";
import dotenv from "dotenv";
import { DB_connection } from "./config/db.connection.js";
dotenv.config();
const app = express();
const PORT = 7878;

app.use(express.json());
app.use(express.urlencoded({extended : true}));


app.get("/",(req,res)=>{
    res.status(201).send("<h1>You have landed !</h1>");
});

app.post('/add-',(req,res)=>{

})

app.listen(PORT,async()=>{
    await DB_connection();
    console.log(`Listening on ${PORT}`);
})