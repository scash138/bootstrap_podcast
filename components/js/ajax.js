$(function(){
  $.getJSON('js/podcasts.json', function(data) {
    var podcastData = $.each(data.podcasts, function(index, el) {
    });
    $.each($('#podcast .guest'),function(index, el) {
      $('h3', this).text(podcastData[index].guest);
      $('h4', this).text('Episode #' + podcastData[index].episode + ' - ' + podcastData[index].date);
      if (podcastData[index].description.length > 200) {
        $('p', this).text('over 200 characters');
      } else {
        $('p', this).text(podcastData[index].description);
      }
      $('.photo img', this).addClass('img-circle');
      $('.photo img', this).attr('src',podcastData[index].image);
      $('.photo img', this).attr('alt',podcastData[index].alt);
      $('.photo a', this).attr('href',podcastData[index].audiofile);
    });
})
  .done(function(data) {
    // console.log( data.podcasts[0].band);
  })
  .fail(function() {

  })
  .always(function() {

  });

});
