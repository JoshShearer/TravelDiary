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