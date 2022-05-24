/* eslint-disable no-undef */
//document ready
$(document).ready(() => {
  //escape function to make tweet input safe
  const escape = function(str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };
  //create tweet
  //fetch tweets data
  const createTweetElement = (tweetData) => {
    const user = tweetData.user;
    const content = escape(tweetData.content.text);
    console.log(content);
    // const content = escape(tweetData.content);
    const time = tweetData.created_at;

    const $tweetElement = `
    <article id='tweets-container'>
      <header>
        <div>
          <img src="${user.avatars}"> 
          <span>${user.name}</span>
        </div>
        <div class="user-id">${user.handle}</div>
      </header>
      <div class="tweet-text-log">${content}</div>
      <footer>
        <span class="time">${timeago.format(time)}</span>
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
      $("#tweets-container").prepend($tweet);
    }
  };

  //get tweets
  const loadTweets = () => {
    $.getJSON("/tweets/").done((tweets) => {
      $("#tweets-container").empty();
      renderTweets(tweets);
    });
  };

  //new tweet
  //event listener

  $("#form").submit(function(event) {
    //prevent default
    //event.preventDefault();
    //serialize
    event.preventDefault();
    // const text = $("#tweet-text").val();
    // const body = {text};
    //form validation
    // $("#tweet-text").validate({
    //   rules: {
    //     tweet: {
    //       required: true,
    //       minlength: 1,
    //       maxlength: 240
    //     },
    //     messages: {
    //       required: "Let us know what's on your mind. Don't be shy!",
    //       minlength: "Your tweet needs to be more than 1 character.",
    //       maxlength: "Your tweet is too long!"
    //     }
    //   }
    //   //submit to show error message
    // });
    //"" or empty
    //too long
    //toggle & slide down

    //ajax post request
    $.ajax({
      method: "POST",
      url: "http://localhost:8080/tweets",
      data: $(this).serialize(),
      success: (() => {
        loadTweets();
      })
      // $.post("/tweets", tweet).done(() => {
      //   loadTweets();
      // });

      //event.preventDefault();
      // $.post("/tweets", tweet).success(() => {
      //   loadTweets();
      // });
    });
  });
  loadTweets();
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