/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function () {
  // Test / driver code (temporary). Eventually will get this from the server.
  const data = [
    {
      user: {
        name: "Newton",
        avatars: "https://i.imgur.com/73hZDYK.png",
        handle: "@SirIsaac",
      },
      content: {
        text: "If I have seen further it is by standing on the shoulders of giants",
      },
      created_at: 1461116232227,
    },
    {
      user: {
        name: "Descartes",
        avatars: "https://i.imgur.com/nlhLi3I.png",
        handle: "@rd",
      },
      content: {
        text: "Je pense , donc je suis",
      },
      created_at: 1461113959088,
    },
  ];

  const renderTweets = function (tweets) {
    $("#tweet-container").empty();
    for (let tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $("#tweet-container").append($tweet);
    }
  };

  const createTweetElement = function (tweet) {
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
          <span id="time-stamp">${tweet.content.created_at}</span>
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
  };
  renderTweets(data);
});
