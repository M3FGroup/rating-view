RatingView
=========

## Available options.
> 
> 1.    current
>>      set current rate to Rating View
> 2.    totalScore
>>      set total score, max of score
> 3.    rateCount
>>      set how much of rate to render
> 4.    direction
>>      set direction rtl|ltr
> 5.    color
>>      set color of each rate element
> 6.    rateClass
>>1.    full
>>>     set class for each full rate element
>>2.    half
>>>     set class for each half rate element
>>3.    empty
>>>     set class for each empty rate element
> 7.    change
>>      a function fire after change selected rate element,
> 8.    hover
>>      a function fire after hover rate element,
> 9.    readonly
>>      readonly option, if set true, rating view, can not set data in view, but can set with program
             
## Available function
>>1. setValue()
>>> function set score to rating view,
>>2. getValue()
>>> function get selected score from rating view,
> 
> Here's some example code:
> 
       var ratingView = new RatingView('.star', {
                 current: 0, totalScore: 10, rateCount: 5, direction: 'rtl', color: '#E4A70A', rateClass: {
                     full: 'fa fa-star fa-lg',
                     half: 'fa fa-star-half-o fa-lg',
                     empty: 'fa fa-star-o fa-lg'
                 }, change: function (data) {
                     console.log(data);
                 },
                 hover: function (data, hoverData) {
                     console.log(data, hoverData);
                 }
             });             
        setTimeout(function(){
            console.log('Rate value from function: ',ratingView.getValue());
        },2000);
        setTimeout(function(){
            ratingView.setValue(1.5);
        },4000);

## Created By M3F Group
