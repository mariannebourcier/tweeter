//document ready
$(document).ready(() => {
  //create tweet
   //fetch tweets data
   const createTweetElement = (tweetData) => {
    const user = tweetData.user;
    const content = tweetData.content;
    const time = tweetData.created_at;

    const $tweetElement = `
    <article id='tweet-container'>
    <header>
    <div>
      <img src="${user.avatars}"> 
      <span>${user.name}</span>
    </div>
    <p class="user-id">${user.handle}</p>
  </header>
  <p class="tweet-text-log">${content.text}</p>
  <footer>
    <span>${timeago.format(time)}</span>
    <div class="interaction-icons-container">
      <a href="#"><i class="flag-icon fa-solid fa-flag"></i></a>
      <a href="#"><i class="retweet-icon fa-solid fa-retweet"></i></i></a>
      <a href="#"><i class="heart-icon fa-solid fa-heart"></i></i></a>
    </div>
  </footer>
</article>`;
    return $tweetElement;
  };
  
   //render tweets in string
   const renderTweets = (tweets) => {
    for (let tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $("#tweet-container").prepend($tweet);
    }
  };

   //get tweets
   const loadTweets = () => {
    $.getJSON("/tweets").done(function (tweets) {
      $("#tweet-container").empty();
      renderTweets(tweets);
    });
  };

  //new tweet
  //event listener
  $( "form" ).submit('click', ( event ) => {
    //prevent default
    event.preventDefault();
    //serialize
    const tweet = $(this).serialize();

    if (tweet.length > 141) return alert("Too many characters. Keep it at 140.");
    if (tweet.length < 2) return alert("Tell us what's on your mind. Nobody's judging.");

    $.post("/tweets", tweet).success(() => {
      loadTweets();
    });
  });
 
});


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
