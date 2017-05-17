$(function(){
//show more or less function
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
  }

  function paginationFunc(data){
    var pages = Math.ceil(data.podcasts.length/9);

        //pagination for ajax podcast guests
        $('#podcast-pagination-group').twbsPagination({
            totalPages: pages,
            visiblePages: 4,
            hideOnlyOnePage: true,
            onPageClick: function (event, page) {

              var ubound = (page * 9);
              var lbound = ((page * 9) - 9);

              $.each($('#podcast .guest'),function() {
                if(data.podcasts[lbound] == null) {
                  $('h3', this).text('');
                  $('h4', this).text('');
                  $('p', this).text('');
                  $('.photo img', this).removeClass('img-circle');
                  $('.photo img', this).removeAttr('src');
                  $('.photo img', this).removeAttr('alt');
                  $('.photo a', this).hide();
                  lbound +=1;
                } else {
                  $('h3', this).text(data.podcasts[lbound].guest);
                  $('h4', this).text('Episode #' + data.podcasts[lbound].episode + ' - ' + data.podcasts[lbound].date);
                  $('p', this).text(data.podcasts[lbound].description);
                  $('.photo img', this).addClass('img-circle');
                  $('.photo img', this).attr('src',data.podcasts[lbound].image);
                  $('.photo img', this).attr('alt',data.podcasts[lbound].alt);
                  $('.photo a', this).attr('href',data.podcasts[lbound].audiofile);
                  $('.photo a', this).show();
                  lbound +=1;
                }

              });

              showMore(); //run show more to limit characters in description
              hideRows();
              $('#podcast-pagination-group a').click(function() {
                var topoffset = 50;
                $('html,body').animate({
                  scrollTop: $('#podcast').offset().top+topoffset+2
                }, 500);
              });
            }
        });
  }

  function hideRows(){
    $('.row-2').show();
    $('.row-3').show();
    if ($('.row-2 .info h3').first().text() == '') {
      $('.row-2').hide();
    }
    if ($('.row-3 .info h3').first().text() == '') {
      $('.row-3').hide();
    }
  }

  //search function Winthrop
  $('.searchpodcast').click(function(){
    var searchTerm = $('#srch-term').val();
    var searchExp = new RegExp(searchTerm, "i");
    var i = 0;

    $.each($('#podcast .guest'),function() {
      $('h3', this).text('');
      $('h4', this).text('');
      $('p', this).text('');
      $('.photo img', this).removeClass('img-circle');
      $('.photo img', this).removeAttr('src');
      $('.photo img', this).removeAttr('alt');
      $('.photo a', this).hide();
    });
//need to make this a filter insted of if then statement search grep array
    $.getJSON('js/podcasts.json', function(data) {
      $.each(data.podcasts, function(index, val) {
        if(val.description.search(searchExp) != -1) {
            $("#podcast .guest h3").eq(i).text(val.guest);
            $('#podcast .guest h4').eq(i).text('Episode #' + val.episode + ' - ' + val.date);
            $('#podcast .guest p').eq(i).text(val.description);
            $('#podcast .guest .photo img').eq(i).addClass('img-circle');
            $('#podcast .guest .photo img').eq(i).attr('src',val.image);
            $('#podcast .guest .photo img').eq(i).attr('alt',val.alt);
            $('#podcast .guest .photo a').eq(i).attr('href',val.audiofile);
            $('#podcast .guest .photo a').eq(i).show();
            i +=1;
        }
      });
      showMore();
      paginationFunc(data);
    });
    return false;
  });


  //get json
  $.getJSON('js/podcasts.json', function(data) {
    // try {
    $.each(data.podcasts, function(index, val) {
          $("#podcast .guest h3").eq(index).text(val.guest);
          $('#podcast .guest h4').eq(index).text('Episode #' + val.episode + ' - ' + val.date);
          $('#podcast .guest p').eq(index).text(val.description);
          $('#podcast .guest .photo img').eq(index).addClass('img-circle');
          $('#podcast .guest .photo img').eq(index).attr('src',val.image);
          $('#podcast .guest .photo img').eq(index).attr('alt',val.alt);
          $('#podcast .guest .photo a').eq(index).attr('href',val.audiofile);
          $('#podcast .guest .photo a').eq(index).show();
    });
      showMore();
      paginationFunc(data);
    // } catch(err){
    //
    // }
  })
  .done(function(data) {
    hideRows();
  });

  // hideRows();
//get json
// $.getJSON('js/podcasts.json', function(data) {
//
//     //get ajax json podcast guests
//     var podcastData = $.each(data.podcasts, function(index, el) {
//     });
//     //page-count buttons
//     var pages = Math.ceil(podcastData.length/9);
//     //pagination for ajax podcast guests
//     $('#podcast-pagination-group').twbsPagination({
//         totalPages: pages,
//         visiblePages: 4,
//         onPageClick: function (event, page) {
//
//           var ubound = (page * 9);
//           var lbound = ((page * 9) - 9);
//
//           $.each($('#podcast .guest'),function() {
//             if(podcastData[lbound] == null) {
//               $('h3', this).text('');
//               $('h4', this).text('');
//               $('p', this).text('');
//               $('.photo img', this).removeClass('img-circle');
//               $('.photo img', this).removeAttr('src');
//               $('.photo img', this).removeAttr('alt');
//               $('.photo a', this).hide();
//               lbound +=1;
//             } else {
//               $('h3', this).text(podcastData[lbound].guest);
//               $('h4', this).text('Episode #' + podcastData[lbound].episode + ' - ' + podcastData[lbound].date);
//               $('p', this).text(podcastData[lbound].description);
//               $('.photo img', this).addClass('img-circle');
//               $('.photo img', this).attr('src',podcastData[lbound].image);
//               $('.photo img', this).attr('alt',podcastData[lbound].alt);
//               $('.photo a', this).attr('href',podcastData[lbound].audiofile);
//               $('.photo a', this).show();
//               lbound +=1;
//             }
//
//           });
//
//           showMore(); //run show more to limit characters in description
//         }
//     });
//
//     //populate elements with podcast guests
//     $.each($('#podcast .guest'),function(index, el) {
//       $('h3', this).text(podcastData[index].guest);
//       $('h4', this).text('Episode #' + podcastData[index].episode + ' - ' + podcastData[index].date);
//       $('p', this).text(podcastData[index].description);
//       $('.photo img', this).addClass('img-circle');
//       $('.photo img', this).attr('src',podcastData[index].image);
//       $('.photo img', this).attr('alt',podcastData[index].alt);
//       $('.photo a', this).attr('href',podcastData[index].audiofile);
//     });
//
//     showMore(); //run show more to limit characters in description
//
// })
//   .done(function(data) {
//
//   })
//   .fail(function() {
//
//   })
//   .always(function() {
//
//   });
});
