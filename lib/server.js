const express = require ('express'); 
const multer = require('multer');
var exphbs  = require('express-handlebars');
////////const webp = require('webp-converter');      don't need

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now()+ '.webp')              // task no.4
    }
  })
   
  var upload = multer({ storage: storage, fileFilter: function (req, file, callback) {    
    if (!file.originalname.match(/\.(jpg)$/)) {                                       
    return callback(('Only  .jpg image files are allowed!'), false);        //task no.2
 }
  
    return callback(null, true);
}
 });

var app = express();
var PORT = process.env.PORT || 8080;

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.get('/',(req,res)=> {
    res.render('index');
});
app.post('/',upload.single('image'),(req,res,file)=> {
    //res.writeHead(200, { 'x-test': 'hell/html' }); 
        console.log(req.headers); 
         
        res.send('tested DONE');

          ///// work to be done here
});

app.listen(PORT,()=>{
    console.log('server running at port '+ PORT);           //task no.1
});

