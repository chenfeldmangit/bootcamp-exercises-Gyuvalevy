
const KEY_TWEETS = 'tweets';

class TweeterLocalStorage {
    static populateLocalStorage = () => {
        let initialTweets = [
            {
                profileInfo: {
                    name: "Benny Gantz",
                    approved: true,
                    mention: "gantzbe",
                    imgSrc: 'https://pbs.twimg.com/profile_images/1156850474110345216/FWeRQirQ_bigger.jpg',
                },
                actions: {
                    comments: 117,
                    retweets: 31,
                    likes: 300,
                },
                tweetTime: '1h',
                tweet: 'הדגשתי שראוי לחברי הכנסת לשמש דוגמה לציבור בישראל ולהוכיח כי ניתן לתפקד גם בעת משבר, תוך הפגנת אחריות והקפדה על הוראות משרד הבריאות, בין אם בקיום ישיבות בשיחות וידאו או בפתרונות יצירתיים אחרים.',
            },
            {
                profileInfo: {
                    name: "Yuval Levy",
                    approved: false,
                    mention: "yuvalevy",
                    imgSrc: 'https://lh3.googleusercontent.com/-gJS19so4rY4/AAAAAAAAAAI/AAAAAAAAAAA/AKF05nB49lJKdInn1oTmsEQ5pA5HC8OlCw.CMID/s83-c/photo.jpg',
                },
                actions: {
                    comments: 117,
                    retweets: 31,
                    likes: 300,
                },
                tweetTime: '2h',
                tweet: 'HALAS Corona! מה יהיה!?!',
            },
        ];

        localStorage.setItem(KEY_TWEETS, JSON.stringify(initialTweets))
    };

    static appendTweetLocalStorage = (newTweet) => {
        let tweets = JSON.parse(localStorage.getItem(KEY_TWEETS));
        tweets.splice(0, 0, newTweet);
        localStorage.setItem(KEY_TWEETS, JSON.stringify(tweets));
    };

    static changeTweetLocalStorage = (tweet, index) => {
        let tweets = JSON.parse(localStorage.getItem(KEY_TWEETS));
        tweets[index] = tweet;
        localStorage.setItem(KEY_TWEETS, JSON.stringify(tweets));
    };

    static getKeyTweets = () => { return KEY_TWEETS };

}