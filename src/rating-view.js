/**
 * Created by M3F on 11/3/2015.
 */
var RatingView = function (element, options) {
    var elementStar = $(element);
    var $rateView = $('<div class="rate-view">');
    var $rateSelector = $('<div class="rate-selector" style="display: inline-block;position:absolute;top:0;">');
    var maxRate = options.rateCount || 5;
    var rateValue = options.current || 0;
    var totalScore = options.totalScore || 10;
    var direction = options.direction || 'ltr';
    var color = options.color || '#E4A70A';
    var readonly = options.readonly || false;
    var rateClass = options.rateClass || {
            full: 'fa fa-star fa-lg',
            half: 'fa fa-star-half-o fa-lg',
            empty: 'fa fa-star-o fa-lg'
        };
    var score = (totalScore / maxRate) / 2; //each score of each selector element

    var change = options.change || function () {
        };
    var hover = options.hover || function () {
        };
    this.setValue = function (value) {
        renderStar(value);
    };
    this.getValue = function () {
        return rateValue;
    };

//         public
//        var setValue = function (value) {
//            renderStar(value);
//        };
//        var getValue = function () {
//
//        };


    function renderStar(selectedValue) {
        if (selectedValue == undefined) {
            selectedValue = rateValue;
        }
        var FullStar = Math.floor(selectedValue / (score * 2));
        var HalfStar = Math.round((selectedValue / (score * 2)) % 1);
        var EmptyStar = Math.abs(Math.round(selectedValue / (score * 2)) - maxRate) - 1;

        //var $tempDiv=$('<div>');
        $rateView.html('');
        for (var j = 0; j <= EmptyStar; j++) {
            var $emptyDiv = $('<div>')
                .css('color', color)
                .addClass(rateClass.empty);
            $rateView.prepend($emptyDiv);
            //data += '<div style="color: #E4A70A;" class="fa fa-star-o fa-lg"></div>';
        }
        if (HalfStar > 0) {
            var $halfDiv = $('<div>')
                .css('color', color)
                .addClass(rateClass.half);
            if (direction == 'rtl')
                $halfDiv.css('transform', 'rotateY(180deg)');
            $rateView.prepend($halfDiv);

            //data += '<div style="color: #E4A70A;" class="fa fa-star-half-o fa-lg"></div>';
        }
        for (var k = 0; k < FullStar; k++) { //full star
            var $fullDiv = $('<div>')
                .css('color', color)
                .addClass(rateClass.full);
            $rateView.prepend($fullDiv);
            //data += '<div style="color: #E4A70A;" class="fa fa-star fa-lg"></div>';
        }
        //$rateView.html($tempDiv);

    }

    function selectorCreate() {
        if (direction == 'ltr') {
            $rateSelector.css('left', 0);
        } else if (direction == 'rtl') {
            $rateSelector.css('right', 0);
        }
        var width = $rateView.width();
        var height = $rateView.height();
        var selectorWidth = width / ((maxRate * 2) + 1);
        var selectorHeight = height + 5;

        $rateSelector.width(width + selectorWidth);
        $rateSelector.height(height);

        var currentScore = 0;
        for (var i = 0; i < (maxRate * 2) + 1; i++) {
            var $div = $('<div data-star="' + currentScore + '">');
            $div.width(selectorWidth);
            $div.height(selectorHeight);
            $div.css('display', 'inline-block');

            if (!readonly) {
                $div.css('cursor', 'pointer');
                $div.click(function () {
                    rateValue = $(this).attr('data-star');
                    renderStar(rateValue);
                    if (typeof change == 'function')
                        change(rateValue);
                });

                $div.hover(function () {
                    var hData = $(this).attr('data-star');
                    renderStar(hData);

                    if (typeof hover == 'function')
                        hover(rateValue, hData);
                });
            }
            $rateSelector.append($div);
            currentScore += score;
        }

        $rateSelector.mouseout(function () {
            renderStar();
        });
    }

    function render() {
        elementStar.css('display', 'inline-block')
            .css('position', 'relative');


        renderStar();
        elementStar.append($rateView);
        selectorCreate();
        elementStar.append($rateSelector);
        elementStar.css('direction', direction);
    }

    render();

};