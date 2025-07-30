const ranks = [
  "Chief of Police", "Assistant Chief", "Deputy Chief", "Commander",
  "Captain", "Lieutenant", "Sergeant", "Corporal",
  "Senior Officer", "Officer"
];

const divisions = {
  "Command": "1L",
  "K9": "3L", "SWAT": "4L", "Traffic Enforcement": "5L", "Coastal": "6L",
  "Field Training": "7L", "Internal Affairs": "8L", "Air Support": "9L",
  "Criminal Investigations": "10L", "School Resource Officer": "11L"
};

let officerList = [];

function addOfficer() {
  const name = prompt("Enter Officer Name:");
  const rank = prompt("Enter Rank:");
  const division = prompt("Enter Division:");

  if (!name || !rank || !division || !divisions[division]) return;

  const callsignPrefix = divisions[division];
  const currentCount = officerList.filter(o => o.division === division).length;
  if (currentCount >= 10) return alert("Division full (10 max).");

  const callsign = `${callsignPrefix}-${(currentCount + 1).toString().padStart(2, '0')}`;
  const officer = {
    name, rank, division, callsign,
    promotionDate: new Date().toISOString().split('T')[0],
    strikes: "None",
    status: "Active"
  };

  officerList.push(officer);
  renderRoster();
}

function deleteOfficer(index) {
  officerList.splice(index, 1);
  renderRoster();
}

function renderRoster() {
  const tbody = document.getElementById("rosterBody");
  tbody.innerHTML = "";

  const filter = document.getElementById("filterDivision").value;

  officerList.forEach((officer, i) => {
    if (filter && officer.division !== filter) return;

    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${officer.name}</td>
      <td>${officer.rank}</td>
      <td>${officer.division}</td>
      <td>${officer.callsign}</td>
      <td>${officer.promotionDate}</td>
      <td>
        <select onchange="officerList[${i}].strikes=this.value">
          <option ${officer.strikes==="None"?"selected":""}>None</option>
          <option ${officer.strikes==="1"?"selected":""}>1</option>
          <option ${officer.strikes==="2"?"selected":""}>2</option>
          <option ${officer.strikes==="3"?"selected":""}>3</option>
        </select>
      </td>
      <td>
        <select onchange="officerList[${i}].status=this.value">
          <option ${officer.status==="Active"?"selected":""}>Active</option>
          <option ${officer.status==="LOA"?"selected":""}>LOA</option>
          <option ${officer.status==="Vacant"?"selected":""}>Vacant</option>
        </select>
      </td>
      <td><button onclick="deleteOfficer(${i})">Delete</button></td>
    `;
    tbody.appendChild(row);
  });
}

window.onload = function() {
  const filter = document.getElementById("filterDivision");
  for (let div in divisions) {
    const opt = document.createElement("option");
    opt.value = div;
    opt.textContent = div;
    filter.appendChild(opt);
  }
  renderRoster();
}