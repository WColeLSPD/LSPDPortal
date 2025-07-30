
document.getElementById("searchInput").addEventListener("input", filterRoster);
document.getElementById("divisionFilter").addEventListener("change", filterRoster);
document.getElementById("rankFilter").addEventListener("change", filterRoster);

function addOfficer() {
    const table = document.getElementById("rosterBody");
    const row = document.createElement("tr");

    ["", "", "", ""].forEach((val, index) => {
        const td = document.createElement("td");
        const input = document.createElement("input");
        input.type = "text";
        input.placeholder = ["Callsign", "Name", "Rank", "Division"][index];
        td.appendChild(input);
        row.appendChild(td);
    });

    const actionTd = document.createElement("td");
    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "Delete";
    deleteBtn.onclick = () => row.remove();
    actionTd.appendChild(deleteBtn);
    row.appendChild(actionTd);

    table.appendChild(row);
}

function filterRoster() {
    const searchValue = document.getElementById("searchInput").value.toLowerCase();
    const divisionValue = document.getElementById("divisionFilter").value.toLowerCase();
    const rankValue = document.getElementById("rankFilter").value.toLowerCase();

    document.querySelectorAll("#rosterBody tr").forEach(row => {
        const cells = row.querySelectorAll("td");
        const name = cells[1]?.innerText.toLowerCase() || "";
        const callsign = cells[0]?.innerText.toLowerCase() || "";
        const rank = cells[2]?.innerText.toLowerCase() || "";
        const division = cells[3]?.innerText.toLowerCase() || "";

        const matchesSearch = name.includes(searchValue) || callsign.includes(searchValue);
        const matchesDivision = divisionValue === "" || division.includes(divisionValue);
        const matchesRank = rankValue === "" || rank.includes(rankValue);

        row.style.display = matchesSearch && matchesDivision && matchesRank ? "" : "none";
    });
}
