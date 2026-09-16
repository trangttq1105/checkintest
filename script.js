```javascript
/* =========================================
   SOMSOM REGISTRATION TOOL
   Prototype
   ========================================= */


/* COUNTRY → TRENDING STRATEGY */

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


/* =========================================
   GET ELEMENTS
   ========================================= */

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


/* =========================================
   CHECK JAVASCRIPT
   ========================================= */

console.log("Somsom Registration script loaded successfully.");


/* =========================================
   LOAD DATA
   ========================================= */

let registrations = {};

try {

    registrations =
        JSON.parse(
            localStorage.getItem(
                "somsomRegistrations"
            )
        ) || {};

} catch (error) {

    console.error(
        "Could not load registration data:",
        error
    );

    registrations = {};
}


/* =========================================
   SAVE DATA
   ========================================= */

function saveData() {

    localStorage.setItem(
        "somsomRegistrations",
        JSON.stringify(registrations)
    );

}


/* =========================================
   TOTAL REGISTRATIONS
   ========================================= */

function getTotalRegistrations() {

    let total = 0;

    Object.values(registrations).forEach(
        function(count) {

            total += Number(count);

        }
    );

    return total;

}


/* =========================================
   UPDATE TOTAL
   ========================================= */

function updateTotal() {

    totalCount.textContent =
        getTotalRegistrations();

}


/* =========================================
   DISPLAY COUNTRY LIST
   ========================================= */

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


    /* A-Z */

    if (currentSort === "alphabetical") {

        countries.sort(
            function(a, b) {

                return a[0].localeCompare(b[0]);

            }
        );

    }


    /* MOST JOINED */

    else {

        countries.sort(
            function(a, b) {

                return b[1] - a[1];

            }
        );

    }


    countries.forEach(
        function(item) {

            const country = item[0];
            const count = item[1];


            const row =
                document.createElement("div");

            row.className =
                "country-row";


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


/* =========================================
   CONFIRM BUTTON
   ========================================= */

confirmButton.addEventListener(
    "click",
    function() {

        console.log("Confirm button clicked.");


        const country =
            countrySelect.value;


        console.log(
            "Selected country:",
            country
        );


        /* CHECK COUNTRY */

        if (!country) {

            errorMessage.textContent =
                "Please select your country or region.";

            return;

        }


        errorMessage.textContent = "";


        /* CREATE COUNTRY */

        if (
            !Object.prototype.hasOwnProperty.call(
                registrations,
                country
            )
        ) {

            registrations[country] = 0;

        }


        /* ADD REGISTRATION */

        registrations[country] =
            Number(registrations[country]) + 1;


        /* PERSONAL NUMBER */

        const personalNumber =
            registrations[country];


        console.log(
            "Registration number:",
            personalNumber
        );


        /* SAVE */

        saveData();


        /* GET STRATEGY */

        const strategy =
            countryStrategies[country] ||
            countryStrategies["Other"];


        /* SHOW PERSONAL RESULT */

        personalResult.textContent =
            `You are Somsom #${personalNumber} from ${country}.`;


        strategyName.textContent =
            strategy.name;


        strategyLink.href =
            strategy.link;


        /* SHOW RESULT CARD */

        personalSection.classList.remove(
            "hidden"
        );


        /* UPDATE STATISTICS */

        updateTotal();

        renderCountries();


        /* SCROLL */

        personalSection.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    }
);


/* =========================================
   SORT A-Z
   ========================================= */

sortAlphabetical.addEventListener(
    "click",
    function() {

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


/* =========================================
   SORT MOST JOINED
   ========================================= */

sortCount.addEventListener(
    "click",
    function() {

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


/* =========================================
   INITIALIZE
   ========================================= */

updateTotal();

renderCountries();
```
