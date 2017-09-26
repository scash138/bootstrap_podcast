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
    var pages = Math.ceil(data.length/9);
        //pagination for ajax podcast guests
        $('#podcast-pagination-group').twbsPagination('destroy');//call destroy
        $('#podcast-pagination-group').twbsPagination({
            totalPages: pages,
            visiblePages: 4,
            hideOnlyOnePage: true,
            onPageClick: function (event, page) {

              var ubound = (page * 9);
              var lbound = ((page * 9) - 9);
              $.each($('#podcast .guest'),function() {
                if(data[lbound] == null) {
                  $('h3', this).text('');
                  $('h4', this).text('');
                  $('h5', this).text('');
                  $('p', this).text('');
                  $('.photo img', this).removeClass('img-circle');
                  $('.photo img', this).removeAttr('src');
                  $('.photo img', this).removeAttr('alt');
                  $('.photo a', this).hide();
                  lbound +=1;
                } else {
                  $('h3', this).text(data[lbound].guest);
                  $('h4', this).text('Episode #' + data[lbound].episode + ' - ' + data[lbound].date);
                  $('h5', this).html(data[lbound].links);
                  $('p', this).html(data[lbound].description_raw);
                  $('.photo img', this).addClass('img-circle');
                  $('.photo img', this).attr('src',data[lbound].image);
                  $('.photo img', this).attr('alt',data[lbound].alt);
                  $('.photo a', this).attr('href',data[lbound].audiofile);
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
      $('h5', this).text('');
      $('p', this).html('');
      $('.photo img', this).removeClass('img-circle');
      $('.photo img', this).removeAttr('src');
      $('.photo img', this).removeAttr('alt');
      $('.photo a', this).hide();
    });
//need to make this a filter insted of if then statement search grep array
    $.getJSON('js/podcasts.json', function(data) {
      var returnarry = $.grep(data.podcasts, function(e, i){
        return e.description.toLowerCase().indexOf(searchTerm.toLowerCase()) >=0;
      });

      $.each(returnarry, function(index, val) {
            $("#podcast .guest h3").eq(i).text(val.guest);
            $('#podcast .guest h4').eq(i).text('Episode #' + val.episode + ' - ' + val.date);
            $("#podcast .guest h5").eq(i).html(val.links);
            $('#podcast .guest p').eq(i).html(val.description);
            $('#podcast .guest .photo img').eq(i).addClass('img-circle');
            $('#podcast .guest .photo img').eq(i).attr('src',val.image);
            $('#podcast .guest .photo img').eq(i).attr('alt',val.alt);
            $('#podcast .guest .photo a').eq(i).attr('href',val.audiofile);
            $('#podcast .guest .photo a').eq(i).show();
            i +=1;
      });
      showMore();
      paginationFunc(returnarry);
    });
    return false;
  });


  //get json
  $.getJSON('js/podcasts.json', function(data) {
    try {
    $.each(data.podcasts, function(index, val) {
          $("#podcast .guest h3").eq(index).text(val.guest);
          $('#podcast .guest h4').eq(index).text('Episode #' + val.episode + ' - ' + val.date);
          $("#podcast .guest h5").eq(index).html(val.links);
          $('#podcast .guest p').eq(index).html(val.description_raw);
          $('#podcast .guest .photo img').eq(index).addClass('img-circle');
          $('#podcast .guest .photo img').eq(index).attr('src',val.image);
          $('#podcast .guest .photo img').eq(index).attr('alt',val.alt);
          $('#podcast .guest .photo a').eq(index).attr('href',val.audiofile);
          $('#podcast .guest .photo a').eq(index).show();
    });
      showMore();
      paginationFunc(data.podcasts);
     } catch(err){
    //
    }
  })
  .done(function(data) {
    hideRows();
  });
});
