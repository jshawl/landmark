//Geolocation

function geoFindMe() {
  var output = document.getElementById("out");

  if (!navigator.geolocation){
    output.innerHTML = "<p>Geolocation is not supported by your browser</p>";
    return;
  }

  function success(position) {
    var latitude  = position.coords.latitude;
    var longitude = position.coords.longitude;

    output.innerHTML = '<p>Latitude is ' + latitude + '° <br>Longitude is ' + longitude + '°</p>';

    var img = new Image();
    img.src = "http://maps.googleapis.com/maps/api/staticmap?center=" + latitude + "," + longitude + "&zoom=13&size=300x300&sensor=false";

    output.appendChild(img);
  };

  function error() {
    output.innerHTML = "Unable to retrieve your location";
  };

  output.innerHTML = "<p>Locating…</p>";

  navigator.geolocation.getCurrentPosition(success, error);
}


//Flickr Photos

      console.log('Start.');

      // Get a new key here https://www.flickr.com/services/apps/create/
      var apiKey = '7ee527edf996be2c115184057974a70f';
      var url = 'https://api.flickr.com/services/rest/?method=flickr.interestingness.getList&api_key=' + apiKey + '&format=json&nojsoncallback=1';

      // Grab the data
      jQuery.getJSON(url, function(data) {
        // // Number of pics you got
         console.log(data.photos.photo.length);

        var i = null;
        var thePhoto = null;
        var photoUrl = null;
        for (i = 0; i < data.photos.photo.length; i++) {
          // Each photo
          thePhoto = data.photos.photo[i];
          photoUrl = 'http://farm' + thePhoto.farm + '.staticflickr.com/' + thePhoto.server + '/' + thePhoto.id + '_' + thePhoto.secret + '.jpg';

          // Add to div
          var imageText = '<img id="' + thePhoto.id + '" src="' + photoUrl + '" class="foo" />';
          $('#flickr-photos').prepend(imageText);

          // The URL
          console.log(photoUrl);
        }

        console.log('Done.');
      });

//Masonry

  $(document).ready(function() {

    $('#photos .photo').hide();    // Use jQuery to hide all photos temporarily

    var $container = $('#photos'); // Create a reference to the image container

    // Use the imagesLoaded callback function to activate the Masonry plugin
    $container.imagesLoaded(function(){
      $container.masonry({
        itemSelector : '.photo', // The selector of the thumbnail divs
        isAnimated : true,       // Animate (with javascript) the layout when changing window size
                                 // Set to false if you'd rather animate with CSS3 transitions
                                 // Or toggle with Modernizr like this: isAnimated : !Modernizr.csstransitions
        columnWidth: 260,        // Width of the thumbnail including any padding and borders
        gutterWidth: 20          // The gap between thumbnails
      });
      $container.find('.photo').fadeIn('fast'); // Fade back in the thumbnails when the layout is complete
      $container.removeClass('loading');        // Remove the loading class from the container
    });

    // Optionally use your favourite fancyBox configuration
    $(".fancybox").fancybox({
      openEffect  : 'elastic',
      closeEffect : 'elastic',
      padding : 10,
      helpers : {
        title : {
          type : 'outside'
        }
      }
    });

  });

