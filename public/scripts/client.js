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

  //nav toggle
  $("#nav-toggle").click(function() {
    $("#new-tweet").toggle("slow", function() {
    });
  });

  //new tweet
  //event listener
  //form validation
  const tweetValidation = (length) => {
    let tweetContent = $("#tweet-text").val();
    length = tweetContent.length;
    console.log(length);
    let error = "#error-messages";

    $(error).hide();


    if (length > 140) {
      $(error).slideDown(500).text("Your tweet is too long!");
      return false;
    }
    if (length < 1) {
      $(error).slideDown(500).text("Tell us more..");
      return false;
    }
    return true;
  };

  $("#form").submit(function(event) {
    event.preventDefault();
    let tweetContent = $("#tweet-text").val();
    let length = tweetContent.length;

    //check if tweet valid
    const validTweet = tweetValidation(length);
    if (!validTweet) return;


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



