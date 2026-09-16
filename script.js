```javascript
const CSV_URL =
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vQHyhDdtefbT2TLzH5XxOv-BuhCou8HrzMtygu2bn6YKyYmXKJirAICAj_GOqeroc4wszw-q4AA_4_m/pub?gid=1227661950&single=true&output=csv";

let countries = [];


async function loadStatistics() {

    try {

        const response = await fetch(CSV_URL, {
            cache: "no-store"
        });

        if (!response.ok) {
            throw new Error("Unable to load statistics.");
        }

        const csvText = await response.text();

        console.log("CSV DATA:", csvText);

        parseCSV(csvText);

    } catch (error) {

        console.error("ERROR:", error);

        document.getElementById("total").textContent =
            "Unable to load";

        document.getElementById("countryTable").innerHTML = `
            <tr>
                <td colspan="2">
                    Unable to load statistics.
                </td>
            </tr>
        `;
    }
}


/* =========================
   PARSE CSV
========================= */

function parseCSV(csvText) {

    const lines = csvText
        .trim()
        .split(/\r?\n/);

    countries = [];

    let readingCountries = false;


    for (let i = 0; i < lines.length; i++) {

        const line = lines[i].trim();

        if (!line) continue;


        const parts = line.split(",");


        /* =========================
           TOTAL SOMSOMS
        ========================= */

        if (
            parts[0]
                ?.replace(/^"|"$/g, "")
                .trim()
                .toLowerCase() === "total somsoms"
        ) {

            const totalValue = Number(
                parts[1]
                    ?.replace(/^"|"$/g, "")
                    .trim()
            );

            if (!isNaN(totalValue)) {

                document.getElementById("total").textContent =
                    totalValue.toLocaleString();

            }

            continue;
        }


        /* =========================
           COUNTRY HEADER
        ========================= */

        if (
            parts[0]
                ?.replace(/^"|"$/g, "")
                .trim()
                .toLowerCase() === "country"
        ) {

            readingCountries = true;

            continue;
        }


        /* =========================
           COUNTRY DATA
        ========================= */

        if (!readingCountries) {
            continue;
        }


        if (parts.length < 2) {
            continue;
        }


        const country =
            parts[0]
                .replace(/^"|"$/g, "")
                .trim();


        const participants =
            Number(
                parts[1]
                    .replace(/^"|"$/g, "")
                    .trim()
            );


        if (
            country &&
            !isNaN(participants)
        ) {

            countries.push({
                country: country,
                participants: participants
            });

        }

    }


    displayCountries();
}


/* =========================
   DISPLAY COUNTRIES
========================= */

function displayCountries() {

    const sortType =
        document.getElementById("sortSelect").value;


    let sortedCountries =
        [...countries];


    /* =========================
       SORT BY PARTICIPANTS
    ========================= */

    if (sortType === "count") {

        sortedCountries.sort(
            (a, b) =>
                b.participants -
                a.participants
        );

    }


    /* =========================
       SORT A-Z
    ========================= */

    else {

        sortedCountries.sort(
            (a, b) =>
                a.country.localeCompare(
                    b.country
                )
        );

    }


    const table =
        document.getElementById(
            "countryTable"
        );


    table.innerHTML = "";


    /* =========================
       NO DATA
    ========================= */

    if (sortedCountries.length === 0) {

        table.innerHTML = `
            <tr>
                <td colspan="2">
                    No registrations yet.
                </td>
            </tr>
        `;

        return;
    }


    /* =========================
       CREATE COUNTRY ROWS
    ========================= */

    sortedCountries.forEach(item => {

        const row =
            document.createElement("tr");


        const countryCell =
            document.createElement("td");


        const participantCell =
            document.createElement("td");


        countryCell.textContent =
            item.country;


        participantCell.textContent =
            item.participants.toLocaleString();


        row.appendChild(countryCell);

        row.appendChild(
            participantCell
        );


        table.appendChild(row);

    });

}


/* =========================
   SORT SELECT
========================= */

document
    .getElementById("sortSelect")
    .addEventListener(
        "change",
        displayCountries
    );


/* =========================
   LOAD
========================= */

loadStatistics();
```
