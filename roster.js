
function addOfficer() {
  const table = document.getElementById('rosterTable').getElementsByTagName('tbody')[0];
  const row = table.insertRow();
  ['Name', 'Rank', 'Callsign', 'Status', 'Strikes', 'Promotion Date'].forEach(() => {
    const cell = row.insertCell();
    const input = document.createElement('input');
    cell.appendChild(input);
  });
}
