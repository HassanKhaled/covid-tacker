

const core = document.getElementById("main");
let loader = document.getElementById("loader");
let dateQuery = document.getElementById("date");
const searchBtn = document.getElementById("search-btn");
let newSelect = document.getElementById("countrySelect");
core.style.visibility = 'hidden';
loader.style.display = 'none';

const date = new Date();

function test(){


}

test();

dateQuery.value = `2021-${getCurrentDate()}`;


searchBtn.addEventListener('click',function(){

    fetchData();
})



function getCurrentDate() {

    const currentDate = new Date();

    const month = new Intl.DateTimeFormat('en-US', { month: '2-digit' }).format(currentDate);
    const day = new Intl.DateTimeFormat('en-US', { day: '2-digit' }).format(currentDate);


    return `${month}-${day}`
}

async function getProvincesByCountryIso(iso){
/*
  const res = await fetch(`https://covid-api.com/api/reports?date=${dateQuery.value}&iso=${iso}`);
  const record = await res.json();

  return record;*/
  let results = await fetch(`https://covid-api.com/api/provinces?iso=${iso}`);
  const record = await results.json();
  return record.data;
}

async function getCountryStatics(iso){

  const res = await fetch(`https://covid-api.com/api/reports?date=${dateQuery.value}&iso=${iso}`);
 const record = await res.json();

 return record ;
}

async function getCountries(){
  const temp = await fetch("https://covid-api.com/api/regions");

    const countries = await temp.json();
   
return countries.data;
}


async function fillCountriesSelect(){

    let countries = await getCountries();
    newSelect = document.getElementById("countrySelect");


    for (element in countries) {

        var opt = document.createElement("option");

        opt.value = countries[element].iso;
        opt.innerHTML = countries[element].name; 
        newSelect.appendChild(opt);

    }

  fillProvinceSelect(newSelect.value);

}


async function fillProvinceSelect(iso) {

  let provinces = await getProvincesByCountryIso(iso);
  newSelect = document.getElementById("provinceSelect");

console.log(provinces);
  for (element in provinces) {

    var opt = document.createElement("option");

    opt.value = provinces[element].iso;
    opt.innerHTML = provinces[element].province; // whatever property it has

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
   

  const record = await getCountryStatics(newSelect.value);

  
  toggledisplay(loader);

  if (record != null) {

     core.style.visibility = 'visible';
    toggledisplay(loader);

      

        const data = record.data[0];
       

        document.getElementById("country").innerHTML = data["region"].name;

      dateQuery.value = data["date"];

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


