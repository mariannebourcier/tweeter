/* eslint-disable no-undef */
//document ready
$(document).ready(() => {
  //escape function to make tweet input safe
  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };
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
  <p class="tweet-text-log">${escape(content)}</p>
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
    $.getJSON("/tweets/").done((tweets) => {
      $("#tweet-container").empty();
      renderTweets(tweets);
    });
    console.log(loadTweets());
  };

  //new tweet
  //event listener
  $( "form" ).on('submit', ( event ) => {
    //prevent default
    //event.preventDefault();
    //serialize
    const tweet = $(this).serialize();

    //form validation
    
    //"" or empty
    //too long

    //ajax post request
    $.ajax({
      type: "POST",
      url: "/tweets",
      data: loadTweets(),
      dataType: "json",
      encode: true
    }).done((tweet) => {
      console.log(tweet);
    });
    if (tweet.length > 141) return alert('Too many characters...');
    if (tweet === "") return alert("Don't be shy, tell us more!");

    event.preventDefault();
    // $.post("/tweets", tweet).success(() => {
    //   loadTweets();
    // });
  });
 
});


// // Test / driver code (temporary). Eventually will get this from the server.
// const tweetData = {
//   "user": {
//     "name": "Newton",
//     "avatars": "https://i.imgur.com/73hZDYK.png",
//     "handle": "@SirIsaac"
//   },
//   "content": {
//     "text": "If I have seen further it is by standing on the shoulders of giants"
//   },
//   "created_at": 1461116232227
// }

// const $tweet = createTweetElement(tweetData);

// // Test / driver code (temporary)
// console.log($tweet); // to see what it looks like
// $('#tweets-container').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.
