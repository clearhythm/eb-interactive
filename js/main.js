var titles = new Array('Explore', 'Discover', 'Genius', 'Inspire');
var title_count = titles.length;
var title_index = 0;
var title_index_prev = title_index;
var title_interval = 4000;
if (typeof do_animate_title == "undefined") do_animate_title = true;

function drawRandomTitle(){
    return Math.floor(Math.random()*(title_count));
}

function animateTitle(title){
    var jqe = $(".intro h2");
    jqe.removeClass('slide_anim');
    jqe.offset(); // this triggers reflow to make CSS animate again https://css-tricks.com/restart-css-animation/
    jqe.html(title).addClass('slide_anim');
    newTitle();
    // var char_counter = 0;
    // var title_length = title.length;
    // var jqe = $(".desc-wrapper p > strong, .desc-wrapper p > em > strong");
    // jqe.html('&nbsp;'); // clear out title
    // var intervalID = window.setInterval(function () { // then animate it
    //     my_char = title.substring(char_counter,char_counter+1);
    //     if (my_char == '&') my_char = ' &amp; '; // make it output syntactically correct ampersand
    //     jqe.append(my_char);
    //     if (++char_counter === title_length) {
    //         window.clearInterval(intervalID);
    //         newTitle();
    //     }
    // }, title_chars_interval);
}

function newTitle(){
  setTimeout(function(){
    while (title_index === title_index_prev) { // prevent 2 in a row
        title_index = drawRandomTitle();
    }
    title_index_prev = title_index;
    var new_title = titles[title_index];
    animateTitle(new_title);
  }, title_interval);
}

function activateMenu(){
  $('.nav_rocket a').click(function(e){
    e.preventDefault();
    $('.intro').hide();
    $('.menu').show();
  });
}

$(function() {
  if (do_animate_title) newTitle();
  activateMenu();
});
