

const core = document.getElementById("main");
function getCurrentDate() {

    const currentDate = new Date();

    const month = new Intl.DateTimeFormat('en-US', { month: '2-digit' }).format(currentDate);
    const day = new Intl.DateTimeFormat('en-US', { day: '2-digit' }).format(currentDate);


    return `${month}-${day}`
}

async function fetchData() {
    core.style.visibility = 'hidden';
    const date = new Date();

    const res = await fetch(`https://covid-api.com/api/reports?date=2021-${getCurrentDate()}&iso=EGY`);


    if (res != null) {

        core.style.visibility = 'visible';
        const record = await res.json();

        const data = record.data[0];
        console.log(data);

        document.getElementById("country").innerHTML = data.region.name;
        document.getElementById("date").value = data.date;


        document.getElementById("active").value = data.active;
        document.getElementById("active_diff").value = data.active_diff;

        document.getElementById("death").value = data.deaths;
        document.getElementById("death_diff").value = data.deaths_diff;

        document.getElementById("confirmed").value = data.confirmed;
        document.getElementById("confirmed_diff").value = data.confirmed_diff;


    }

}
fetchData();