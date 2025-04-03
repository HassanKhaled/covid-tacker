
const search = document.getElementById("query");
const core = document.getElementById("main");
let loader = document.getElementById("loader");
let dateQuery = document.getElementById("date");
const searchBtn = document.getElementById("search-btn");

let countrySelect = document.getElementById("countrySelect");
let provinceSelect = document.getElementById("provinceSelect");
let flagImage = document.getElementById("flag");



core.style.visibility = 'hidden';
search.style.visibility = 'hidden';
loader.style.display = 'none';

const date = new Date();

function flagByIso(iso){

  flagImage.src = `https://flagsapi.com/${iso}/shiny/64.png`;
}

function fromAlpha3toApha2(iso){

  return iso.substring(0, 2).toUpperCase();

}

dateQuery.value = `2021-${getCurrentDate()}`;


searchBtn.addEventListener('click',function(){

    fetchData();
})

countrySelect.addEventListener('change', function(){
  provinceSelect.innerHTML = "";
 // document.getElementById("country").innerHTML = countrySelect.text;
  document.getElementById("country").innerHTML  = countrySelect.options[countrySelect.selectedIndex].text;
  flagByIso(fromAlpha3toApha2(countrySelect.value));
  fillProvinceSelect(countrySelect.value);

});

function getCurrentDate() {

    const currentDate = new Date();

    const month = new Intl.DateTimeFormat('en-US', { month: '2-digit' }).format(currentDate);
    const day = new Intl.DateTimeFormat('en-US', { day: '2-digit' }).format(currentDate);


    return `${month}-${day}`
}

async function getProvincesByCountryIso(iso){

  let results = await fetch(`https://covid-api.com/api/provinces?iso=${iso}`);
  const record = await results.json();
  return record.data;
}

async function getCountryStatics(iso , province){
let res = null;
let record = null

  if (province == "") {
  res = await fetch(`https://covid-api.com/api/reports?date=${dateQuery.value}&iso=${iso}`);
  record = await res.json();
  }else{
  res = await fetch(`https://covid-api.com/api/reports?date=${dateQuery.value}&iso=${iso}&region_province=${province}`);
  record = await res.json();
  }


 return record ;
}

async function getCountries(){
  const temp = await fetch("https://covid-api.com/api/regions");

    const countries = await temp.json();
   
return countries.data;
}


async function fillCountriesSelect(){

    let countries = await getCountries();


    for (element in countries) {

        var opt = document.createElement("option");

        opt.value = countries[element].iso;
        opt.innerHTML = countries[element].name; 
        countrySelect.appendChild(opt);

    }

  fillProvinceSelect(countrySelect.value);
  flagByIso(fromAlpha3toApha2(countrySelect.value));
}

// AND , AGO , ATG , ARM , ABW , AUT , BHS , BGD , BRB
async function fillProvinceSelect(iso) {

  let provinces = await getProvincesByCountryIso(iso);
 
  if (provinces.length>=2){
    provinceSelect.style.pointerEvents = 'auto';
  

  for (element in provinces) {

    var opt = document.createElement("option");

    if ( provinces[element].province!=""){
      console.log(`element = ${provinces[element].province}`);
    opt.value = provinces[element].province;
    opt.innerHTML = provinces[element].province; // whatever property it has

    // then append it to the select element
    provinceSelect.appendChild(opt);
    }

  }
}else{
    provinceSelect.style.pointerEvents = 'none';
 
}
 
  provinceSelect.selectedIndex = 0;
}


 fillCountriesSelect();

function fillElementByRequest(id, data,attr){
    document.getElementById(id).value = data[attr];

}

function toggledisplay(elem){

  elem.style.visibility = elem.style.visibility == 'block' ? 'none' : 'block'; 

}

async function fetchData() {
   
  const record = await getCountryStatics(countrySelect.value,provinceSelect.value);

  toggledisplay(loader);

  if (record.data.length!=0) {
   

    core.style.visibility = 'visible';
    toggledisplay(loader);

      

        const data = record.data[0];
    let country = data["region"].name;

    document.getElementById("country").innerHTML = country;
   

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

