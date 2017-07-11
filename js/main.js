var phrases = new Array('Explore the Infinite &#8902;&#8902;&#8902;&#8902;&#8902;', 'Discover your Pulse &#8902;&#8902;&#8902;&#8902;&#8902;', 'Genius made Simple &#8902;&#8902;&#8902;&#8902;&#8902;', 'Reinvent the Paradigm &#8902;&#8902;&#8902;&#8902;&#8902;', 'Pioneer your Potential &#8902;&#8902;&#8902;&#8902;&#8902;');
var phrase_count = phrases.length;
var phrase_index = undefined;
var phrase_index_prev = phrase_index;
var phrase_index_prev_2 = phrase_index;
var phrase_index_prev_3 = phrase_index;

var current_phrase = undefined; // stores our state - if undefined we are on first load or have reached end of current phrase
var current_word = undefined; // stores our state - if undefined, we are on first load
var word_index = 0;

var initial_delay = 0; // number of milliseconds to delay initially
var word_delay = 4000; // number of milliseconds between words
var phrase_delay = 0; // number of additional milliseconds between phrases

var title_elem = $(".intro h2");
if (typeof do_animate_title == "undefined") do_animate_title = true;

// returns a phrase from an array of phrases. keeps track of current phrase to prevent 2 in a row
function drawPhrase(phrases){
  while (phrase_index === phrase_index_prev || phrase_index === phrase_index_prev_2 || phrase_index === phrase_index_prev_3 ) { // can only reappear at most every 4th time
    phrase_index = Math.floor(Math.random()*(phrase_count));
  }
  var my_phrase = phrases[phrase_index];
  phrase_index_prev_3 = phrase_index_prev_2;
  phrase_index_prev_2 = phrase_index_prev;
  phrase_index_prev = phrase_index;
  return my_phrase;
}

// returns the next word from an array of words or "" if there are no words left
function drawWord(words){
  next_word = words[word_index];
  word_index = (next_word != undefined) ? word_index + 1 : 0; // increment index or set to 0 if at end of word_array
  if (next_word === undefined) return "";
  else return next_word;
}

// animate the title: draw a word according to specified delays then call function to update the title element
function animateTitle(){
  var my_delay, my_word;
  if (current_phrase === undefined) {
    // we're either on a fresh page load or recently completed a phrase
    if (current_word === undefined) {
      // we are on a fresh page load
      my_delay = initial_delay;
    } else {
      // we recently completed a phrase
      my_delay = phrase_delay;
    }
    current_phrase = drawPhrase(phrases).split(" ");
  // we now have an active phrase, so draw a word
  } else {
    my_delay = word_delay;
  }
  // update the title after the necessary delay
  setTimeout(function(){
    current_word = drawWord(current_phrase);
    if (current_word == "") {
      // we just reached the end of the phrase we were on
      current_phrase = undefined;
    } else {
      title_elem.removeClass('slide_anim');
      title_elem.offset(); // this triggers reflow to make CSS animate again https://css-tricks.com/restart-css-animation/
      title_elem.html(current_word).addClass('slide_anim');
    }
    animateTitle();
  }, my_delay);
}

function activateMenu(){
  $('.nav_rocket a').click(function(e){
    e.preventDefault();
    $('.intro').hide();
    $('.menu').show();
  });
}

$(function() {
  if (do_animate_title) {
    animateTitle();
  }
  activateMenu();
});
