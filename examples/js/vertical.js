$(function () {
    /*
     * Example for a vertical slider for Smart TV apps using jQuery plugin SliderTV.
     */

    // you can optionally change sliderTV plugin defaults here
    //$.fn.sliderTV.defaults.animation.isVertical = true;   // animation direction
    $.fn.sliderTV.defaults.animation.duration = 350;        // animation duration
    $.fn.sliderTV.defaults.animation.easing = 'linear';     // animation type
    $.fn.sliderTV.defaults.bullets.canShow = false;         // show bullet elements

    // let's initiate sliderTV plugin
    $('#sliderTV').sliderTV({ animation: { isVertical: true } });

    // in your real world smart tv application you can listen to events from remote control,
    // in this demo we just listen to keypad arrow left and right
    $('body').keydown(function (e) {
        switch (e.keyCode) {
            case 38:
                // keypad arrow up
                $('#sliderTV').trigger('move:prev');
                break;
            case 40:
                // keypad arrow down
                $('#sliderTV').trigger('move:next');
                break;
        }
    });

    // listen to click events for particular html elements,
    // as for example the navigation arrows (useful when implementing lg magic control)
    $('.sliderTV__next').click(function () {
        // slide to next item
        $('#sliderTV').trigger('move:next');
    });
    $('.sliderTV__prev').click(function () {
        // slide to previous item
        $('#sliderTV').trigger('move:prev');
    });

    $('#help__input').change(function (event) {
        // slide to a specific item, useful to slide the carousel programmatically
        $('#sliderTV').trigger('move:jump', { to: parseInt(event.target.value) });
    });

    // listen to events emitted by sliderTV plugin,
    // in this code below, we are "listening" to whenever the sliding animation starts and ends
    $('#sliderTV').on('animation:start', function () {
        console.clear();
        console.log('sliderTV animation has started');
    });
    $('#sliderTV').on('animation:end', function () {
        console.clear();
        console.log('sliderTV animation has finished');
    });
});
