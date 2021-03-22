var express = require('express');
var path = require('path');
const bodyParser = require('body-parser');
const multer = require('multer');

var cors = require('cors');

const productRoute = require('./routes/product');

const storage = multer.diskStorage({
  destination :'./images/uploads/',
  filename : function(req, file ,cb){
    cb(null,file.fieldname + '-'+ Date.now()+ path.extname(file.originalname));
  }
});

const upload = multer({storage : storage ,
fileFilter : function(req, file , cb){
chekFileType(file,cb);
}
}).single('image');

function chekFileType(file, cb){
  const filetypes = /jpeg|jpg|png|gif/;
  const extname = filetypes.test(path.extname(file.originalname).toLocaleLowerCase());

  if(extname){
    return cb(null, true) ;
   }else{
    cb('Error : Images Only');
  }

}

var port = 5000;
var app = express();
app.use(cors());

app.use(bodyParser.json());

app.set('port',5000);
app.set('view engine', 'ejs');

app.use(express.static('./images'));
app.use('/', productRoute);


app.get('/', function (req, res) {
  res.render("main");
});

app.post('/upload',(req,res) =>{
  upload(req, res, (err) =>{
    if(err){

      console.log("error occured while upload" + err);
      res.send(err);
      
    }else{

      console.log("File upload successfully!");
      res.send({msg:"Filed Uploaded!",
    file: `images/upload/${req.file.filename}`})

    }
  });
});

app.listen(port, function () {
  console.log('Application Started @ localhost:' + port );
});