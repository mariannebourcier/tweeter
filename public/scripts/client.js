//Document ready
$(document).ready(() => {
  //Escape function to make tweet input safe
  const escape = function(str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  //Create a new tweet
  const createTweetElement = (tweetData) => {
    const user = tweetData.user;
    const content = escape(tweetData.content.text);
    const time = tweetData.created_at;

    const $tweetElement = `
    <section id='tweets-container'>
    <div id="single-tweet">
      <header id="user">
          <img src="${user.avatars}"> 
          <span>${user.name}</span>
        <div class="user-id">${user.handle}</div>
      </header>
      <div class="tweet-text-log">${content}</div>
      <hr>
      <footer>
        <span class="time">${timeago.format(time)}</span>
        <div class="interaction-icons-container">
          <a href="#"><i class="flag-icon fa-solid fa-flag"></i></a>
          <a href="#"><i class="retweet-icon fa-solid fa-retweet"></i></i></a>
          <a href="#"><i class="heart-icon fa-solid fa-heart"></i></i></a>
        </div>
      </footer>
      </div>
    </section>`;
    return $tweetElement;
  };


  //Render tweets on webpage
  const renderTweets = (tweets) => {
    for (let tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $("#tweets-container").prepend($tweet);
    }
  };


  //View all tweets
  const loadTweets = () => {
    $.getJSON("/tweets/").done((tweets) => {
      $("#tweets-container").empty();
      renderTweets(tweets);
    });
  };


  //Hide/show the new tweet section
  $("#nav-toggle").click(function() {
    $("#new-tweet").toggle("slow", function() {
    });
  });


  //Validate a new tweet before posting
  const tweetValidation = (length) => {
    let tweetContent = $("#tweet-text").val();
    length = tweetContent.length;
    let error = "#error-messages";

    $(error).hide();


    if (length > 140) {
      $(error).show();
      $(error).slideDown(500).text("Your tweet is too long!");
      return false;
    }
    if (length < 1) {
      $(error).show();
      $(error).slideDown(500).text("Tell us more..");
      return false;
    }
    $(error).hide();
    return true;
  };

  //Submit tweet and render on webpage
  $("#form").submit(function(event) {
    event.preventDefault();
    let tweetContent = $("#tweet-text").val();
    let length = tweetContent.length;

    //Validate tweet before submitting
    const validTweet = tweetValidation(length);
    if (!validTweet) return;


    //Post request
    $.ajax({
      method: "POST",
      url: "http://localhost:8080/tweets",
      data: $(this).serialize(),
      success: (() => {
        loadTweets();
        $("form")[0].reset();
        $("tweet-text").reset();
      })
    });
  });
  loadTweets();
});



