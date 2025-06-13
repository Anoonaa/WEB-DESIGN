// Admin dashboard logic
async function fetchGuests() { // Fetches guest list from backend
  const res = await fetch('/api/rsvps'); // GET endpoint
  return res.json(); // returns array
}

function createRow(guest) { // Builds a table row for each guest
  const tr = document.createElement('tr'); // <tr>

  // Helper to create and append <td> with text
  function td(text) {
    const cell = document.createElement('td');
    cell.textContent = text;
    tr.appendChild(cell);
  }

  td(guest.id); // id
  td(guest.name); // name
  td(guest.email); // email
  td(guest.attending); // attending
  td(guest.guestCount); // guest count
  td(guest.diet); // diet
  td(guest.seat || ''); // seat assignment

  // Assign seat input
  const seatInput = document.createElement('input'); // create input box
  seatInput.type = 'text';
  seatInput.value = guest.seat; // prefill current seat
  seatInput.placeholder = 'e.g., Table 3'; // hint

  // Save button
  const saveBtn = document.createElement('button');
  saveBtn.textContent = 'Save';

  // When save clicked, send PUT to backend
  saveBtn.addEventListener('click', async () => {
    await fetch(`/api/rsvps/${guest.id}/seat`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ seat: seatInput.value })
    });
    load(); // reload table to show updated seat
  });

  const actionTd = document.createElement('td'); // final column
  actionTd.appendChild(seatInput);
  actionTd.appendChild(saveBtn);
  tr.appendChild(actionTd);

  return tr; // return assembled row
}

async function load() { // Populates entire table
  const guests = await fetchGuests(); // get data
  const tbody = document.querySelector('#guestTable tbody'); // select body
  tbody.innerHTML = ''; // clear previous rows
  guests.forEach
