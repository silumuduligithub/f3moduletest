const ipaddress = localStorage.getItem("ipAddress");
let pinCodeArr={};
async function fetchData(IP) {
  const response = await fetch(`https://ipapi.co/${IP}/json/`);
  const data = await response.json();
  console.log(data);
  rederDataForUpperLayer(data);
  displayMap(data);

  // give the time zone
  let timeZn = document.getElementById("timeZone");
  timeZn.innerText = " "+ data.timezone;
  
  // give the date and time from time zone
  const dt = getDate(timeZn);
  let date = document.getElementById("Date");
  date.innerText = dt;


  // set the pincode 
  let pinCode = document.getElementById("Pin");
  pinCode.innerText = data.postal;

  // number of pincode present
  const pinCodeResponse = await fetch(`https://api.postalpincode.in/pincode/${data.postal}`);
  const pinCodes = await pinCodeResponse.json();
  pinCodeArr = JSON.parse(JSON.stringify(pinCodes));
  let numberOfPincodes = document.getElementById("NumPin");
  numberOfPincodes.innerText = pinCodes[0].Message;

  generatePostOffice(pinCodes);
}
fetchData(ipaddress);
console.log(pinCodeArr);
function rederDataForUpperLayer(data) {
  let ip = document.getElementById("ipAdd");
  ip.innerText = ipaddress;

  let lt = document.getElementById("lat");
  let lon = document.getElementById("long");
  let area = document.getElementById("city");
  let organisation = document.getElementById("organ");
  let region = document.getElementById("reg");
  let hostNm = document.getElementById("host");

  lt.innerText = data.latitude;
  lon.innerText = data.longitude;
  area.innerText = data.city;
  organisation.innerText = data.org;
  region.innerText = data.region;
  hostNm.innerText = data.country_name;
}

function displayMap(data) {
  var map = L.map("map").setView([data.latitude, data.longitude], 13);

  // Add a tile layer using OpenStreetMap data
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 15,
  }).addTo(map);

  // Add a marker for the given latitude and longitude
  var marker = L.marker([data.latitude, data.longitude]).addTo(map);

  // Add a popup to the marker (optional)
  marker.bindPopup("Your Location").openPopup();
}

function getDate(timezone){
  let date = new Date().toLocaleString("en-US", timezone);
 return date;
}

function generatePostOffice(postOffices){
  let arr = postOffices[0].PostOffice;
  let obj;
  let store = document.getElementById("storage");
  for(let i = 0; i < arr.length; i++){
    if(i % 2 == 0){
      obj = document.createElement("div");
      obj.classList.add("row");
    }
    let div = document.createElement("div");
    div.classList.add("col1");
    for(let j = 0; j < 5; j++){
      let p = document.createElement("p");
      p.classList.add("font");
      let span = document.createElement("span");
      span.classList.add("font");
      switch(j){
        case 0:{
          p.innerText = "Name : ";
          span.innerText = arr[i].Name;
          p.appendChild(span)
          div.appendChild(p);
          break;
        }
        case 1:{
          p.innerText = "Branch : ";
          span.innerText = arr[i].BranchType;
          p.appendChild(span)
          div.appendChild(p);
          break;
        }
        case 2:{
          p.innerText = "Delivery Status : ";
          span.innerText = arr[i].DeliveryStatus;
          p.appendChild(span)
          div.appendChild(p);
          break;
        }
        case 3:{
          p.innerText = "District : ";
          span.innerText = arr[i].District;
          p.appendChild(span)
          div.appendChild(p);
          break;
        }
        case 4:{
          p.innerText = "Division : ";
          span.innerText = arr[i].Division;
          p.appendChild(span)
          div.appendChild(p);
          break;
        }
      }
    }
    obj.appendChild(div);
    if(i % 2 != 0){
      store.appendChild(obj);
    }
  }
  store.appendChild(obj);
}


function search(){
  let value = document.getElementById("search").value;
  let postArr = pinCodeArr[0].PostOffice;
  console.log(postArr);
  for(let i = 0; i < postArr.length; i++){
    let name =  postArr[i].Name;
    let Branch = postArr[i].BranchType;
    value = value;
    if(value == name || value == Branch){
      let store = document.getElementById("storage");
      let div = document.createElement("div");
      for(let j = 0; j < 5; j++){
        let p = document.createElement("p");
        p.classList.add("font");
        let span = document.createElement("span");
        span.classList.add("font");
        switch(j){
          case 0:{
            p.innerText = "Name : ";
            span.innerText = postArr[i].Name;
            p.appendChild(span)
            div.appendChild(p);
            break;
          }
          case 1:{
            p.innerText = "Branch : ";
            span.innerText = postArr[i].BranchType;
            p.appendChild(span)
            div.appendChild(p);
            break;
          }
          case 2:{
            p.innerText = "Delivery Status : ";
            span.innerText = postArr[i].DeliveryStatus;
            p.appendChild(span)
            div.appendChild(p);
            break;
          }
          case 3:{
            p.innerText = "District : ";
            span.innerText = postArr[i].District;
            p.appendChild(span)
            div.appendChild(p);
            break;
          }
          case 4:{
            p.innerText = "Division : ";
            span.innerText = postArr[i].Division;
            p.appendChild(span)
            div.appendChild(p);
            break;
          }
        }
      }
      store.insertBefore(div, store.firstChild);
      return;
    }
  }
  window.alert("post office not found");
}
