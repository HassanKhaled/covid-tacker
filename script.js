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
    const res = await fetch("https://covid-api.com/api/reports/total");
    const record = await res.json();

    document.getElementById("date").value = record.data.date;
    document.getElementById("areaName").value = record.data.active;
    document.getElementById("latestBy").value = record.data.deaths;
    document.getElementById("deathNew").value = record.data.confirmed;


    // document.getElementById("date").innerHTML = "12-9-2025";
    // document.getElementById("areaName").innerHTML = "Egypt";
    // document.getElementById("latestBy").innerHTML = "202365";
    // document.getElementById("deathNew").innerHTML = "985";

}
fetchData();