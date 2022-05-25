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
  //form validation
  const formValidation = () => {
    let error = "#error-messages";
    $(error).hide();
    if () {
      
    }
  }

  $("#form").submit(function(event) {
    //prevent default
    //event.preventDefault();
    //serialize
    event.preventDefault();


    //ajax post request
    $.ajax({
      method: "POST",
      url: "http://localhost:8080/tweets",
      data: $(this).serialize(),
      success: (() => {
        loadTweets();
      })
 
    });
  });
  loadTweets();
});



