$(function() {
    $('.priz__video').click(function() {
        $(this).addClass('on');
        $(this).find('video').get(0).play();
    })

    $("[data-href]").each(function() {
        $(this).click(function() {
            $('html, body').animate({ scrollTop: $($(this).attr("data-href")).offset().top }, 500);
            $('.toggle-menu').removeClass("on");
            $(".header menu").hide();
            return false
        })
    })

    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {}


    $(".tel-mask").inputmask("+7 (999) 999-99-99");
    $(".tel-mask").attr("placeholder", '+7 (___) ___-__-__');


    // SCROLL ON PAGE
    $(".scroll").click(function() {
        $("html, body").animate({
            scrollTop: 0
        }, 300);
    });


    var cur_scroll;
    var ai_scroll = $(".scroll");
    var w_cur_scroll = $(window).scrollTop();

    $(window).scroll(function() {
        if ($(window).scrollTop() < w_cur_scroll) {
            if ($(ai_scroll).hasClass("active")) {
                clearTimeout(cur_scroll);
                cur_scroll = setTimeout(function() { $(ai_scroll).removeClass("active"); }, 3000)
            }
            if (!$(ai_scroll).hasClass("active")) {
                $(ai_scroll).addClass("active");
                cur_scroll = setTimeout(function() { $(ai_scroll).removeClass("active"); }, 3000)
            }

        }
        w_cur_scroll = $(window).scrollTop();


    });


    // MOBILE_MENU
    $(".toggle-menu").click(function() {
        $(this).toggleClass("on");
        $(".header menu").slideToggle();
        return false;
    });

    var width = $(window).width();
    $(window).resize(function() {
        if ($(window).width() != width) {
            heightses();
            width = $(window).width();
        }
    });


    if ($('.quotes').get(0) && $(window).width() <= 767) {
        $('.quotes .row').animate({
            opacity: 1
        })
        $(".quotes .row").slick({
            slidesToScroll: 1,
            slidesToShow: 1,
            infinite: false
        })
    }


    window.addEventListener("orientationchange", function() {
        heightses();
    }, false);


    heightses();


    function heightses() {

    }

})