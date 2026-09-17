const CSV_URL =
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vQHyhDdtefbT2TLzH5XxOv-BuhCou8HrzMtygu2bn6YKyYmXKJirAICAj_GOqeroc4wszw-q4AA_4_m/pub?gid=1227661950&single=true&output=csv";

let countries = [];


/* =========================
   LOAD CSV
========================= */

async function loadStatistics() {

    try {

        const response = await fetch(
            CSV_URL + "&t=" + Date.now(),
            {
                cache: "no-store"
            }
        );

        if (!response.ok) {
            throw new Error("Unable to load statistics.");
        }

        const csvText = await response.text();

        console.log("RAW CSV:");
        console.log(csvText);

        parseCSV(csvText);

    } catch (error) {

        console.error(error);

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
   CLEAN CSV CELL
========================= */

function cleanCell(value) {

    return value
        .replace(/^"|"$/g, "")
        .trim();

}


/* =========================
   PARSE CSV
========================= */

function parseCSV(csvText) {

    const lines = csvText
        .trim()
        .split(/\r?\n/);

    countries = [];

    let countrySectionStarted = false;

    let totalFound = false;


    for (let i = 0; i < lines.length; i++) {

        const line = lines[i].trim();

        if (!line) {
            continue;
        }


        const parts = line.split(",");

        const firstCell =
            cleanCell(parts[0] || "");

        const secondCell =
            cleanCell(parts[1] || "");


        /* =========================
           TOTAL SOMSOMS
        ========================= */

        if (
            firstCell.toLowerCase() ===
            "total somsoms"
        ) {

            /*
             * Google Sheets may publish:
             *
             * Total Somsoms
             * 1
             *
             * instead of:
             *
             * Total Somsoms,1
             */

            let totalValue = Number(secondCell);


            if (
                !secondCell ||
                isNaN(totalValue)
            ) {

                for (
                    let j = i + 1;
                    j < lines.length;
                    j++
                ) {

                    const nextLine =
                        lines[j].trim();

                    if (!nextLine) {
                        continue;
                    }

                    const nextParts =
                        nextLine.split(",");

                    const possibleTotal =
                        cleanCell(
                            nextParts[0] || ""
                        );

                    if (
                        possibleTotal !== "" &&
                        !isNaN(
                            Number(possibleTotal)
                        )
                    ) {

                        totalValue =
                            Number(possibleTotal);

                        break;
                    }

                    break;
                }
            }


            if (!isNaN(totalValue)) {

                document.getElementById(
                    "total"
                ).textContent =
                    totalValue.toLocaleString();

                totalFound = true;
            }


            continue;
        }


        /* =========================
           COUNTRY HEADER
        ========================= */

        if (
            firstCell.toLowerCase() === "country" &&
            secondCell.toLowerCase() === "participants"
        ) {

            countrySectionStarted = true;

            continue;
        }


        /* =========================
           IGNORE EVERYTHING
           BEFORE COUNTRY HEADER
        ========================= */

        if (!countrySectionStarted) {
            continue;
        }


        /* =========================
           COUNTRY ROW
        ========================= */

        /*
         * A valid country row MUST:
         *
         * 1. Have exactly 2 columns
         * 2. Have country name
         * 3. Have numeric participant count
         */

        if (parts.length !== 2) {
            continue;
        }


        const country =
            firstCell;

        const participants =
            Number(secondCell);


        if (!country) {
            continue;
        }


        if (isNaN(participants)) {
            continue;
        }


        /*
         * Extra protection:
         * Never allow summary labels
         * to enter the country list.
         */

        if (
            country.toLowerCase() ===
            "total somsoms"
        ) {
            continue;
        }


        if (
            country.toLowerCase() ===
            "country"
        ) {
            continue;
        }


        countries.push({
            country: country,
            participants: participants
        });

    }


    /* =========================
       TOTAL FALLBACK
    ========================= */

    if (!totalFound) {

        document.getElementById(
            "total"
        ).textContent = "0";

    }


    displayCountries();

}


/* =========================
   DISPLAY COUNTRIES
========================= */

function displayCountries() {

    const sortType =
        document.getElementById(
            "sortSelect"
        ).value;


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

    if (
        sortedCountries.length === 0
    ) {

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
       CREATE ROWS
    ========================= */

    sortedCountries.forEach(
        item => {

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


            row.appendChild(
                countryCell
            );


            row.appendChild(
                participantCell
            );


            table.appendChild(row);

        }
    );

}


/* =========================
   SORT
========================= */

document
    .getElementById("sortSelect")
    .addEventListener(
        "change",
        displayCountries
    );


/* =========================
   START
========================= */

loadStatistics();
