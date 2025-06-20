
// Handles RSVP form submission and stores data in JSONBin

const apiKey = 'YOUR_API_KEY_HERE'; 
const binId = 'YOUR_BIN_ID_HERE';   
const apiUrl = `https://api.jsonbin.io/v3/b/${binId}`;

const form = document.getElementById('rsvpForm');
const status = document.getElementById('status');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  //  Read form input values
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const attending = document.getElementById('attending').value;
  const guestCount = parseInt(document.getElementById('guestCount').value, 10);

  //  Create a new guest object
  const newGuest = { name, email, attending, guestCount, seat: '' };

  try {
    //  Load existing guest list
    const res = await fetch(`${apiUrl}/latest`, {
      headers: { 'X-Master-Key': apiKey }
    });
    const data = await res.json();
    const guests = data.record || [];

    //  Add the new guest
    guests.push(newGuest);

    //  Save updated guest list
    const saveRes = await fetch(apiUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-Master-Key': apiKey
      },
      body: JSON.stringify(guests)
    });

    if (saveRes.ok) {
      status.textContent = `Thanks ${name}! Your RSVP has been saved.`;
      form.reset();
    } else {
      status.textContent = 'Error: Could not save your RSVP.';
    }
  } catch (error) {
    console.error(error);
    status.textContent = 'Network error. Please try again later.';
  }
});
