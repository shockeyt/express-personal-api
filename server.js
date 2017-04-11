// require express and other modules
var express = require('express'),
    app = express();

// parse incoming urlencoded form data
// and populate the req.body object
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/************
 * DATABASE *
 ************/

var db = require('./models');

// hard coded profile object
var myself = [
  { 
    name: 'Tyler', 
    github_link: 'https://github.com/shockeyt', 
    github_profile_image: 'https://avatars3.githubusercontent.com/u/25995018?v=3&s=460', 
    current_city: 'Arvada', 
    pets: [{name: 'Gus', type: 'Dog', breed: 'Goldendoodle'},
    {name: 'Phil', type: 'Imaginary', breed: 'Unicorn'}]
  }
  
];

//hard coded future seed data
// var synths = [
// {
//   _id: 1,
//   name: "Korg MS-10",
//   Polyphony: "Monophonic",
//   Keyboard_keys: 32,
//   website: "http://www.vintagesynth.com/korg/ms10.php"
// },
// {
//   _id: 2,
//   name: "Korg MS-20",
//   Polyphony: "Monophonic",
//   Keyboard_keys: 37,
//   website: "http://www.vintagesynth.com/korg/ms20.php"
// },
// {
//   _id: 3,
//   name: "ARP Odyssey",
//   Polyphony: "Monophonic",
//   Keyboard_keys: 37,
//   website: "http://www.vintagesynth.com/arp/odyssey.php"
// },
// {
//   _id: 4,
//   name: "Korg PolySix",
//   Polyphony: "Polyphonic 6 Voices",
//   Keyboard_keys: 61,
//   website: "http://www.vintagesynth.com/korg/poly6.php"
// },
// {
//   _id: 5,
//   name: "Roland Juno-106",
//   Polyphony: "Polyphonic 6 Voices",
//   Keyboard_keys: 61,
//   website: "http://www.vintagesynth.com/roland/juno106.php"
// },
// ];

/**********
 * ROUTES *
 **********/

// Serve static files from the `/public` directory:
// i.e. `/images`, `/scripts`, `/styles`
app.use(express.static('public'));


//profile endpoint w hard-coded data
app.get('/api/profile', function profile(req, res) {
  res.json({myself: myself});
});

//**** RESTful Routes ****

//show all synths
app.get('/api/synths', function (req, res) {

  db.Synth.find()
  .exec(function(err, synths) {
    if (err) { return console.log("index error: " + err); }
    res.json(synths);
  });

});

//get one synth
app.get('/api/synths/:id', function (req, res) {
  db.Synth.findOne({_id: req.params.id}, function(err, synths) {
    console.log(req.params.id);
    res.json(synths);
  });
});

//create new synth
app.post('/api/synths', function (req, res) {
  var newSynth = new db.Synth({
    name: req.body.name,
    Polyphony: req.body.Polyphony,
    Keyboard_keys: req.body.Keyboard_keys,
    website: req.body.website
  });

  newSynth.save(function(err, synth) {
    if (err) {
      return console.log("save error: " + err);
    }
    console.log("saved ", synth.name);
    console.log(req.body);
    res.json(synth);
  });
});

//update synth
app.put('/api/synths/:id', function (req, res) {

  var id = req.params.id;

  db.Synth.findOne({_id: id}, function(err, synth) {
    if (err) res.json({message: 'find error: ' + err});
    if(req.body.name) synth.name = req.body.name;
    if(req.body.Polyphony) synth.Polyphony = req.body.Polyphony;
    if(req.body.Keyboard_keys) synth.Keyboard_keys = req.body.Keyboard_keys;
    if(req.body.website) synth.website = req.body.website;

    synth.save(function(err) {
      if(err) res.json({message: 'could not update'});
      res.json({message: 'synth updated'});
    });
  });
});

//delete synth
app.delete('/api/synths/:id', function (req, res) {
  console.log('synths delete', req.params);
  var synthId = req.params.id;
  db.Synth.findOneAndRemove({ _id: synthId }, function (err, deletedSynth) {
    res.json(deletedSynth);
  });
});


//HARD CODED TESTS
//show index
// app.get('/api/synths', function synthIndex(req, res) {
//   res.json({synths: synths});
// });
// // show single synth
// app.get('/api/synths/:id', function synthShow(req, res) {
//   var idCheck = req.params.id-1;
//   res.json(synths[idCheck]);
// });


/*
 * HTML Endpoints
 */

app.get('/', function homepage(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


/*
 * JSON API Endpoints
 */

app.get('/api', function api_index(req, res) {
  // TODO: Document all your api endpoints below
  res.json({
    //woops_i_has_forgot_to_document_all_my_endpoints: true, // CHANGE ME ;)
    message: "Welcome to my SNAZZY personal api! Here's what you need to know!",
    documentation_url: "https://github.com/shockeyt/express-personal-api/README.md",
    base_url: "https://whispering-garden-62967.herokuapp.com",
    endpoints: [
      {method: "GET", path: "/api", description: "Describes all my available endpoints"},
      {method: "GET", path: "/api/profile", description: "my profile page with my petz"},
      {method: "GET", path: "/api/synths", description: "My synthesizer index"},
      {method: "GET", path: "/api/synths/:id", description: "Select an individual synth"},
      {method: "POST", path: "/api/synths", description: "Create a new synth"},
      {method: "PUT", path: "/api/synths/:id", description: "Update a current synth by ID"},
      {method: "DELETE", path: "/api/synths/:id", description: "Delete a synth"}
    ]
  })
});

/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is up and running on http://localhost:3000/');
});
