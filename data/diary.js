const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Define data schema
const diarySchema = new Schema(
  {
    id: Number,
    title: String,
    info: String,
    image: {
        id: String,
        name: String,
        type: String, 
        img: {       
        data: Buffer,
        imgType: String,
        },
    },
    date: String,
    time: String,
    gps: { lat: Number, lng: Number },
    location: { address: String, city: String, state: String, country: String },
  },
  { timestamps: true },
  { strict: false }
);

//Not quite sure what the purpose of this code is yet...remove if unnecessary
// diarySchema.virtual('imagePath').get(function(){
//   const stringArray = [];
//   if (this.images != null) {
//     this.images.forEach(iterate);
//       function iterate (value, index, array){
//       stringArray[index] = `data:${this.imageTypes[index]};charset=utf-8;base64,${this.images[index].toString('base64')}`
//       console.dir(`schema ${stringArray[index]}`)
//       }

//       return stringArray;
//   }
// })

//Export the Mongoose Model
module.exports = mongoose.model("DiarySchema", diarySchema);
