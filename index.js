const express = require('express');
const app = express();
const bodyParser= require('body-parser');
const MongoClient = require('mongodb').MongoClient 
const passport = require('passport');
const session = require('cookie-session');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const path = require('path')

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(session({
  secret : "Our little Secret Here",
  resave : false,
  saveUninitialized : false
}));

app.use(passport.initialize());
app.use(passport.session());



app.listen(process.env.PORT || 5000, function(){  
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
}); 

MongoClient.connect('mongodb+srv://Registration:charangoc30@cluster0.fga0d.mongodb.net/Registration?retryWrites=true&w=majority'
,{
  useUnifiedTopology: true
}).then(client => {
    console.log('Connected to Database');
    const db = client.db('Students');

  passport.serializeUser(function(user, done) {
    done(null, user);
  });

  passport.deserializeUser(function(user, done) {
    done(null, user);
  })

  passport.use(new GoogleStrategy({
      clientID        : '275436600547-827fs70tsjjbvvt1ls3c3q62kmglqsjd.apps.googleusercontent.com',
      clientSecret    : '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',
      callbackURL     : 'https://workshop.webnd-iitbbs.org/auth/google/callback',
      userProfileURL  : 'https://www.googleapis.com/oauth2/v3/userinfo'
    },
    function(token, refreshToken, profile, done) {
      console.log('HI');
      console.log(profile);
      

      
      db.collection('users').findOne({ googleid : profile.id } , function(err, user) { 
          if (err)
              return done(err);
          else if (user) {
              console.log('user');
              return done(null, user);
          } 
          else {
              console.log('ELSE');
              db.collection('users').insertOne({
              "googleid" : profile.id,
              "token" : token,
              "name"  : profile.displayName,
              "email" : profile.emails[0].value,
              "photo" : profile.photos[0].value
              })
              console.log(profile.emails[0].value);
              return done(null, user);
              
          }
      })    
    }
  ))

  app.get('/auth/google', 
    passport.authenticate('google', { scope : ['profile', 'email'] })
  );

  app.get('/auth/google/callback', 
        passport.authenticate('google', {
            failureRedirect: '/auth/google'
        }) ,
          (req, res) => {
              console.log("login done");
              res.redirect('/admin/dashboard');
             
          }
  );

  app.get("/user", (req, res) => {
    res.send(req.user);
  });
  
  app.post('/submit1', (req, res)=>{
    console.log('requested');
    console.log(req.body)
    var data = req.body;
    var update = { $set : {
      "qone": data.qone,
      "qtwo": data.qtwo,
      "qthree": data.qthree,
      "qfour": data.qfour,
      "qfive": data.qfive,
      "qsix": data.qsix,

    } };
   
    db.collection('users').findOneAndUpdate(
      { "name" : req.user.name },
      update, function(err,doc) {
        if (err) {
          throw err;
        } else {
         console.log(doc);
        //  alert('Submirtted Successfully');
         res.sendStatus(200);
        }
      })
  })

  app.post('/submit2', (req, res)=>{
    console.log('requested');
    console.log(req.body)
    var data = req.body;
    var update = { $set : {
      "qtwentyone": data.qtwentyone,
      "qtwentytwo": data.qtwentytwo,
      "qtwentythree": data.qtwentythree,
      "qtwentyfour": data.qtwentyfour,
      "qtwentyfive": data.qtwentyfive,
      "qtwentysix": data.qtwentysix,
      "qtwentyseven": data.qtwentyseven,
      "qtwentyeight": data.qtwentyeight,
      "qtwentynine": data.qtwentynine,
      "qthirty": data.qthirty,
      "qthirtyone": data.qthirtyone,
      "qthirtytwo": data.qthirtytwo,
      "qthirtythree": data.qthirtythree,
      "qthirtyfour": data.qthirtyfour,
      "qthirtyfive": data.qthirtyfive,
      "qthirtysix": data.qthirtysix,
      "qthirtyseven": data.qthirtyseven,
      "qthirtyeight": data.qthirtyeight,

    } };
    db.collection('users').findOneAndUpdate(
      { "name" : req.user.name },
      update, function(err,doc) {
        if (err) {
          throw err;
        } else {
         console.log(doc);
        //  alert('Submirtted Successfully');
         res.sendStatus(200);
        }
      })
  })

  
  app.get('/logout', function(req, res){
    req.logout();
    res.redirect('https://workshop.webnd-iitbbs.org/');
  });

  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });

 
})
