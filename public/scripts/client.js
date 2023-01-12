/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function () {
  $("#error-empty").hide();
  $("#error-long").hide();

  const renderTweets = (tweets) => {
    $("#tweet-container").empty();
    for (let tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $("#tweet-container").append($tweet);
    }
  };

  // create jquery for submitting tweet
  $(".submit-tweet").on("submit", function (event) {
    event.preventDefault();
    const maxChar = 140;
    const myTweet = $("#tweet-text").val();
// if there is no tweet characters sends error codes
    if (!myTweet) {
      $("#error-long").hide();
      $("#error-empty").slideDown("slow").delay(10000).slideUp("slow");

    } else if (myTweet.length - maxChar > 0) {
      $("#error-empty").hide();
      $("#error-long").slideDown("slow").delay(1000).slideUp("slow");;


    } else {
      const newTweet = $(this).serialize();
      $("#tweet-text").val("")
      $.post("/tweets/", newTweet, () => {});
      loadTweets();
    }
  });

  const loadTweets = function () {
    $.get("/tweets/", function (newTweet) {
      renderTweets(newTweet.reverse());
    });
  };



// loading tweets to the browser in the same style but not edit feature
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
          </script>
          <p id="tweet-new" class="field-left"> ${tweet.content.text} </p>
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

