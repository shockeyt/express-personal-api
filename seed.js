// This file allows us to seed our application with data
// simply run: `node seed.js` from the root of this project folder.

var db = require('./models');

db.Synth.remove({}, function(err, synths) {
	if (err) {
		console.log("Error: ", err);
		}
	console.log('removed all synths');
});

var synths = [
{
  name: "Korg MS-10",
  Polyphony: "Monophonic",
  Keyboard_keys: 32,
  website: "http://www.vintagesynth.com/korg/ms10.php"
},
{
  name: "Korg MS-20",
  Polyphony: "Monophonic",
  Keyboard_keys: 37,
  website: "http://www.vintagesynth.com/korg/ms20.php"
},
{
  name: "ARP Odyssey",
  Polyphony: "Monophonic",
  Keyboard_keys: 37,
  website: "http://www.vintagesynth.com/arp/odyssey.php"
},
{
  name: "Korg PolySix",
  Polyphony: "Polyphonic 6 Voices",
  Keyboard_keys: 61,
  website: "http://www.vintagesynth.com/korg/poly6.php"
},
{
  name: "Roland Juno-106",
  Polyphony: "Polyphonic 6 Voices",
  Keyboard_keys: 61,
  website: "http://www.vintagesynth.com/roland/juno106.php"
},
];


db.Synth.create(synths, function(err, synths) {
	if (err) {
		console.log("Error:", err);
	} else {
	console.log("Created new synths", synths);
	process.exit();
	}
});

// db.Campsite.create(new_campsite, function(err, campsite){
//   if (err){
//     return console.log("Error:", err);
//   }

//   console.log("Created new campsite", campsite._id);
//   process.exit(); // we're all done! Exit the program.
// });
