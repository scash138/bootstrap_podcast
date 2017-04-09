$(function(){
  $.getJSON('js/podcasts.json', function(data) {
    //show more and less results function
    function showMore(){
      var showChar = 150;  // How many characters are shown by default
      var ellipsestext = "...";
      var moretext = "Show more >>";
      var lesstext = "<< Show less";


      $('.guest-description').each(function() {
        var content = $(this).html();

        if(content.length > showChar) {

          var c = content.substr(0, showChar);
          var h = content.substr(showChar, content.length - showChar);

          var html = c + '<span class="moreellipses">' + ellipsestext+ '&nbsp;</span><span class="morecontent"><span>' + h + '</span>&nbsp;&nbsp;<a href="" class="morelink">' + moretext + '</a></span>';

          $(this).html(html);
        }
      });

      $(".morelink").click(function(){
        if($(this).hasClass("less")) {
          $(this).removeClass("less");
          $(this).html(moretext);
        } else {
          $(this).addClass("less");
          $(this).html(lesstext);
        }
        $(this).parent().prev().toggle();
        $(this).prev().toggle();
        return false;
      });
    }//end of show more less function

    //get ajax json podcast guests
    var podcastData = $.each(data.podcasts, function(index, el) {
    });
    var pages = Math.ceil(podcastData.length/9);
    if(pages > 1) {
      for (var i = 0; i < pages; i++) {
        $('.page-count').append('<button type="button" class="btn-group btn-default" value="' + (i+1) + '">' + (i+1) + '</button>');
      }
    }//end get ajax json podcast guests

    //populate elements with podcast guests
    $.each($('#podcast .guest'),function(index, el) {
      $('h3', this).text(podcastData[index].guest);
      $('h4', this).text('Episode #' + podcastData[index].episode + ' - ' + podcastData[index].date);
      $('p', this).text(podcastData[index].description);
      $('.photo img', this).addClass('img-circle');
      $('.photo img', this).attr('src',podcastData[index].image);
      $('.photo img', this).attr('alt',podcastData[index].alt);
      $('.photo a', this).attr('href',podcastData[index].audiofile);
    });

    showMore(); //run show more to limit characters in description

    //onclick to replace elements with new guests
    $('button').click(function(){
      var ubound = ($(this).val() * 9);
      var lbound = (($(this).val() * 9) - 9);

      $.each($('#podcast .guest'),function() {
        if(podcastData[lbound] == null) {
          $('h3', this).text('');
          $('h4', this).text('');
          $('p', this).text('');
          $('.photo img', this).removeClass('img-circle');
          $('.photo img', this).removeAttr('src');
          $('.photo img', this).removeAttr('alt');
          $('.photo a', this).remove();
          lbound +=1;
        } else {
          $('h3', this).text(podcastData[lbound].guest);
          $('h4', this).text('Episode #' + podcastData[lbound].episode + ' - ' + podcastData[lbound].date);
          $('p', this).text(podcastData[lbound].description);
          $('.photo img', this).addClass('img-circle');
          $('.photo img', this).attr('src',podcastData[lbound].image);
          $('.photo img', this).attr('alt',podcastData[lbound].alt);
          $('.photo a', this).attr('href',podcastData[lbound].audiofile);
          lbound +=1;
        }

      });

      showMore(); //run show more to limit characters in description
    });

})
  .done(function(data) {
      // var showChar = 100;  // How many characters are shown by default
      // var ellipsestext = "...";
      // var moretext = "Show more >>";
      // var lesstext = "<< Show less";
      //
      //
      // $('.guest-description').each(function() {
      //   var content = $(this).html();
      //
      //   if(content.length > showChar) {
      //
      //       var c = content.substr(0, showChar);
      //       var h = content.substr(showChar, content.length - showChar);
      //
      //       var html = c + '<span class="moreellipses">' + ellipsestext+ '&nbsp;</span><span class="morecontent"><span>' + h + '</span>&nbsp;&nbsp;<a href="" class="morelink">' + moretext + '</a></span>';
      //
      //       $(this).html(html);
      //   }
      // });
      //
      // $(".morelink").click(function(){
      //   if($(this).hasClass("less")) {
      //       $(this).removeClass("less");
      //       $(this).html(moretext);
      //   } else {
      //       $(this).addClass("less");
      //       $(this).html(lesstext);
      //   }
      //   $(this).parent().prev().toggle();
      //   $(this).prev().toggle();
      //   return false;
      // });
  })
  .fail(function() {

  })
  .always(function() {

  });
});
