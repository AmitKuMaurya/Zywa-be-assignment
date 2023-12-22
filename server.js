const express = require("express");
const app = express();
const PORT = 7878;

app.use(express.json());
app.use(express.urlencoded({extended : true}));


app.get("/",(req,res)=>{
    res.status(201).send("<h1>You have landed!</h1>");
});

app.listen(PORT,()=>{
    console.log(`Listtening on ${PORT}`);
})