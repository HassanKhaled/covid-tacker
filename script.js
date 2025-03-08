
function getCurrentDate() {

    const currentDate = new Date();

    const month = new Intl.DateTimeFormat('en-US', { month: '2-digit' }).format(currentDate);
    const day = new Intl.DateTimeFormat('en-US', { day: '2-digit' }).format(currentDate);

    console.log(`Current Date: ${month}-${day}`);
    return `${month}-${day}`
}

async function fetchData() {
    const date = new Date();

    const res = await fetch(`https://covid-api.com/api/reports?date=2021-${getCurrentDate()}&iso=EGY`);

    const record = await res.json();

    const data = record.data[0];


    document.getElementById("country").innerHTML = data.region.name;

    document.getElementById("date").value = data.date;
    document.getElementById("active").value = data.active;
    document.getElementById("deathNew").value = data.deaths;
    document.getElementById("confirmed").value = data.confirmed;


}
fetchData();