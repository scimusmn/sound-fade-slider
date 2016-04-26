$(document).ready(function() {

  var xFadeSounds = [];

  $('.cross-fade-group img').each(function() {

    var audioPath = $(this).attr('data-audio');
    var xPosition = $(this).attr('data-xPos');

    $(this).css('left', parseInt(xPosition));

    addXFadeSound('../' + audioPath, xPosition);

  });

  function addXFadeSound(url, x) {

    var newSnd = new Howl({
      src: [url],
      autoplay: true,
      loop: true,
      volume: 0.0,
    });

    newSnd.xPos = x;

    xFadeSounds.push(newSnd);

  }

  $('#slider').slider({
    formatter: function(value) {
      console.log(value);
      return 'Current value: ' + value;
    },

  }).on('change', function(e) {

    console.log('Old value:' + e.value.oldValue + ', New Value:' + e.value.newValue);

  });

  // $(window).mousemove(function(e) {

  //   var normX = e.pageX / $(window).width();

  //   $('footer p').text('x:' + e.pageX + ' normX:' + normX);

  //   var sortedArray = distanceSort(xFadeSounds, e.pageX);

  //   for (var i = 1; i < sortedArray.length; i++) {

  //     if (i >= 2) {
  //       sortedArray[i].volume(0.0);
  //     } else {
  //       // Mix two closest sounds.
  //       var maxdist = Math.abs(sortedArray[1].xPos - sortedArray[0].xPos);
  //       var curdist = Math.abs(e.pageX - sortedArray[0].xPos);

  //       var crossPoint = map(curdist, 0, maxdist, 0, 1);
  //       console.log('cp' + crossPoint);
  //       sortedArray[0].volume(1.0 - crossPoint);
  //       sortedArray[1].volume(1.0 + crossPoint);
  //     }

  //   }

  // });

});

// Utility functions
function map(val, inMin, inMax, outMin, outMax) {
  return (val - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
}

function distanceSort(arr, target) {

  return arr.sort(function(a, b) {

    var distance1 = Math.abs(target - a.xPos);
    var distance2 = Math.abs(target - b.xPos);

    return distance1 == distance2 ? 0 : (distance1 > distance2 ? 1 : -1);

  });

}
