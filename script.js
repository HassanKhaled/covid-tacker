

const core = document.getElementById("main");
let loader = document.getElementById("loader");

const searchBtn = document.getElementById("search-btn");
let newSelect = document.getElementById("countrySelect");

searchBtn.addEventListener('click',function(){

    fetchData();
})

core.style.visibility = 'hidden';
loader.style.display = 'none';


const date = new Date();

function getCurrentDate() {

    const currentDate = new Date();

    const month = new Intl.DateTimeFormat('en-US', { month: '2-digit' }).format(currentDate);
    const day = new Intl.DateTimeFormat('en-US', { day: '2-digit' }).format(currentDate);


    return `${month}-${day}`
}

async function getCountryStatics(iso){

const res = await fetch(`https://covid-api.com/api/reports?date=2021-${getCurrentDate()}&iso=${iso}`);
const record = await res.json();
 console.log(record.data[0]);
 return record.data[0] ;
}

async function getCountries(){
  const temp = await fetch("https://covid-api.com/api/regions");

    const countries = await temp.json();
   
return countries.data;
}

function getFlagEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map(char =>  127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

async function fillCountriesSelect(){

    let countries = await getCountries();
    newSelect = document.getElementById("countrySelect");


    for (element in countries) {

        var opt = document.createElement("option");

        opt.value = countries[element].iso;
        opt.innerHTML = countries[element].name; // whatever property it has

        // then append it to the select element
        newSelect.appendChild(opt);

    }
}

 fillCountriesSelect();

function fillElementByRequest(id, data,attr){
    document.getElementById(id).value = data[attr];

}

function toggledisplay(elem){

  elem.style.visibility = elem.style.visibility == 'block' ? 'none' : 'block'; 

}

async function fetchData() {

  

    const res = await fetch(`https://covid-api.com/api/reports?date=2021-${getCurrentDate()}&iso=${newSelect.value}`);

  toggledisplay(loader);
  //loader.style.display = 'block';
   
  
    if (res != null) {
//toggleVisbility(core);
  core.style.visibility = 'visible';
      toggledisplay(loader);

        const record = await res.json();

        const data = record.data[0];
        console.log(data);


        document.getElementById("country").innerHTML = data["region"].name;

        document.getElementById("date").value = data["date"];

      document.title = `Covid-19 Stats- ${data["region"].name}`;

        fillElementByRequest("active",data,"active");
    
        fillElementByRequest("active_diff", data, "active_diff");
      
        fillElementByRequest("death", data, "deaths");
      
        fillElementByRequest("death_diff", data, "deaths_diff");
       
        fillElementByRequest("confirmed", data, "confirmed");
  
        fillElementByRequest("confirmed_diff", data, "confirmed_diff");
 
        fillElementByRequest("recovered", data, "recovered");

        fillElementByRequest("recovered_diff", data, "recovered_diff");
        
        fillElementByRequest("fatality_rate", data, "fatality_rate");
    }

}


