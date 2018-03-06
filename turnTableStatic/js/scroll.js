

$(function ($) {
//click function
    $(".num").click(function (event) {
        var index = this.title;
        var id = '#' + 'index_' + index
        $("html,body").animate({scrollTop: $(id).offset().top}, 800);
    });



  //  Get div # navnum
  // from the bottom of the browser and # main page content area on the right side of the distance function as visual width of the page

    $(function () {
        $(window).scroll(function () {
            t = $(document).scrollTop();

            //if scroll height
            if (t > 200) {
                $('#navnum').fadeIn();
            } else {
                $('#navnum').fadeOut();
            }

        });


    });
});