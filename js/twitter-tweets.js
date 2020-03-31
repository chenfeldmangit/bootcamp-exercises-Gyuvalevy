class Tweets {
    static populateTweet = (root, tweetElement) => {
        const {profileInfo, actions, tweetTime, tweet} = tweetElement;

        root.querySelector(".profile-picture").setAttribute('src', profileInfo.imgSrc);
        root.querySelector(".profile-name a").innerHTML = profileInfo.name;
        root.querySelector(".approved").style.display = profileInfo.approved ? 'inline' : 'none';
        root.querySelector(".profile-mention").innerHTML = '@' + profileInfo.mention;

        root.querySelector(".post-time").innerHTML = tweetTime;
        root.querySelector(".post-content").innerHTML = tweet;

        root.querySelector(".post-actions .comments span").innerHTML = actions.comments;
        root.querySelector(".post-actions .retweets span").innerHTML = actions.retweets;
        root.querySelector(".post-actions .likes span").innerHTML = actions.likes;

        return root;
    };

    static renderTweets = () => {
        let tweets = JSON.parse(localStorage.getItem('tweets'));

        let feedPostsElement = document.getElementById('feed-posts');
        feedPostsElement.innerHTML = "";

        let feedPostTemplateElement = document.getElementById('template-feed-post');

        for (let i in tweets) {
            let clonedNode = feedPostTemplateElement.content.cloneNode(true);
            let newTweet = Tweets.populateTweet(clonedNode, tweets[i]);
            feedPostsElement.appendChild(newTweet);
        }
    };

    static renderTweetsOnLoad =
        () => new Promise(
            (resolve) => {
                setTimeout(
                    () => {
                               Tweets.renderTweets();
                               resolve();
                    }, 5000);
            });

    static addTweet = (profile) => {
        return (e) => {
            let textAreaElement = document.getElementById('add-tweet-text-area');
            textAreaElement.disabled = true;
            let content = textAreaElement.value;

            let newTweet = {
                profileInfo: {
                    name: profile.name,
                    approved: profile.approved,
                    mention: profile.mention,
                    imgSrc: profile.imgSrc,
                },
                actions: {
                    comments: 0,
                    retweets: 0,
                    likes: 0,
                },
                tweetTime: 'now',
                tweet: content,
            };

            TweeterLocalStorage.appendTweetLocalStorage(newTweet);
            textAreaElement.value = '';
            textAreaElement.disabled = true;
            Tweets.renderTweets();
        }
    };
}