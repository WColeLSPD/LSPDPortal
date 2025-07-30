
const divisions = {
    "Command": "1L",
    "K9": "3L",
    "SWAT": "4L",
    "Traffic Enforcement": "5L",
    "Coastal": "6L",
    "Field Training": "7L",
    "Internal Affairs": "8L",
    "Air Support": "9L",
    "Criminal Investigations": "10L",
    "School Resource Officer": "11L"
};

const rankOrder = [
    "Officer", "Senior Officer", "Corporal", "Sergeant", "Lieutenant",
    "Captain", "Commander", "Deputy Chief", "Assistant Chief", "Chief of Police"
];

const callAssignments = {};
for (const [div, prefix] of Object.entries(divisions)) {
    callAssignments[div] = Array.from({length: 10}, (_, i) => `${prefix}-${String(i+1).padStart(2, '0')}`);
}

function saveRoster(roster) {
    localStorage.setItem("rosterData", JSON.stringify(roster));
}

function loadRoster() {
    return JSON.parse(localStorage.getItem("rosterData")) || [];
}

function filterRoster() {
    const selected = document.getElementById("divisionFilter").value;
    displayRoster(loadRoster().filter(off => !selected || off.division === selected));
}

function addOfficer() {
    const name = prompt("Officer Name:");
    const rank = prompt("Rank (Officer - Chief of Police):");
    const division = prompt("Division (K9, SWAT, etc):");
    const date = prompt("Promotion Date (MM/DD/YYYY):");
    const callsigns = callAssignments[division] || [];
    const roster = loadRoster();
    const assigned = roster.filter(off => off.division === division).map(off => off.callsign);
    const available = callsigns.find(c => !assigned.includes(c)) || "";

    if (!available) {
        alert("No available callsigns in this division.");
        return;
    }

    roster.push({
        name, rank, division, promotion: date,
        callsign: available, strikes: "None", status: "Active"
    });
    saveRoster(roster);
    displayRoster(roster);
}

function deleteOfficer(index) {
    const roster = loadRoster();
    roster.splice(index, 1);
    saveRoster(roster);
    displayRoster(roster);
}

function displayRoster(roster) {
    const body = document.getElementById("rosterBody");
    body.innerHTML = "";
    roster.forEach((officer, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${officer.name}</td>
            <td>${officer.rank}</td>
            <td>${officer.callsign}</td>
            <td>${officer.division}</td>
            <td>${officer.promotion}</td>
            <td>${officer.strikes}</td>
            <td>${officer.status}</td>
            <td><button onclick="deleteOfficer(${index})">Delete</button></td>
        `;
        body.appendChild(row);
    });
}

window.onload = () => displayRoster(loadRoster());
