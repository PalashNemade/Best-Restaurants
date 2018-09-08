function initialize (){
}

var map;
var marker = [];
function initMap(){
    var mark = {lat: 32.75, lng: -97.13};
    map = new google.maps.Map(document.getElementById('map'), {
        center: mark,
        zoom: 16
    });
}


function sendRequest () {
   var xhr = new XMLHttpRequest();
   var json;
   var str;
   var bound = map.getBounds();
   var southWest = bound.getSouthWest();
   var northEast = bound.getNorthEast();
   bound = southWest.lat()+","+southWest.lng()+"|"+northEast.lat()+","+northEast.lng();
   xhr.open("GET", "proxy.php?term="+document.getElementById("search").value+"&bounds="+bound+"&limit=10");
   xhr.setRequestHeader("Accept","application/json");
   xhr.onreadystatechange = function (){
       if (this.readyState == 4) {
           deleteMarker();
           json = JSON.parse(this.responseText);
          str = JSON.stringify(json,undefined,2);
          listRestraunts(json);
          //document.getElementById("output").innerHTML = "<pre>" + str + "</pre>";
       }
   };
   xhr.send(null);
}

function listRestraunts(json)
{
    var str = " ";
    for(var i=0;i<json.businesses.length;i++)
    {
        //alert("inside loop = "+i);
        str += "<img src="+json.businesses[i].image_url+">" +
            "<a href="+json.businesses[i].url+" >" + "<p>Name:" +json.businesses[i].name+ "</p>" + "</a>"
            + "<p>Phone:"+json.businesses[i].phone+"</p>"
            + "<img src="+json.businesses[i].rating_img_url+">"
            + "<p> Review: "+json.businesses[i].snippet_text+"</p>"
            + "<hr />";

    }
    setMarker(json);
    document.getElementById("output").innerHTML = str;

}

function deleteMarker()
{
    for(var i=0;i<marker.length;i++)
        marker[i].setMap(null);
        }

function setMarker(json)
{
    for(var i=0;i<json.businesses.length;i++) {
        var id = (i+1).toString();
        var pos = {lat: json.businesses[i].location.coordinate.latitude,lng: json.businesses[i].location.coordinate.longitude}
        marker[i] = new google.maps.Marker({
            position: pos,
            map:map,
            title: json.businesses[i].name,
            label: id
        });
    marker[i].setMap(map);
    }
}