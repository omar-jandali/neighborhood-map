/*
 This document was create soley by Omar Jandali for the porpose of Udacity Front End Web Developer Project.
  API's and framworks used in this document include jQuery, knockout.js, google maps APIi, and ticketmaster API
*/


/*----------------This is the model---------------------*/
var initialLocation = {
  center:{
    lat: 34.04129,
    lng: -118.263667
  },
  zoom: 14
}

var stadiums = [
  {
    title:"Maccheroni Republic",
    city: "Los Angeles",
    address:"332 South Broadway Los Angeles, CA 90013",
    foodType: "italian",
    location:{
      lat: 34.050076,
      lng: -118.248646
    },
    map: map
  },
  {
    title:"Baco Mercat",
    city: "Los Angeles",
    address:"408 South Main Street, Los Angeles, CA 90013",
    foodType: "spanish-fusion",
    location:{
      lat: 34.047847,
      lng: -118.247222
    },
    map: map
  },
  {
    title:"Revolutionario North African Tacos",
    city: "Los Angeles",
    address:"1436 West Jefferson Boulevard, Los Angeles, CA 90007",
    foodType: "north african tacos",
    location:{
      lat: 34.025333,
      lng: -118.298615
    },
    map: map
  },
  {
    title:"Pie Hole",
    city: "Los Angeles",
    address:"714 Traction Ave, Los Angeles, CA 90013",
    foodType: "homemade pie",
    location:{
      lat: 34.045429,
      lng: -118.236258
    },
    map: map
  },
  {
    title:"Stumptown Coffee",
    city: "Los Angeles",
    address:"06 S Santa Fe Ave, Los Angeles, CA 90021",
    foodType: "coffee bar",
    location:{
      lat: 34.033292,
      lng: -118.229707
    },
    map: map
  },
  {
    title:"Mex Peru Gipsy",
    city: "Los Angeles",
    address:"414 E 12th St, Los Angeles, CA 90015",
    foodType: "mexican",
    location:{
      lat: 34.035217,
      lng: -118.255887
    },
    map: map
  }
]

/*----------------list of all the global variables---------------------*/
var map;
var marker;
var markerLocation;
var markerTitle;
var markerMap;
var infowindow;
var windowContesnt;
var markerList = [];

//The following variables are for streetview request
var httpsRequest = "https://maps.googleapis.com/maps/api/streetview\?";
var httpsSize = "size=300x150&";
var httpsFov = "fov=120&";
var httpsHeading = "undefined";
var httpsPitch = "pitch=0&";
var httpsKey = "key=AIzaSyDik_TF3x4yc96CvWWw12YQ4DMjoG3vfFM";
var newLocation;

// the following variables are for the yelp api
var yelpAPI = "https://api.yelp.com/v2/search\?";
var yelpTermAPI;
var yelpLocationAPI;
var newTerm;3
var customerKey = "oauth_token=zp18SRf0yS1_zN5fmjcL2RFx80t4Vmo-"

/*----------------This is the viewmodel---------------------*/
function setMarkers(){
  for(var i = 0; i < stadiums.length; i++){
    markerLocation = stadiums[i].location;
    console.log(markerLocation);
    currentMarker = new google.maps.Marker({
      position: markerLocation,
      map: map,
      content: {
        name: stadiums[i].title,
        address: stadiums[i].address,
        streetLocation: reformatLocation(stadiums[i].address),
        streetViewRequest: httpsRequest + httpsSize + "location=" + newLocation + "&" + httpsFov + httpsPitch + httpsKey
      },
      yelpTerm: formatYelpTerm(stadiums[i].title),
      yelpLocation: formatYelpLocation(stadiums[i].city),
      yelpRequest: yelpAPI + "id=" + newterm + "&" + customerKey,
      animation: google.maps.Animation.BOUNCE,
      id: i
    });
    console.log(currentMarker.content.streetViewRequest);
    markerList.push(currentMarker);
    infowindow = new google.maps.InfoWindow();
    currentMarker.addListener('click', function(){
      fillWindow(this, infowindow);
    });
  }
}
function fillWindow(currentMarker, lInfowindow){
  if(lInfowindow.currentMarker != currentMarker){
    lInfowindow.currentMarker = currentMarker;
    lInfowindow.setContent("<div><h2>" + currentMarker.content.name + "</h2><h3>" + currentMarker.content.address + "</h3><img src=\"" +
                            currentMarker.content.streetViewRequest + "\"><img src=\"" + currentMarker.yelpRequest + "\"></div>");
    lInfowindow.open(map, currentMarker);
  }
}
function reformatLocation(address){
  newLocation = address.replace(/ +/g, "+");
  console.log(newLocation);
}
function formatYelpTerm(title){
  newterm = title.replace(/ +/g, "-");
  console.log(newterm);
}
function formatYelpLocation(city){
  newLocation = city.replace(/ +/g, "+");
  console.log(newLocation);
}

// sample api https request for locations ~ https://maps.googleapis.com/maps/api/streetview?size=HEIGHTxWEIGHT&location=LAT,LNG&fov=VALUE&heading=VALUE&pitch=VALUE&key=APIKEY
// sample wikipedia api requeest https ~ https://en.wikipedia.org/w/api.php?action=query&titles=mainPage
/*----------------This is the view---------------------*/
//$(".container.").append(initMap);
function initMap() {
  // Constructor creates a new map - only center and zoom are required.
  map = new google.maps.Map(document.getElementById('container'), initialLocation);
  setMarkers();
}
