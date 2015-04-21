var geocoder;
var map;
var gloaded = false;
var cloaded = false;
var gran = false;
  
  function initMap(force) {
    if (! (gloaded && cloaded)) {
      return;
    }
    if (gloaded && cloaded && gran && (!(force === true))) {
      return;
    }
    gran = true;
   
    var latlng = new google.maps.LatLng(-34.397, 150.644);
    var myOptions = {
      zoom: 12,
      center: latlng,
      mapTypeControl: true,
      mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU},
      navigationControl: true,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    map = new google.maps.Map(document.getElementById("map-canvas"), myOptions);
    if (geocoder) {
      geocoder.geocode( { 'address': address}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
          if (status != google.maps.GeocoderStatus.ZERO_RESULTS) {
          map.setCenter(results[0].geometry.location);

            var infowindow = new google.maps.InfoWindow(
                { content: '<div style="color:black">You can find us at:<br /><b>'+address+'</b></div>',
                  size: new google.maps.Size(150,50)
                });

            var marker = new google.maps.Marker({
                position: results[0].geometry.location,
                map: map,
                title:"HaoBao!"
            }); 
            google.maps.event.addListener(marker, 'click', function() {
                infowindow.open(map,marker);
            });

          } else {
            alert("No results found");
          }
        } else {
          alert("Geocode was not successful for the following reason: " + status);
        }
      });
    }
  }


CTS(function() {
  CTS.engine.rendered.then(function() {
    $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
      if ($(e.target).attr('href') == '#location') {
        initMap(true);
      }
    });

    $.each($('.menu-item'), function(idx, e) {
      e = $(e);
      var st = e.find('.section-title');
      if (st && st.html() && (st.html().length == 0)) {
        e.find('.section-wrapper').hide();
      }
      var it = e.find('.item-name');
      if (it && it.html() && (it.html().length == 0)) {
        e.find('.item-wrapper').hide();
      }
      var so = e.find('.sold-out');
      if ((so.html() == 'TRUE') || (so.html() == 'yes') || (so.html() == '1')) {
        e.find('.price').hide();
      } else {
        e.find('.soldout').hide();
      }
      window.address = $('#map-address').html();
      cloaded = true;
      initMap();
    });
  });
});

google.maps.event.addDomListener(window, 'load', function() {
    geocoder = new google.maps.Geocoder();
    gloaded = true;
    initMap();
});
