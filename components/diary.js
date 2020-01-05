import mongoose, { Schema } from 'mongoose';


//Define data schema
var dataSchema = new Schema({
    title: String,
    img: String,
    info: String,
    date: String,
    time: String,
    gps: String,
})

//Export the Mongoose Model
export default mongoose.Model('diary', dataSchema)