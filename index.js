var express = require('express');
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
var passportLocalMongoose = require('passport-local-mongoose');
const session = require('express-session');
const passport = require("passport");
passport.serializeUser(function(user, done) {
    done(null, user);
  });
  
  passport.deserializeUser(function(user, done) {
    done(null, user);
  });
const multer  = require('multer')
let storage = multer.diskStorage({
	destination: function (req, file, cb) {
	  cb(null, 'public/uploads')
	},
	filename: function (req, file, cb) {
	  let extArray = file.mimetype.split("/");
	  let extension = extArray[extArray.length - 1];
	  cb(null, file.fieldname + '-' + Date.now()+ '.' +extension)
	}
  })
  const upload = multer({ storage: storage })
  mongoose.connect("mongodb+srv://admin-sapan:12345@todolist.jia23.mongodb.net/vmostuser", {
  useNewUrlParser: true
});

const projectdata= new mongoose.Schema({
	name:String,
	skill:[{
        type:String
    }],
    noofteam:String,
	mode:String,
    status:String
	
	});
    const projectdata1 = mongoose.model("projectpost", projectdata);
const profiledata= new mongoose.Schema({
	name:String,
	email:String,
    username:String,
	phone:String,
    profile:String,
    skill:[{
        type:String
    }]
	
	});
    const proposeldata= new mongoose.Schema({
        name:String,
        pname:String,
        cid:String,
        cname:String,
        cphone:String
        
        });
        const proposeldata1 = mongoose.model("proposeldata", proposeldata);
        const mentordata= new mongoose.Schema({
            name:String,
            specification:String,
            email:String,
            phone:String
           
            
            });
        const mentordata1 = mongoose.model("mentordata", mentordata);
     
	profiledata.plugin(passportLocalMongoose);
    const skilldata= new mongoose.Schema({
        skill:String,
        correct:String,
        option:[
            {correct:String,question:String,option1:String,
                option2:String,
                option3:String,
                option4:String
                
            }
        ]
        
        });
        const skilldata1 = mongoose.model("skilldata", skilldata);
        
        
    const profiledata1 = mongoose.model("profiledata", profiledata);
    passport.use(profiledata1.createStrategy());
var app = express();
app.use(express.static('public'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.use(session({
	secret: "Our little secret.",
	resave: false,
	saveUninitialized: false,
	cookie:{_expires : 7 * 24 * 3600 * 1000}
  }));
  app.use(passport.initialize());
app.use(passport.session());
app.get('/qw',async function(req,res){
    if(req.isAuthenticated()){
        var dat=await skilldata1.find();
        var da=await proposeldata1.find();
        var ski=await skilldata1.find()
        res.render('home',{data:dat,pro:da,user:req.user,skil:ski});
    }else{
res.redirect('/login')
    }

});
app.post('/addskilltoprofile',function(req,res){
    projectdata1.findOneAndUpdate(
        { _id: req.user._id}, 
        { $push: { skill: req.body.skill  } },
       function (error, success) {
             if (error) {
                 console.log(error);
             } else {
                 res.redirect('/qw')
             }
         });
})
app.get('/logout', function(req, res){
	req.logout(function(err) {
	  if (err) { return next(err); }
	  res.redirect('/login');
	});
  });
app.post("/quesskill",async function (req,res){
    const skill = req.body.skill;
    
   
    const projectpost2 = new skilldata1({
        skill:skill
      });
    
      try {
          const cont = await projectpost2.save();
          res.send(cont)
      }catch (err){
          res.status(600).json(err)
      }
});
app.post("/mentorpost",async function(req,res){
    const name = req.body.name;
    const team = req.body.specification;
    const mode = req.body.email;
    const status = req.body.phone;
    const projectpost2 = new mentordata1({
        name:name,
        specification:team,
        email:mode,
        phone:status
      });
    
      try {
          const cont = await projectpost2.save();
          res.send(cont)
      }catch (err){
          res.status(600).json(err)
      }
});
app.post("/quespost",async function (req,res){
    skilldata1.findOneAndUpdate(
        { _id: req.body.skillid }, 
        { $push: {option: {correct: req.body.correct,question:req.body.question,option1:req.body.option1,
            option2:req.body.option2,
            option3:req.body.option3,
            option4:req.body.option4}  } },
       function (error, success) {
             if (error) {
                 console.log(error);
             } else {
                 console.log(success);
             }
         });
        });
app.post("/projectpost",async function (req,res){
    const name = req.body.name;
	const team = req.body.team;
	const mode = req.body.mode;
    const status = req.body.status;
    const projectpost2 = new projectdata1({
        name:name,
        noofteam:team,
        mode:mode,
        status:status
      });
    
      try {
          const cont = await projectpost2.save();
          res.send(cont)
      }catch (err){
          res.status(600).json(err)
      }
});
app.post("/proposel",async function (req,res){
    const projectid = req.body.pid;
	const clientid = req.body.clientid;
	const clientname = req.body.clientname;
    const clientphone = req.body.clientphone;
    const pname = req.body.pname;
    const projectpost2 = new proposeldata1({
        name:projectid,
        cid:clientid,
        cname:clientname,
        cphone:clientphone,
        pname:pname

      });
    
      try {
          const cont = await projectpost2.save();
          res.send(cont)
      }catch (err){
          res.status(600).json(err)
      }
});
app.get("/proposel",function(req,res){
    

})
app.post("/skillpost",async function (req,res){
    projectdata1.findOneAndUpdate(
        { _id: req.body.projectid }, 
        { $push: { skill: req.body.skill  } },
       function (error, success) {
             if (error) {
                 console.log(error);
             } else {
                 console.log(success);
             }
         });
        });

app.post("/profiledata",async function(req, res) {
	
	const name = req.body.name;
	const email = req.body.username;
	const phone = req.body.phone;
	const username = req.body.email;
    
	const profiledata2 = {
	  name:name,
	  username:email,
	  email:username,
	  phone:phone,
      profile:"client"
      

	};
  


	profiledata1.register(profiledata2, req.body.password, function(err, user){
		if (err) {
			console.log(err)
		  res.redirect('/')
		} else {
            res.redirect('/login')
		 
		}
	  });
  
  });
  app.post('/login',passport.authenticate('local', {
	successRedirect: '/qw',
	failureRedirect: '/login'
	
   
  }));
app.get('/pro',async function(req,res){
    if(req.isAuthenticated()){
        var dat=await projectdata1.find()
        console.log(req.user)
        res.render('project',{data:dat,user:req.user});
    }else{
res.redirect('/login')
    }

});
app.get('/approv',function(req,res){
    res.render('approve');
});
app.get('/skilltest/:id',async function(req,res){
    if(req.isAuthenticated()){
        var dat=await skilldata1.findOne({_id:req.params.id})
        console.log(dat.option)
        res.render('skilltest',{data:dat.option,datan:dat.skill});
    }else{
res.redirect('/login')
    }
   
});
app.get('/postskill',function(req,res){
    if(req.isAuthenticated()){
        res.render('postskill',{user:req.user});
    }else{
res.redirect('/login')
    }
    
});
app.get('/mentor',function(req,res){
    if(req.isAuthenticated()){
        res.render('mentor',{user:req.user});
    }else{
res.redirect('/login')
    }

});
app.get('/profile',async function(req,res){
    if(req.isAuthenticated()){
        var ds=await mentordata1.find()
        res.render('profile',{user:req.user});
    }else{
res.redirect('/login')
    }

});
app.get('/change',function(req,res){
    res.render('change');
});
app.get('/mentortable',async function(req,res){
    if(req.isAuthenticated()){
        var ds=await mentordata1.find()
        res.render('mentortable',{dat:ds,user:req.user});
    }else{
res.redirect('/login')
    }
   
});
app.get('/login',function(req,res){
    res.render('login');
});
app.listen(3000,function(req,res){
    console.log('port 3000')
})