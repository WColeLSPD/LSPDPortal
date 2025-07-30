let officers = JSON.parse(localStorage.getItem("officers")) || [];

function renderTable() {
    const tbody = document.querySelector("#rosterTable tbody");
    tbody.innerHTML = "";

    const filterDivision = document.getElementById("filterDivision").value;
    const filterRank = document.getElementById("filterRank").value;

    const uniqueDivisions = new Set();
    const uniqueRanks = new Set();

    officers.forEach((officer, index) => {
        uniqueDivisions.add(officer.division);
        uniqueRanks.add(officer.rank);

        if ((filterDivision && officer.division !== filterDivision) ||
            (filterRank && officer.rank !== filterRank)) {
            return;
        }

        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${officer.name}</td>
            <td>${officer.rank}</td>
            <td>${officer.division}</td>
            <td><button onclick="deleteOfficer(${index})">Delete</button></td>
        `;
        tbody.appendChild(row);
    });

    updateFilters(uniqueDivisions, uniqueRanks);
    localStorage.setItem("officers", JSON.stringify(officers));
}

function updateFilters(divisions, ranks) {
    const divSelect = document.getElementById("filterDivision");
    const rankSelect = document.getElementById("filterRank");

    divSelect.innerHTML = '<option value="">All</option>';
    ranks.forEach(rank => {
        if (!Array.from(rankSelect.options).some(opt => opt.value === rank)) {
            rankSelect.innerHTML += `<option value="${rank}">${rank}</option>`;
        }
    });

    divisions.forEach(div => {
        if (!Array.from(divSelect.options).some(opt => opt.value === div)) {
            divSelect.innerHTML += `<option value="${div}">${div}</option>`;
        }
    });
}

function addOfficer() {
    const name = document.getElementById("name").value;
    const rank = document.getElementById("rank").value;
    const division = document.getElementById("division").value;

    officers.push({ name, rank, division });
    renderTable();

    document.getElementById("addOfficerForm").reset();
}

function deleteOfficer(index) {
    officers.splice(index, 1);
    renderTable();
}

function filterTable() {
    renderTable();
}

window.onload = renderTable;
