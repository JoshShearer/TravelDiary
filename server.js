const path = require("path");
if (process.env.NODE_ENV !== 'production'){
    require('dotenv').config({ path: path.resolve(__dirname, '.env') });
}

const { MongoClient, ServerApiVersion } = require('mongodb');
const express = require('express')
const router = express.Router()
const mongoose = require ('mongoose');
const bodyParser  = require ('body-parser');
const cors = require('cors');
const logger = require("morgan");
const DiarySchema = require('./data/diary')
const imageMimeTypes = ['image/jpeg', 'image/png', 'images/gif']

//initialize http server
const app = express();
app.use(cors());

console.log("NODE_ENV ", process.env.NODE_ENV)
const API_PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;
console.log("Active Port ", API_PORT);
console.log("MongoURI ", MONGODB_URI);
//Set up the mongoDB connection
mongoose.connect(process.env.MONGODB_URI, { 
  useNewUrlParser: true,
  useUnifiedTopology: true
});

let db = mongoose.connection;

db.once('open',() => {console.log('connected to the database'); })

//checks if the connection with the database is successful
db.on('error', console.error.bind(console, 'MongoDB connection error'));

app.use((req, res, next) => {
  console.log("new Middleware ", `${req.method} - ${req.url}`);
  next()
})

// (optional) only made for logging and
// bodyParser, parses the request body to be a readable json format
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger("dev"));


// All entries Route
router.get("/", (req, res) => {
  res.json({ message: "HELLOW WORLDUUHHHH" });
});

// app.use("/getData")
router.get("/getData", (req, res) => {
  DiarySchema.find((err, data) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  });
});

// Create DairySchema Route
// app.use("/putData")
router.post('/putData', async (req, res) => {
  const diarySchema = new DiarySchema({
    id: req.body.id,
    title: req.body.title,
    info: req.body.info,
    image: req.body.image,
    date: req.body.date,
    time: req.body.time,
    gps: req.body.gps,
    location: req.body.location
  })
  // saveImage (diarySchema, req.body.images)

  try {
    const newEntry = await diarySchema.save()
    // res.redirect(`entries/${newEntry.id}`)
    res.redirect('/')
  } catch {
    renderNewEntry(res, diarySchema, true)
  }
})

//Delete Entire Entry
// app.use("deleteData")
router.delete('/deleteData', (req, res) => {
      const id = req.body.id;
      
      DiarySchema.findByIdAndDelete(id, err => {
          if (err) return res.send(err);
          return res.json({ success: true });
      });
  });

//Update Entry
// app.use('/updateData')
router.post('/updateData', async (req, res) => {
  const id = req.body.id;
  
  const update = req.body.update;

  DiarySchema.findByIdAndUpdate(id, update, {new:true}, err => {
      if (err) return res.send(err);
      return res.json({ success: true });
  });
});

async function renderNewEntry(res, diarySchema, hasError = false) {
  try {
    const params = {
     DiarySchema: diarySchema
    }
    if (hasError) params.errorMessage = 'Error Creating diarySchema'
    res.render('/putData', params)
  } catch {
    res.redirect('/')
  }
}

// function saveImage (DiarySchema, imagesEncoded) {
//   if (imagesEncoded == null) return

//   imagesEncoded.map((imageEncoded, index) => {
//     const image = JSON.parse(imageEncoded);
//     if (image != null && imageMimeTypes.includes(image.type)) {
//       DiarySchema.image[index] = new Buffer.from(image.data, 'base64');
//       DiarySchema.imageType[index] = image.type;
//   }})}


app.use('/api', router);

if(process.env.NODE_ENV === 'production'){
  //set the static folder
  app.use(express.static(path.join(__dirname, '/client/build')));
  app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
    console.log("Dir Name " , __dirname);
  });
}else{
  app.get("/", (req, res) => {
    res.send("api running");
  })
}

//launch our backend into a port
app.listen(API_PORT, (err) => {
  if(err) return console.log("Listen Error ", err);
  
  console.log(`LISTENING ON PORT ${API_PORT}`)});

module.exports = router








