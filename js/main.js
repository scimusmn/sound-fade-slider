$(document).ready(function() {

  var xFadeSounds = [];

  $('.cross-fade-group img').each(function(index) {

    var audioPath = $(this).attr('data-audio');
    var xPosition = parseInt($(this).attr('data-xPos'));

    addXFadeSound($(this), '' + audioPath, xPosition);

  });

  $('.foot-pad').mousedown(function() {

    var id = $(this).attr('id');

    console.log('Foot pad mousedown.', id);

    if (id == 'top') {
      //530
      updateFadesByProximity(530);
    } else if (id == 'right') {
      //726
      updateFadesByProximity(726);
    } else if (id == 'left') {
      //209
      updateFadesByProximity(209);
    }

  });

  $('body').mouseup(function() {

    updateFadesByProximity(-999);
  });

  function addXFadeSound(div, url, x) {

    var newSnd = new Howl({
      src: [url],
      autoplay: true,
      loop: true,
      volume: 0.0,
    });

    newSnd.xPos = x;
    newSnd.div = div;

    xFadeSounds.push(newSnd);

  }

  /* $('#slider').slider({

   }).on('change', function(e) {

     var val = e.value.newValue;

     updateFadesByProximity(val);

   });*/

  function updateFadesByProximity(val) {

    for (var i = 0; i < xFadeSounds.length; i++) {

      var dist = Math.abs(val - xFadeSounds[i].xPos);

      var vol = map(dist, 0, 85, 1.5, 0.0);
      vol = clamp(vol, 0.0, 1.0);
      xFadeSounds[i].volume(vol);

      var opac = map(dist, 100, 0.0, 0.0, 1.5);
      opac = clamp(opac, 0.4, 1.0);

      if (val == -999) {
        $(xFadeSounds[i].div).css('opacity', 1.0);
      } else {
        $(xFadeSounds[i].div).css('opacity', opac);
      }

      // $(xFadeSounds[i].div).css('background-color', 'rgba(255,255,255,' + opac + ')');

    }

  }

});

// Utilities
function map(val, inMin, inMax, outMin, outMax) {
  return (val - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
}

function clamp(val, min, max) {
  return Math.min(Math.max(val, min), max);
};

