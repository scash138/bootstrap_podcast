$(function(){
  $.getJSON('js/podcasts.json', function(data) {
  console.log( "success" );
})
  .done(function(data) {
    console.log( data.podcasts[0].band);
  })
  .fail(function() {
    console.log( "error" );
  })
  .always(function() {
    console.log( "complete" );
  });

});
