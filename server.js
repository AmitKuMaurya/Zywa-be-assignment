import express from "express";
import dotenv from "dotenv";
import { DB_connection } from "./config/db.connection.js";
import { UserModel } from "./model/csv.model.js";
import multer from "multer";
import csv from "csvtojson";
dotenv.config();
const app = express();
const PORT = 7878;

app.use(express.json());
app.use(express.urlencoded({extended : true}));

// Multer storage configuration
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.get("/",async(req,res)=>{
    const d = await UserModel.find({});
    res.status(201).send({d : d});
});

app.get("/get_card_status/:id",async (req,res)=>{
    const {id} = req.params;
    console.log('id: ', id);
    const user = await UserModel.findOne({ id : id});
    console.log('user: ', user);
    if(user.comment){
        res.status(201).send({msg: 'Status Fetched Successfully !',status : user.comment});
    } else {
        res.status(201).send({msg : 'user status does not exist'})
    }

});

app.post('/insert_csv_cards',upload.array('files'),async(req,res,next) => {

    try {
        const files = req.files;
        // console.log('files: ', files);
        if(!files || files.length === 0) {
            return res.status(400).json({ error : 'No files upload.'});
        }

        const promises = files.map(async(file)=>{
            const jsonObj = await csv().fromString(file.buffer.toString());

            const userObj = jsonObj.map(item => ({
                    id : item['ID'],
                    userId : item['Card ID'],
                    contactNumber : item['User contact'],
                    comment : item['Comment']
                }));

                await UserModel.insertMany(userObj);
        });

        await Promise.all(promises);
        res.status(200).json({
          msg: 'Successfully Uploaded!'
        });
        
    } catch(err){
        console.log({err:err});
        res.status(500).json({
          msg: 'Failure',
          err : err.message
        });
    }
})

app.listen(PORT,async()=>{
    await DB_connection();
    console.log(`Listening on ${PORT}`);
})