// === server.js ===
const express = require('express'); // import Express framework for HTTP server
const bodyParser = require('body-parser'); // middleware to parse JSON bodies
const cors = require('cors'); // middleware to allow cross‑origin requests (handy for dev tools)

const app = express(); // create Express application
const PORT = 3000; // choose a port for local testing

app.use(cors()); // enable CORS
app.use(bodyParser.json()); // have Express parse incoming JSON bodies
app.use(express.static('public')); // serve static files from the "public" folder

// -------------------------- In‑Memory Data Store -------------------------- //
// In a real app you’d use a database; for demo we use an array in RAM.
let rsvps = []; // array of guest objects, e.g. { id: 1, name:'Ana', email:'a@b.com', seat:'' }
let nextId = 1; // simple incremental ID so we can reference each RSVP later

// -------------------------- Routes (API) ---------------------------------- //

// Handle form submission (RSVP)
app.post('/api/rsvp', (req, res) => { // POST endpoint to accept guest data
  const { name, email, attending, guestCount, diet } = req.body; // destructure expected fields
  const newGuest = { id: nextId++, name, email, attending, guestCount, diet, seat: '' }; // create record
  rsvps.push(newGuest); // store in memory
  res.json({ success: true, guest: newGuest }); // send confirmation back to client
});

// Get all RSVPs (Admin)
app.get('/api/rsvps', (req, res) => { // GET endpoint returns entire guest list
  res.json(rsvps); // return array
});

// Update seat assignment (Admin)
app.put('/api/rsvps/:id/seat', (req, res) => { // PUT endpoint updates specific guest
  const id = parseInt(req.params.id, 10); // grab id from URL
  const { seat } = req.body; // seat to assign, e.g. "Table 3 ‑ Seat 2"
  const guest = rsvps.find(g => g.id === id); // locate guest
  if (!guest) return res.status(404).json({ error: 'Guest not found' }); // guard clause

  guest.seat = seat; // update seat
  res.json({ success: true, guest }); // respond with updated guest
});

// Start server
app.listen(PORT, () => {
  console.log(`RSVP server running on http://localhost:${PORT}`); // log server start
});
