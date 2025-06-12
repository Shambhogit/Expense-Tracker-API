import mongoose from "mongoose"

export default function connectToDatabase(){
    mongoose.connect(process.env.DB_URL).then(()=>{
        console.log('Connected To DB');
    }).catch((err)=>{
        console.log('Error in DB Connection : ', err);
    })
}
