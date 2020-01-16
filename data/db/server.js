// // if (process.env.NODE_ENV !== 'production'){
// //     require('dotenv').load()
// // }
// const express = require ('express');
// const mongoose = require ('mongoose');
// const cors = require('cors');
const bodyParser  = require ('body-parser');
// const DiarySchema = require ('./diary');
// const logger = require("morgan");
// const imageMimeTypes = ['image/jpeg', 'image/png', 'images/gif'];

// //initialize http server
// const app = express();
// app.use(cors());
// const API_PORT = 3001;
// const router = express.Router();

// //Set up the mongoDB connection
// const dbRoute = 'mongodb+srv://joshshear:6408*_sel@cluster0-7x2dt.mongodb.net/test?retryWrites=true&w=majority';

// mongoose.connect(dbRoute, { useNewUrlParser: true,
//                             useFindAndModify: false,
//                             useCreateIndex: true,
//                             useUnifiedTopology: true
//                             });

// let db = mongoose.connection;

// db.once('open',() => {console.log('connected to the database'); })

// //checks if the connection with the database is successful
// db.on('error', console.error.bind(console, 'MongoDB connection error'));

// // (optional) only made for logging and
// // bodyParser, parses the request body to be a readable json format
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
// app.use(logger("dev"));
// // app.set('view engine', 'ejs');

// //this is our get method
// //this method fetches all available data in our database
// router.get('/getData', (reg, res) =>{
//     DiarySchema.find((err, data) =>{
//         if (err) return res.json({ success: false, error:err });
//         return res.json({ success:true, data:data });
//     });
// });

// //this is the update method
// //This method overwrites existing data in our database
// router.post('/updateData', (req, res) => {
//     const {id, update } = req.body;
//     DiarySchema.findByIdAndUpdate(id, update, (err) => {
//         if (err) return res.json({ success: false, error: err });
//         return res.json({ success: true });
//     });
// });

// //This will be the delete method
// //This method wil remove existing data in the DB
// router.delete('/deleteData', (req, res) => {
//     const { id } = req.body;
//     DiarySchema.findByIdAndRemove(id, err => {
//         if (err) return res.send(err);
//         return res.json({ success: true });
//     });
// });

// //This is our create method
// //This method adds new data in our database
// router.post('/putData', async (req, res) => {
//     let data = new DiarySchema();
//     const {id, title, info, image, imageType, date, time, gps} = req.body;

//     if ((!id && id !== 0) || !info || !title){
//         return res.json({
//             success: false,
//             error: 'INVALID INPUTS',
//         });
//     }
    
//     data.id = id;
//     data.title = title;
//     data.info = info;
//     data.image = image;
//     data.imageType = imageType;
//     data.date = date;
//     data.time = time;
//     data.gps = gps;

//     data.save(err => {
//         if (err) return res.json({ success: false, error: err });
//         return res.json({ success: true });
//     }) ;
//     saveImage(data, req.body.image)

//     // try {
//     //     // const newData = await data.save()
//     //     res.redirect('entries')
//     // } catch {
//     //     renderNewEntry(res, data, true)
//     // }
// });

// async function renderNewEntry(res, data, hasError = false) {
//     try {
//         const info = await DiarySchema.find({})
//         const params = {
//             data: data
//         }
//         if (hasError) params.errorMessage = 'Error Saving Journal Entry'
//         res.render('newEntry', params)
//     }catch {
//         res.redirect('/entries')
//     }
// }

// function saveImage(data, imageEncoded){
//     if (imageEncoded == null) return
//     const image = JSON.parse(imageEncoded)
//     if (image != null && imageMimeTypes.includes(image.type)){
//         data.image = new Buffer.from(image.data, 'base64')
//         data.imageType = image.type
//     }
// }

// //append /api for our http requests
// app.use('/api', router);

// //launch our backend into a port
// app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));
// module.exports = router

const express = require('express')
const router = express.Router()
const mongoose = require ('mongoose');
const cors = require('cors');
const logger = require("morgan");
const DiarySchema = require('./diary')
const imageMimeTypes = ['image/jpeg', 'image/png', 'images/gif']

//initialize http server
const app = express();
app.use(cors());
const API_PORT = 3001;
// const router = express.Router();

//Set up the mongoDB connection
const dbRoute = 'mongodb+srv://joshshear:6408*_sel@cluster0-7x2dt.mongodb.net/test?retryWrites=true&w=majority';

mongoose.connect(dbRoute, { useNewUrlParser: true,
                            useFindAndModify: false,
                            useCreateIndex: true,
                            useUnifiedTopology: true
                            });

let db = mongoose.connection;

db.once('open',() => {console.log('connected to the database'); })

//checks if the connection with the database is successful
db.on('error', console.error.bind(console, 'MongoDB connection error'));

// (optional) only made for logging and
// bodyParser, parses the request body to be a readable json format
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger("dev"));


// All entries Route
router.get('/getData', async (req, res) => {
  let query = DiarySchema.find()
  if (req.query.title != null && req.query.title != '') {
    query = query.regex('title', new RegExp(req.query.title, 'i'))
  }
  try {
    const entries = await query.exec()
    res.render('', {
      entries: entries,
      searchOptions: req.query
    })
  } catch {
    res.redirect('/getRedirect')
  }
})

// New DairySchema Route
router.get('/getData', async (req, res) => {
  renderNewEntry(res, new DiarySchema())
})

// Create DairySchema Route
router.post('/putData', async (req, res) => {
  const diarySchema = new DiarySchema({
    id: req.body.id,
    title: req.body.title,
    info: req.body.info,
    image: req.body.image,
    imageType: req.body.imageType,
    date: req.body.date,
    time: req.body.time,
    gps: req.body.gps
  })
  saveImage (diarySchema, req.body.image)

  try {
    const newEntry = await diarySchema.save()
    // res.redirect(`entries/${newEntry.id}`)
    res.redirect('/')
  } catch {
    renderNewEntry(res, diarySchema, true)
  }
})

//Delete Entire Entry
 router.delete('/deleteData', (req, res) => {
        const { id } = req.body;
        const diarySchema = new DiarySchema();
        diarySchema.findByIdAndRemove(id, err => {
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
    res.redirect('/putData')
  }
}

function saveImage (DiarySchema, imageEncoded) {
  if (imageEncoded == null) return
  const image = JSON.parse(imageEncoded)
  if (image != null && imageMimeTypes.includes(image.type)) {
 DiarySchema.image = new Buffer.from(image.data, 'base64')
 DiarySchema.imageType = image.type
  }
}

//append /api for our http requests
app.use('/api', router);

//launch our backend into a port
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));

module.exports = router







// router.get("/", (req, res) => {
//     res.json({ message: "HELLOW WORLDUUHHHH" });
//   });
  
//   router.get("/getData", (req, res) => {
//     DiarySchema.find((err, data) => {
//       if (err) return res.json({ success: false, error: err });
//       return res.json({ success: true, data: data });
//     });
//   });
  
//   router.post("/updateData", (req, res) => {
//     const { id, update } = req.body;
//     DiarySchema.findByIdAndUpdate(id, update, err => {
//       if (err) return res.json({ success: false, error: err });
//       return res.json({ success: true });
//     });
//   });
  
//   router.delete("/deleteData", (req, res) => {
//     const { id } = req.body;
//     DiarySchema.findByIdAndRemove(id, err => {
//       if (err) return res.send(err);
//       return res.json({ success: true });
//     });
//   });
  
//   router.post("/putData", (req, res) => {
//     let data = new DiarySchema();
  
//     const {id, title, info, image, imageType, date, time, gps} = req.body;

//     if ((!id && id !== 0) || !info || !title){
//         return res.json({
//             success: false,
//             error: 'INVALID INPUTS',
//         });
//     }
    
//     data.id = id;
//     data.title = title;
//     data.info = info;
//     data.image = image;
//     data.imageType = imageType;
//     data.date = date;
//     data.time = time;
//     data.gps = gps;
    
//     data.save(err => {
//       if (err) return res.json({ success: false, error: err });
//       return res.json({ success: true });
//     });
//   });
  
//   app.use("/api", router);
  
//   app.listen(API_PORT, () => console.log(`LISTENING ON UHH PORT ${API_PORT}`));