/*
 * Create a Google map for the Airport Animal Emergi-Center
 * 
 * Adds a Google map centered on the clinic with a custom
 * marker. Also adds directions once a starting address is 
 * submitted.
 * 
 * Version 1.0.0
 */
var map;
var directionsRenderer;

function initialize() {
	var latlng = new google.maps.LatLng(39.7528137,-86.2491923);
        var mapOptions = {
          center: latlng,
          zoom: 16,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        
        map = new google.maps.Map(document.getElementById("map_canvas"),
            mapOptions);
        
        var icon = new google.maps.MarkerImage('http://aaecindy.com/wp-content/themes/aaec/images/marker_logo.png',
        	new google.maps.Size(28.0, 36.0),
        	new google.maps.Point(0, 0),
        	new google.maps.Point(14.0, 36.0)
       	);
        	 
        // Initialize a marker
        var marker = new google.maps.Marker({
        		position: latlng,
        		map: map,
        		title: "Airport Animal Emergi-Center",
        		icon: icon
        });
        
        var contentString = '<div id="infowindow-content">'+
    		'<div id="siteNotice">'+
    		'<\/div>'+
    		'<h2 id="firstHeading" class="firstHeading">Airport Animal Emergi-Center<\/h2>'+
    		'<div id="bodyContent">'+
    		'<p style="font-size:1em">5235 W Washington St<br />Indianapolis, IN 46241<br />(317) 248-0832<\/p>'+
    		'<\/div>'+
    		'<\/div>';
    		
    	var infowindow = new google.maps.InfoWindow({
    			content: contentString
    	});
        
    	google.maps.event.addListener(marker, 'click', function() {
    		infowindow.open(map, marker);
    	});
    	
    	/*google.maps.event.addDomListener(window, 'resize', function() {
    		var center = map.getCenter();
    		google.maps.event.trigger(map, 'resize');
    		map.setCenter(center);
    	});*/
        
        marker.setMap(map);
        
        // TODO: Add custom icons to the directions results
        /*var rendererOptions = {
        	suppressMarkers : true
        }
        
        directionsRenderer = new google.maps.DirectionsRenderer(rendererOptions);
        directionsRenderer.setMap(map);
        directionsRenderer.setPanel(document.getElementById('directions'));*/
       
        directionsRenderer = new google.maps.DirectionsRenderer();
        directionsRenderer.setMap(map);
        directionsRenderer.setPanel(document.getElementById('directions'));
        
        google.maps.event.trigger(map, 'resize');
}

/*
 * Looks up the directions, overlays route on map,
 * and prints turn-by-turn to #directions.
 */
function overlayDirections()
{
    
    var directionsService = new google.maps.DirectionsService();
        
    var fromAddress =
      	document.getElementById("fromAddress").value;
      		
    var request = {
        origin: fromAddress,
        destination: "5235 W Washington St, Indianapolis, IN 46241",
        travelMode: google.maps.DirectionsTravelMode.DRIVING,
        unitSystem: google.maps.DirectionsUnitSystem.IMPERIAL,
        provideRouteAlternatives: true
    };
      
    directionsService.route(request, function(response, status) {
       if (status == google.maps.DirectionsStatus.OK) {
       			
       		setTimeout(function() {
       			google.maps.event.trigger(map, 'resize')
       			}, 1000);
        	directionsRenderer.setDirections(response);
        	
       } else {
            if ( status == "NOT_FOUND" ) {
        	alert('Error: Address not found or empty.' );
            } else {
                alert('Error: ' + status);
            }
       }
    });	
}

/**
 * Displays the print directions button after the get directions button is pressed.
 * Hides the intro paragraph. 
 */
function ShowPrint() {
    var address = document.getElementById('fromAddress').value;
    
    // Make sure the field is not empty or contains only a space.
    if ( address != '' && address != ' ' ) {
		document.getElementById('print').style.display='inline';
		document.getElementById('get-directions').style.display='none';
	
		document.getElementById('directions-head').style.display='none';
		document.getElementById('directions-foot').style.display='none';
    }
    
    
}

/**
 * Redisplays the get directions button when the address textfield is clicked and
 * hides the print button. Also selects any text in the field
 */
function ShowGet(id) {
    document.getElementById('get-directions').style.display='inline';
    document.getElementById('print').style.display='none';
	
    document.getElementById(id).focus();
    document.getElementById(id).select();
}
