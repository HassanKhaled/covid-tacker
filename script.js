const extensions = 'https://developer.chrome.com/docs/extensions';
const webstore = 'https://developer.chrome.com/docs/webstore';

chrome.runtime.onInstalled.addListener(() => {
    chrome.action.setBadgeText({
        text: "OFF",
    });
});



chrome.action.onClicked.addListener(async (tab) => {
    if (tab.url.startsWith(extensions) || tab.url.startsWith(webstore)) {
        // Retrieve the action badge to check if the extension is 'ON' or 'OFF'
        const prevState = await chrome.action.getBadgeText({ tabId: tab.id });
        // Next state will always be the opposite
        const nextState = prevState === 'ON' ? 'OFF' : 'ON';

        chrome.action.setBadgeTextColor({ color: 'white' });

        if (nextState == 'ON') {
            chrome.action.setBadgeBackgroundColor({ color: 'green' });
        } else {
            chrome.action.setBadgeBackgroundColor({ color: 'red' });
        }

        // Set the action badge to the next state
        await chrome.action.setBadgeText({
            tabId: tab.id,
            text: nextState,
        });
    }
});

async function fetchData() {
    const date = new Date();
    const month = (date.getMonth() + 1);
    const day = date.getDate();

    const res = await fetch(`https://covid-api.com/api/reports?date=2021-0${month}-0${day}&iso=EGY`);

    const record = await res.json();
    console.log(record);

    const data = record.data[0];
    console.log(data.date);

    document.getElementById("country").innerHTML = data.region.name;

    document.getElementById("date").value = data.date;
    document.getElementById("active").value = data.active;
    document.getElementById("deathNew").value = data.deaths;
    document.getElementById("confirmed").value = data.confirmed;



    /* 
    data": [
    {
    "date": "2020-04-16",
    "confirmed": 2673,
    "deaths": 196,
    "recovered": 596,
    "confirmed_diff": 168,
    "deaths_diff": 13,
    "recovered_diff": 7,
    "last_update": "2020-04-16 23:30:31",
    "active": 1881,
    "active_diff": 148,
    "fatality_rate": 0.0733,
    "region": {
    "iso": "EGY",
    "name": "Egypt",
    "province": "",
    "lat": "26.8206",
    "long": "30.8025",
    "cities": []
    }
    }
    ]
    
    
    */


    // document.getElementById("date").innerHTML = "12-9-2025";
    // document.getElementById("areaName").innerHTML = "Egypt";
    // document.getElementById("latestBy").innerHTML = "202365";
    // document.getElementById("deathNew").innerHTML = "985";

}
fetchData();