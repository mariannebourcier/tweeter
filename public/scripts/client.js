/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

//connect to document
$(document).ready(() => {
  //render tweets in string
  const renderTweets = (tweets) => {
    for (let tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $("#tweets-container").prepend($tweet);
    }
  };
  //fetch tweets data
  const createTweetElement = (tweetData) => {
    const user = tweetData.user;
    const content = tweetData.content;
    const time = tweetData.created_at;

    const $tweetElement = `
    <article class='tweet-container'>
    <header>
    <div>
      <i class="fa-solid fa-kiwi-bird"></i> 
      <span>${user.name}</span>
    </div>
    <p class="user-id">${user.handle}</p>
  </header>
  <p class="tweet-text-log">${content.text}</p>
  <footer>
    <time>${tweetTime.format(time)}</time>
    <div class="interaction-icons-container">
      <a href="#"><i class="flag-icon fa-solid fa-flag"></i></a>
      <a href="#"><i class="retweet-icon fa-solid fa-retweet"></i></i></a>
      <a href="#"><i class="heart-icon fa-solid fa-heart"></i></i></a>
    </div>
  </footer>
</article>`;
    return $tweetElement;

  };

});




//tweets
  [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png",
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1651956573576
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd"
      },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1652042973576
    }
  ]

// Test / driver code (temporary). Eventually will get this from the server.
const tweetData = {
  "user": {
    "name": "Newton",
    "avatars": "https://i.imgur.com/73hZDYK.png",
    "handle": "@SirIsaac"
  },
  "content": {
    "text": "If I have seen further it is by standing on the shoulders of giants"
  },
  "created_at": 1461116232227
}

const $tweet = createTweetElement(tweetData);

// Test / driver code (temporary)
console.log($tweet); // to see what it looks like
$('#tweets-container').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.
