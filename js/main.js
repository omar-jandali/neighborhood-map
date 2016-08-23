/*
 This document was create soley by Omar Jandali for the porpose of Udacity Front End Web Developer Project.
  API's and framworks used in this document include jQuery, knockout.js, google maps APIi, and ticketmaster API
*/


/*----------------This is the model---------------------*/
var initialLocation = {
  center:{
    lat: 33.933633,
    lng: -118.095998
  },
  zoom: 11
}

var stadiums = [
  {
    title:"Staple Center",
    address:"1111 S Figueroa St, Los Angeles, CA 90015",
    teams:[
      "Los Angeles Lakers",
      "Los Angeles Clippers",
      "Los Angeles Kings"
    ],
    location:{
      lat: 34.042773,
      lng: -118.267233
    },
    map: map
  },
  {
    title:"Honda Center",
    address:"2695 E katella Ave, Anaheim, CA 92806",
    teams:[
      "Anaheim Ducks"
    ],
    location:{
      lat: 33.807834,
      lng: -117.876576
    },
    map: map
  },
  {
    title:"Los Angeles Memorial Coliseum",
    address:"3911 S Figueroa St. Los Angeles, CA 90037",
    teams:[
      "Los Angeles Rams"
    ],
    location:{
      lat: 34.014049,
      lng: -118.287945
    },
    map: map
  },
  {
    title:"Dodgers Stadium",
    address:"1000 Vin Scully Ave, Los Angeles, CA 90012",
    teams:[
      "Los Angeles Dodgers"
    ],
    location:{
      lat: 34.073735,
      lng: -118.239980
    },
    map: map
  },
  {
    title:"Angels Stadium of Anaheim",
    address:"2000 E Gene Autry Way, Anaheim, CA 92806",
    teams:[
      "Anaheim Angels"
    ],
    location:{
      lat: 33.799051,
      lng: -117.882845
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
var httpsSize = "size=250x150&";
var httpsFov = "fov=50&";
var httpsHeading = "undefined";
var httpsPitch = "pitch=20&";
var httpsKey = "key=AIzaSyDik_TF3x4yc96CvWWw12YQ4DMjoG3vfFM";

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
        streetViewRequest: httpsRequest + httpsSize + "location=" + stadiums[i].location.lat + "," + stadiums[i].location.lng + "&" + httpsFov + httpsPitch + httpsKey
      },
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
    lInfowindow.setContent("<div><h2>" + currentMarker.content.name + "</h2><h3>" + currentMarker.content.address + "</h3><div>" + currentMarker.content.streetViewRequest + "</div></div>");
    lInfowindow.open(map, currentMarker);
  }
}
/*function infoWindowContent(){
  var contentString = "<div><h2>"currentMarker.content.name"</h2><h3>"currentMarker.content.address"</h3><div>"contentMarker.content.streetViewRequest"</div></div>";
  return contentString;
}*/

// sample api https request for locations = https://maps.googleapis.com/maps/api/streetview?size=HEIGHTxWEIGHT&location=LAT,LNG&fov=VALUE&heading=VALUE&pitch=VALUE&key=APIKEY
/*----------------This is the view---------------------*/
//$(".container.").append(initMap);
function initMap() {
  // Constructor creates a new map - only center and zoom are required.
  map = new google.maps.Map(document.getElementById('container'), initialLocation);
  setMarkers();
}
