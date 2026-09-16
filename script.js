/* =====================================================
   DEMO SOMSOM DATA

   This is temporary data for testing only.
   We will replace this with a real database later.
===================================================== */

const somsomsData = {

    "Indonesia": 10,
    "Japan": 5,
    "Malaysia": 7,
    "Philippines": 15,
    "Thailand": 35,
    "Vietnam": 2

};


/* =====================================================
   COUNTRY LIST
===================================================== */

const countries = [
    "Afghanistan",
    "Albania",
    "Algeria",
    "Argentina",
    "Australia",
    "Austria",
    "Bangladesh",
    "Belgium",
    "Brazil",
    "Brunei",
    "Cambodia",
    "Canada",
    "Chile",
    "China",
    "Colombia",
    "Croatia",
    "Czech Republic",
    "Denmark",
    "Egypt",
    "Finland",
    "France",
    "Germany",
    "Greece",
    "Hong Kong",
    "Hungary",
    "India",
    "Indonesia",
    "Ireland",
    "Israel",
    "Italy",
    "Japan",
    "Laos",
    "Malaysia",
    "Mexico",
    "Myanmar",
    "Nepal",
    "Netherlands",
    "New Zealand",
    "Norway",
    "Pakistan",
    "Peru",
    "Philippines",
    "Poland",
    "Portugal",
    "Romania",
    "Russia",
    "Saudi Arabia",
    "Singapore",
    "South Africa",
    "South Korea",
    "Spain",
    "Sweden",
    "Switzerland",
    "Taiwan",
    "Thailand",
    "Turkey",
    "Ukraine",
    "United Arab Emirates",
    "United Kingdom",
    "United States",
    "Vietnam"
];


/* =====================================================
   ELEMENTS
===================================================== */

const countrySelect =
    document.getElementById("countrySelect");

const confirmButton =
    document.getElementById("confirmButton");

const errorMessage =
    document.getElementById("errorMessage");

const results =
    document.getElementById("results");

const personalResult =
    document.getElementById("personalResult");

const totalSomsoms =
    document.getElementById("totalSomsoms");

const countryList =
    document.getElementById("countryList");

const sortSelect =
    document.getElementById("sortSelect");


/* =====================================================
   LOAD COUNTRY DROPDOWN
===================================================== */

countries.forEach(country => {

    const option =
        document.createElement("option");

    option.value = country;

    option.textContent = country;

    countrySelect.appendChild(option);

});


/* =====================================================
   GET TOTAL SOMSOMS
===================================================== */

function getTotalSomsoms() {

    return Object.values(somsomsData)
        .reduce(
            (total, count) => total + count,
            0
        );

}


/* =====================================================
   ORDINAL NUMBER

   1st
   2nd
   3rd
   4th
   21st
   22nd
   23rd
===================================================== */

function getOrdinal(number) {

    const lastTwo =
        number % 100;

    if (
        lastTwo >= 11 &&
        lastTwo <= 13
    ) {
        return number + "th";
    }


    switch (number % 10) {

        case 1:
            return number + "st";

        case 2:
            return number + "nd";

        case 3:
            return number + "rd";

        default:
            return number + "th";

    }

}


/* =====================================================
   RENDER COUNTRY LIST
===================================================== */

function renderCountryList(sortType) {

    let entries =
        Object.entries(somsomsData);


    /* Alphabetical */

    if (sortType === "alphabetical") {

        entries.sort(
            (a, b) =>
                a[0].localeCompare(b[0])
        );

    }


    /* Most Somsoms */

    if (sortType === "count") {

        entries.sort(
            (a, b) => b[1] - a[1]
        );

    }


    countryList.innerHTML = "";


    entries.forEach(
        ([country, count]) => {

            const item =
                document.createElement("div");

            item.className =
                "country-item";


            const countryName =
                document.createElement("span");

            countryName.className =
                "country-name";

            countryName.textContent =
                country;


            const countryCount =
                document.createElement("span");

            countryCount.className =
                "country-count";

            countryCount.textContent =
                count;


            item.appendChild(countryName);

            item.appendChild(countryCount);

            countryList.appendChild(item);

        }
    );

}


/* =====================================================
   CONFIRM
===================================================== */

confirmButton.addEventListener(
    "click",
    () => {

        const selectedCountry =
            countrySelect.value;


        /* No country */

        if (!selectedCountry) {

            errorMessage.textContent =
                "Please select your country or region.";

            results.classList.add("hidden");

            return;

        }


        errorMessage.textContent = "";


        /*
            DEMO LOGIC

            If the country already exists:
            current count + 1

            If it doesn't exist:
            user is the 1st Somsom.
        */

        const currentCount =
            somsomsData[selectedCountry] || 0;


        const userNumber =
            currentCount + 1;


        /* Personal result */

        personalResult.textContent =
            `You are the ${getOrdinal(userNumber)} Somsom from ${selectedCountry}.`;


        /*
            Demo only:
            We temporarily add the user
            to the displayed statistics.
        */

        somsomsData[selectedCountry] =
            userNumber;


        /* Total */

        totalSomsoms.textContent =
            getTotalSomsoms();


        /* Country list */

        renderCountryList(
            sortSelect.value
        );


        /* Show results */

        results.classList.remove(
            "hidden"
        );


        /* Scroll */

        setTimeout(() => {

            results.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }, 100);

    }
);


/* =====================================================
   SORT
===================================================== */

sortSelect.addEventListener(
    "change",
    () => {

        renderCountryList(
            sortSelect.value
        );

    }
);
