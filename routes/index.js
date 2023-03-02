var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

//CONECTING DB// APP CONFI
mongoose.connect('mongodb+srv://Khoa21donga:Khoa21dongaKhoa21dongaKhoa21donga@cluster0.o9ivn6p.mongodb.net/test2?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false 
  // useUnifiedTopology: true
});

//create collection
let giangVienSchema = mongoose.Schema({
  hoTen: {
    type: String,
  },
  diaChi: {
    type: String,
  },
  SDT: {
    type: Number,
  },
  maGiangVien: {
    type: String,
  }
});

// 
//MODEL
let giangVien = mongoose.model('giangVien', giangVienSchema);

/* GET home page. */
router.get('/', function(req, res, next) {
  giangVien.find({}, (Error, data)=> {
    console.log("Danh sach giangVien", data);
    res.render('index', {giangViens:data})
  })
}); 
// them giangVien
router.get('/form-add', function(req, res,next) {
  res.render('form-add', {});
})

router.post("/add", function(req,res, next) {
  giangVien.create(req.body);
  res.redirect('/')
})

// update
router.get('/form-update/:id', function(req, res,next) {
  giangVien.findById(req.params.id, (error, data)=>{
    res.render('form-update', {giangVien: data});
  });
})

router.post("/update", function(req, res, netx){
  console.log('Duc', req.body);
  giangVien.findByIdAndUpdate(req.body.id, req.body, (error, data)=>{
    res.redirect('/')
  })
})

// delete
router.get('/form-delete/:id', function(req, res,next) {
  giangVien.findByIdAndDelete(req.params.id, (error, data)=>{
    res.redirect('/')
  });
})



module.exports = router;
