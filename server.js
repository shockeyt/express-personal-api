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
  { _id: 1, 
    name: 'Tyler', 
    github_link: 'https://github.com/shockeyt', 
    github_profile_image: 'https://avatars3.githubusercontent.com/u/25995018?v=3&s=460', 
    current_city: 'Arvada', 
    pets: [{name: 'Gus', type: 'Dog', breed: 'Goldendoodle'}]
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
  // db.Synth.find({}, function(err, synths) {
  //   if (err) {
  //     console.log("Error: ", err);
  //   }
  //   res.json(synths);
  // });
  db.Synth.find()
  .exec(function(err, synths) {
    if (err) { return console.log("index error: " + err); }
    res.json(synths);
  });

});

//get one synth
app.get('/api/synths/:id', function (req, res) {
  db.Synth.findOne({_id: req.params.id}, function(err, synths) {
    res.json(synths);
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
    woops_i_has_forgot_to_document_all_my_endpoints: true, // CHANGE ME ;)
    message: "Welcome to my personal api! Here's what you need to know!",
    documentation_url: "https://github.com/example-username/express_self_api/README.md", // CHANGE ME
    base_url: "http://YOUR-APP-NAME.herokuapp.com", // CHANGE ME
    endpoints: [
      {method: "GET", path: "/api", description: "Describes all available endpoints"},
      {method: "GET", path: "/api/profile", description: "my profile page"}, // CHANGE ME
      {method: "POST", path: "/api/synths", description: "My synthesizer info"} // CHANGE ME
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
