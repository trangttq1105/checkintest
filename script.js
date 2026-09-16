```javascript
/* =========================================
   SOMSOM REGISTRATION TOOL
   Prototype version
   ========================================= */


/* -----------------------------------------
   COUNTRY SETTINGS
   ----------------------------------------- */

const countryStrategies = {

    "Australia": {
        name: "PLAN 1",
        link: "#"
    },

    "Canada": {
        name: "PLAN 1",
        link: "#"
    },

    "China": {
        name: "PLAN 2",
        link: "#"
    },

    "France": {
        name: "PLAN 3",
        link: "#"
    },

    "Germany": {
        name: "PLAN 3",
        link: "#"
    },

    "Hong Kong": {
        name: "PLAN 2",
        link: "#"
    },

    "Indonesia": {
        name: "PLAN 1",
        link: "#"
    },

    "Japan": {
        name: "PLAN 2",
        link: "#"
    },

    "Malaysia": {
        name: "PLAN 1",
        link: "#"
    },

    "Philippines": {
        name: "PLAN 1",
        link: "#"
    },

    "Singapore": {
        name: "PLAN 1",
        link: "#"
    },

    "South Korea": {
        name: "PLAN 2",
        link: "#"
    },

    "Taiwan": {
        name: "PLAN 2",
        link: "#"
    },

    "Thailand": {
        name: "PLAN 2",
        link: "#"
    },

    "United Kingdom": {
        name: "PLAN 3",
        link: "#"
    },

    "United States": {
        name: "PLAN 3",
        link: "#"
    },

    "Vietnam": {
        name: "PLAN 1",
        link: "#"
    },

    "Other": {
        name: "PLAN 1",
        link: "#"
    }
};


/* -----------------------------------------
   ELEMENTS
   ----------------------------------------- */

const countrySelect =
    document.getElementById("countrySelect");

const confirmButton =
    document.getElementById("confirmButton");

const errorMessage =
    document.getElementById("errorMessage");

const personalSection =
    document.getElementById("personalSection");

const personalResult =
    document.getElementById("personalResult");

const strategyName =
    document.getElementById("strategyName");

const strategyLink =
    document.getElementById("strategyLink");

const totalCount =
    document.getElementById("totalCount");

const countryList =
    document.getElementById("countryList");

const sortAlphabetical =
    document.getElementById("sortAlphabetical");

const sortCount =
    document.getElementById("sortCount");


/* -----------------------------------------
   DATA
   ----------------------------------------- */

let registrations =
    JSON.parse(
        localStorage.getItem("somsomRegistrations")
    ) || {};


/* -----------------------------------------
   SAVE DATA
   ----------------------------------------- */

function saveData() {

    localStorage.setItem(
        "somsomRegistrations",
        JSON.stringify(registrations)
    );
}


/* -----------------------------------------
   TOTAL
   ----------------------------------------- */

function getTotalRegistrations() {

    return Object.values(registrations)
        .reduce(
            (total, count) => total + count,
            0
        );
}


/* -----------------------------------------
   UPDATE TOTAL
   ----------------------------------------- */

function updateTotal() {

    totalCount.textContent =
        getTotalRegistrations();
}


/* -----------------------------------------
   DISPLAY COUNTRIES
   ----------------------------------------- */

let currentSort = "alphabetical";


function renderCountries() {

    countryList.innerHTML = "";

    let countries =
        Object.entries(registrations);


    if (countries.length === 0) {

        countryList.innerHTML = `
            <p class="empty-message">
                No registrations yet.
            </p>
        `;

        return;
    }


    if (currentSort === "alphabetical") {

        countries.sort(
            (a, b) =>
                a[0].localeCompare(b[0])
        );

    } else {

        countries.sort(
            (a, b) => b[1] - a[1]
        );
    }


    countries.forEach(
        ([country, count]) => {

            const row =
                document.createElement("div");

            row.className = "country-row";

            row.innerHTML = `
                <span class="country-name">
                    ${country}
                </span>

                <span class="country-count">
                    ${count}
                </span>
            `;

            countryList.appendChild(row);
        }
    );
}


/* -----------------------------------------
   CONFIRM REGISTRATION
   ----------------------------------------- */

confirmButton.addEventListener(
    "click",
    function () {

        const country =
            countrySelect.value;


        /* Validation */

        if (!country) {

            errorMessage.textContent =
                "Please select your country or region.";

            return;
        }


        errorMessage.textContent = "";


        /* Create country if needed */

        if (!registrations[country]) {

            registrations[country] = 0;
        }


        /* Add one registration */

        registrations[country]++;


        /* Number within this country */

        const personalNumber =
            registrations[country];


        /* Save */

        saveData();


        /* Get strategy */

        const strategy =
            countryStrategies[country] ||
            countryStrategies["Other"];


        /* Display personal result */

        personalResult.textContent =
            `You are Somsom #${personalNumber} from ${country}.`;


        strategyName.textContent =
            strategy.name;


        strategyLink.href =
            strategy.link;


        /* Show personal section */

        personalSection.classList.remove(
            "hidden"
        );


        /* Update statistics */

        updateTotal();

        renderCountries();


        /* Scroll to result */

        personalSection.scrollIntoView({
            behavior: "smooth"
        });

    }
);


/* -----------------------------------------
   SORT BUTTONS
   ----------------------------------------- */

sortAlphabetical.addEventListener(
    "click",
    function () {

        currentSort = "alphabetical";

        sortAlphabetical.classList.add(
            "active"
        );

        sortCount.classList.remove(
            "active"
        );

        renderCountries();
    }
);


sortCount.addEventListener(
    "click",
    function () {

        currentSort = "count";

        sortCount.classList.add(
            "active"
        );

        sortAlphabetical.classList.remove(
            "active"
        );

        renderCountries();
    }
);


/* -----------------------------------------
   INITIAL LOAD
   ----------------------------------------- */

updateTotal();

renderCountries();
```
