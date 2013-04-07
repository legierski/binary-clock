(function (window, $, undefined) {

    "use strict";

    var

    interval = null,

    html = {

        clock : function () {

            var html_section = String() +
                '<div class="dot" data-position="6"></div>' +
                '<div class="dot" data-position="5"></div>' +
                '<div class="dot" data-position="4"></div>' +
                '<div class="dot" data-position="3"></div>' +
                '<div class="dot" data-position="2"></div>' +
                '<div class="dot" data-position="1"></div>';

            var html = String() +
                '<div class="binary-clock">' +
                    '<div class="hours">' +
                        html_section +
                    '</div>' +
                    '<div class="minutes">' +
                        html_section +
                    '</div>' +
                    '<div class="seconds">' +
                        html_section +
                    '</div>' +
                    '<div class="day"></div>' +
                '</div>';

            return html;
        }
    },

    binary_clock = {

        init : function () {

            append_clock();
            refresh_clock();
            set_interval();
        }
    },

    append_clock = function () {

        $('body').append(html.clock);
    },

    refresh_clock = function () {

        var time = new Date();

        var hours   = time.getHours();
        var minutes = time.getMinutes();
        var seconds = time.getSeconds();

        display(hours,   'hours');
        display(minutes, 'minutes');
        display(seconds, 'seconds');

        display_day();
    },

    display = function (number, section) {

        reset_section(section);

        var number_bin = convert_dec_to_bin(number);

        for(var i in number_bin) {

            var position = number_bin.length - i;

            var dot = $('.'+section+' .dot[data-position="'+position+'"]');

            if(number_bin[i] === '1') {
                dot.addClass('full');
            }
            else {
                dot.removeClass('full');
            }
        }
    },

    reset_section = function (section) {

        $('.'+section+' .dot').removeClass('full');
    },

    convert_dec_to_bin = function (dec) {

        dec = parseInt(dec);
        var bin = dec.toString(2);

        return bin;
    },

    display_day = function () {

        var time = new Date();
        var day = time.getDay();
        var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

        $('.day').html(days[day]);
    },

    set_interval = function () {

        interval = setInterval(refresh_clock, 500);
    }

    ;

    // Expose binary_clock to the global object
    window.binary_clock = binary_clock;

}(this, jQuery));
