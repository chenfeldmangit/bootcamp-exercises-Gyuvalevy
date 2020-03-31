const centerPageElementId = "center-page";
const homePageElementId = "homepage-center";
const loadingCenterElementId = "loading-center";
const profilePageElementId = "profile-center";

const homeLinkElementId = "left-menu-home-link";
const profileLinkElementId = "left-menu-profile-link";

const profileInfo = {
    name: "Yuval Levy",
    mention: "yuvalevy",
    approved: false,
    description: "Welcome to my profile! I am Yuval",
    address: "Tel Aviv",
    homelink: "yuvalevy.com",
    following: 231,
    followers: 155,
    imgSrc: 'https://lh3.googleusercontent.com/-gJS19so4rY4/AAAAAAAAAAI/AAAAAAAAAAA/AKF05nB49lJKdInn1oTmsEQ5pA5HC8OlCw.CMID/s83-c/photo.jpg',
};

const profileInfo_Beni = {
    name: "Benny Gantz",
    approved: true,
    mention: "gantzbe",
    description: "נשוי לרויטל ואבא ל-4 ילדים. הרמטכ\"ל ה- 20 של צה\"ל \n" +
        ". יו\"ר \"כחול לבן\" \n" ,
    imgSrc: 'https://pbs.twimg.com/profile_images/1156850474110345216/FWeRQirQ_bigger.jpg',
    address: "Tel Aviv",
    homelink: "beni.com",
    following: 23,
    followers: 1000,
};

function getDisplay(displayOn, toDisplay) {
    return toDisplay ? displayOn : 'none';
}

function getDisplayBlock(toDisplay) {
    return getDisplay('block', toDisplay);
}

function getSwitchCenterView(pageElementId) {
    return () => {
        let homeCenterElement = document.getElementById(centerPageElementId);
        for (const childNode of homeCenterElement.children) {
            if (childNode.id === pageElementId)
                childNode.style.display = "block";
            else
                childNode.style.display = "none";
        }
    }
}

function populateProfile() {

    const root = document.getElementById(profilePageElementId);
    const { name, mention, following, followers, address, description, homelink, imgSrc } = profileInfo;

    root.querySelector("#profile-name").innerHTML = name;
    root.querySelector("#profile-mention").innerHTML = "@" + mention;
    root.querySelector("#profile-description").innerHTML = description;
    root.querySelector("#profile-communication-address").innerHTML = address;
    root.querySelector("#profile-communication-hyperlink").innerHTML = homelink;
    root.querySelector("#profile-followers").innerHTML = following;
    root.querySelector("#profile-following").innerHTML = followers;

    document.getElementById('profileImage').setAttribute('src', imgSrc);
    document.getElementById('profileProfileImage').setAttribute('src', imgSrc);

}

function setLoading(on) {
    document.getElementById(loadingCenterElementId).style.display = getDisplayBlock(on);
    document.getElementById(centerPageElementId).style.display = getDisplayBlock(!on);
}

async function loadTweets() {
    await Tweets.renderTweetsOnLoad();
    setLoading(false);
}

function setClicks() {
    document.getElementById(homeLinkElementId).onclick = getSwitchCenterView(homePageElementId);
    document.getElementById(profileLinkElementId).onclick = getSwitchCenterView(profilePageElementId);
    document.getElementById('add-tweet-button').onclick = Tweets.addTweet(profileInfo);
    document.getElementById('search-tweet').oninput =
        (event) => Tweets.searchTweets(event.target.value);
}

window.onload = function (ev) {

    setLoading(true);

    setClicks();

    populateProfile();
    getSwitchCenterView(homePageElementId)();
    // TweeterLocalStorage.populateLocalStorage();
    loadTweets();
};


