/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function () {

  $("#error-empty").hide();
  $("#error-long").hide();

  const data = [];


  const renderTweets = (tweets) => {
    $("#tweet-container").empty();
    for (let tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $("#tweet-container").append($tweet);
    }
  };

    $('.submit-tweet').on('submit', function(event){
      event.preventDefault();
      const maxChar = 140;
      const myTweet =  $("#tweet-text").val()

    if (!myTweet) {
      $("#error-empty").slideDown("slow");
      $("#error-long").hide();
      console.log("test")
    } else if (myTweet.length - maxChar > 0) {
      $("#error-long").slideDown("slow");
      $("#error-empty").hide();
      console.log("test2")
    } else {
      const newTweet = $(this).serialize();
      $.post("/tweets/", newTweet, () => {
      });
      loadTweets();
    }
    });

    const loadTweets = function() {
      $.get("/tweets/", function(newTweet) {
        renderTweets(newTweet.reverse());
      });
    };

    loadTweets();


  function createTweetElement(tweet) {
    let $tweet = $(`
  <article>
<div id="tweet-containers">
      <header id="new-tweetheader">
      <div id="top-newtweet">
        <span><img class="user-icon" src=${tweet.user.avatars}></img></span>
        <span> ${tweet.user.name}</span>
      </div>
      <div>
            <span>${tweet.user.handle}</span>
          </div>
          </header>
          <input type="text" value="${tweet.content.text}" id="tweet-new" class="field left" readonly>
      <footer>
      <div id="bottom_newtweet">
      <span id="time-stamp">${timeago.format(tweet.created_at)}</span>
          <span id="retweet">
           <i class="retweet fa-solid fa-retweet"></i>
           <i class="retweet fa-solid fa-flag"></i>
          <i class="retweet fa-solid fa-heart"></i>
          </span>
      </div>
      </footer>

</div>


</article>`);
    return $tweet;
  }
  renderTweets(data);
});
