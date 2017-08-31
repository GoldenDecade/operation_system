$(function() {
    console.log(12);
    console.log($('html').outerHeight());
    console.log($(window).outerHeight());
    console.log(13);
    if($('html').outerHeight() > $(window).outerHeight()) {
        $('.inner_frame_wrapper').css({width: 'calc(90% + 16px)'})
    }else {
        $('.inner_frame_wrapper').css({width: '90%'})
    }
    window.onresize = function() {
        if($('html').outerHeight() > $(window).outerHeight()) {
            $('.inner_frame_wrapper').css({width: 'calc(90% + 16px)'})
        }else {
            $('.inner_frame_wrapper').css({width: '90%'})
        }
    }

})