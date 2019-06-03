const mysql=require('mysql');
const express=require('express');
const cors=require('cors');
let app=express();
let bodyparser=require('body-parser');


// const logger = require('morgan')
const fileUpload = require('express-fileupload');
// const cookieParser = require('cookie-parser')
const path = require('path')



const db=mysql.createConnection({
	host:'localhost',
	user:'root',
	password:'',
	port:3307,
	database:'Eder'
});

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to database');
    
});
// app.use(logger('dev'));
app.use(cors());
app.use(bodyparser.json());



// app.use(
//   bodyparser.urlencoded({
//     extended: false,
//   }),
// )
// app.use(cookieParser())
app.use(fileUpload())
app.use('/', express.static(__dirname + '/'))

    

    app.post('/upload', (req, res) => {
      let uploadFile = req.files.file
      const fileName = req.files.file.name
      console.log("updated  name");
      console.log(req.body.numberdates);


      let filelocation=`${__dirname}/public/img/files/${req.body.numberdates}`;
      uploadFile.mv(
        `${__dirname}/public/img/files/${req.body.numberdates}`,
        function (err) {
          if (err) throw err
          // {
          //   return res.status(500).send(err)
          // }

          // res.json({
          //   file: `public/${req.files.file.name}`,
          // })
        },
      )
      db.query("INSERT into Image (Image_id,Image,Type) values (?,?,?)",[req.body.numberdates,filelocation,req.body.type],(err,result,fields)=>{
        if(err) throw err;
        res.send(result);
    });



    });


app.get('/getimage',(req,res)=>{
    let results=null;
    db.query("SELECT * FROM Image", function(err,result,fields){
        if(err) throw err;
        results=JSON.stringify(result);
        // console.log(result);
        // console.log(results);
        // console.log(typeof result);
        // console.log(typeof results);
    


    res.send(results);
    });
});

app.get('/image/:id',(req,res)=>{
    let results=null;
    console.log(req.params.id);
    db.query("SELECT * FROM Image where Image_id= ?",[req.params.id], function(err,result,fields){
        if(err) throw err;
        results=JSON.stringify(result);
        console.log(result+"hellow");
        console.log(results);
        console.log(typeof result);
        console.log(typeof resultss);
    


    res.send(results);
    });
});



app.get('/getallmessage',(req,res)=>{
    let results=null;
    db.query("SELECT * FROM Message", function(err,result,fields){
        if(err) throw err;
        results=JSON.stringify(result);
        console.log(result);
        console.log(results);
        console.log(typeof result);
        console.log(typeof results);
    


    res.send(results);
    });
});
app.post('/addmessage',(req,res)=>{
    let users=req.body;
    console.log((users));

    db.query("INSERT into Message (Name,Email,Message) values (?,?,?)",[req.body.Name,req.body.Email,req.body.Message],(err,result,fields)=>{
        if(err) throw err;
        res.send(result);
    });

 });   








// db.query("SELECT * FROM Message", function (err, result, fields) {
//     if (err) throw err;
//     console.log(result);
//   });
app.get('/getalluser',(req,res)=>{
    let results=null;
    db.query("SELECT * FROM Users ORDER BY User_id DESC", function(err,result,fields){
        if(err) throw err;
        results=JSON.stringify(result);
        console.log(result);
        console.log(results);
        console.log(typeof result);
        console.log(typeof results);
    


    res.send(results);
    });
});

app.get('/getusername',(req,res)=>{
    let usernames=[];
    db.query("SELECT Name FROM Users ORDER BY User_id DESC", function(err,result,fields){
        if(err) throw err;
        
        for(var i=0;i<result.length;i++){
            usernames.push(result[i].Name);
        }
    res.send(usernames);
    });
});

app.get('/getdescription',(req,res)=>{
    let description=[];
    db.query("SELECT Description FROM Activity ORDER BY Activity_id DESC", function(err,result,fields){
        if(err) throw err;
        
        for(var i=0;i<result.length;i++){
            description.push(result[i].Description);
        }
    res.send(description);
    });
});
app.get('/getallpost',(req,res)=>{
  
    db.query("SELECT * FROM Post ORDER BY Post_id DESC", function(err,result,fields){
        if(err) throw err;
        results=JSON.stringify(result);
       
    


    res.send(results);
    });
});

app.get('/user/:id',(req,res)=>{
    let results=null;
    console.log(req.params.id);
    db.query("SELECT * FROM Users where User_id= ?",[req.params.id], function(err,result,fields){
        if(err) throw err;
        results=JSON.stringify(result);
        console.log(result+"hellow");
        console.log(results);
        console.log(typeof result);
        console.log(typeof resultss);
    


    res.send(results);
    });
});


app.get('/getpostbyuserid/:id',(req,res)=>{
    db.query("SELECT * FROM Post where User_id= ?",[req.params.id], function(err,result,fields){
        if(err) throw err;
        results=JSON.stringify(result);
        res.send(results);
    });
});

app.post('/adduser',(req,res)=>{
    let users=req.body;
    console.log((users));

    db.query("INSERT into Users (Name,Email,Mobile,Password,Type) values (?,?,?,?,?)",[req.body.Name,req.body.Email,req.body.Mobile,req.body.Password,req.body.Type],(err,result,fields)=>{
        if(err) throw err;
        res.send(result);
    });

 });   

app.post('/updateuser',(req,res)=>{
    let users=req.body;
    console.log((users));

    db.query('UPDATE Users SET Name = ?, Email =? ,Mobile=?, Password=? ,Type=? WHERE User_id = ?', [req.body.Name,req.body.Email,req.body.Mobile,req.body.Password,req.body.Type,req.body.User_id],(err,result,fields)=>{
        if(err) throw err;
        res.send(result);
    });

 });

app.delete('/deleteuser/:id',(req,res)=>{
   

    db.query("DELETE from Users where User_id=(?)",[req.params.id],(err,result,fields)=>{
        if(err) throw err;
        console.log(err);
        res.send(result);
    });
  


});
  

app.post('/addpost',(req,res)=>{
    let users=req.body;
    console.log((users));

    db.query("INSERT into Post (Text,Image,Type,User_id,Too) values (?,?,?,?,?)",[req.body.Text,req.body.Image,req.body.Type,req.body.User_id,req.body.Too],(err,result,fields)=>{
        if(err) throw err;
        res.send(result);
    });
  });

app.delete('/deletepost/:id',(req,res)=>{
   

    db.query("DELETE from Post where User_id=(?)",[req.params.id],(err,result,fields)=>{
        if(err) throw err;
        res.send(result);
    });
  


});





app.get('/getactivity',(req,res)=>{
    let results=null;
    db.query("SELECT * FROM Activity ORDER BY Activity_id DESC", function(err,result,fields){
        if(err) throw err;
        results=JSON.stringify(result);
        console.log(result);
        console.log(results);
        console.log(typeof result);
        console.log(typeof results);
    


    res.send(results);
    });
});


app.get('/getpayment',(req,res)=>{
    let results=null;
    db.query("SELECT * FROM Payment ORDER BY Payment_id DESC", function(err,result,fields){
        if(err) throw err;
        results=JSON.stringify(result);
        console.log(result);
        console.log(results);
        console.log(typeof result);
        console.log(typeof results);
    


    res.send(results);
    });

    
});
app.get('/getpaymentleftjoined',(req,res)=>{
    let results=null;
    db.query("SELECT Payment.*,Users.Name,Activity.Description FROM Payment LEFT JOIN Users ON Users.User_id=Payment.User_id LEFT JOIN Activity ON Activity.Activity_id=Payment.Activity_id ORDER BY Payment_id DESC", function(err,result,fields){
        if(err) throw err;
        results=JSON.stringify(result);
    res.send(results);
    });

    
});



app.post('/addactivity',(req,res)=>{
    let users=req.body;
    console.log((users));

    db.query("INSERT into Activity (Activity_id,Description,Minimum) values (?,?,?)",[req.body.Activity_id,req.body.Description,req.body.Minimum],(err,result,fields)=>{
        if(err) throw err;
        res.send(result);
    });

 }); 

app.post('/addpayment',(req,res)=>{
    let users=req.body;
    console.log((users));

    db.query("INSERT into Payment (Payment_id,User_id,Activity_id,Amount) values (?,?,?,?)",[req.body.Payment_id,req.body.User_id,req.body.Activity_id,req.body.Amount],(err,result,fields)=>{
        if(err) throw err;
        res.send(result);
    });

 });

app.delete('/deleteactivity/:id',(req,res)=>{
   

    db.query("DELETE from Activity where Activity_id=(?)",[req.params.id],(err,result,fields)=>{
        if(err) throw err;
        console.log(err);
        res.send(result);
    });
  


});


app.delete('/deletepayment/:id',(req,res)=>{
   

    db.query("DELETE from Payment where Payment_id=(?)",[req.params.id],(err,result,fields)=>{
        if(err) throw err;
        console.log(err);
        res.send(result);
    });
  


});

app.post('/updateactivity',(req,res)=>{
    let users=req.body;
    console.log((users));

    db.query('UPDATE Activity SET Description = ?, Minimum =?  WHERE Activity_id = ?', [req.body.Description,req.body.Minimum,req.body.Activity_id],(err,result,fields)=>{
        if(err) throw err;
        res.send(result);
    });

 });
app.post('/updatepayment',(req,res)=>{
    let users=req.body;
    console.log((users));

    db.query('UPDATE Payment SET User_id = ?, Activity_id =? ,Amount=?  WHERE Payment_id = ?', [req.body.User_id,req.body.Activity_id,req.body.Amount,req.body.Payment_id],(err,result,fields)=>{
        if(err) throw err;
        res.send(result);
    });

 });
const port=process.env.PORT || 5004;
app.listen(port,(err)=>{
    console.log(err);
}); 
global.db = db;
