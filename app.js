const video = "https://www.googleapis.com/youtube/v3/videos?";  //will fetch the video details , date , desc , channel name , video tittle  channel icon will not be fetched 
const channel = "https://www.googleapis.com/youtube/v3/channels?" // will fetch the channek icon 



const API_KEY = "AIzaSyBdqJx5AX6stHpEpI_JTAk2-GlxMJNoFTE"; // replace with your actual API key

const mainVideoContainer = document.getElementById("mainVideoContainer");



// fetch the real time video data 

function fetchVideos() {

    fetch(video + new URLSearchParams({

        key: API_KEY,
        part: "snippet",
        chart: "mostPopular",
        maxResults: 50,
        regionCode: "IN"

    })).then(res => res.json())
        .then(data => {
           data.items.forEach(videoData => { //50 set of data 
               getChannelIcon(videoData);
           });
        })

}




function getChannelIcon(videoData) {

    fetch(channel + new URLSearchParams({
        key: API_KEY,
        part: "snippet",
        id: videoData.snippet.channelId

    })).then(res => res.json()).then(data =>{
        //append the channel icon to the basic detail 
        videoData.channelThumbnail = data.items[0].snippet.thumbnails.default.url;


        //complete data basic data + channel icon

        makeVideoCard( videoData);

        //make cards
    }).catch(err => console.log(err))

}


window.onload = function () {
    fetchVideos();
}



function makeVideoCard(videoData){ // this will create the video card and append it to the main container

const videoCard = document.createElement("div")
videoCard.className = "video";

videoCard.innerHTML = `
<img src="${videoData.snippet.thumbnails.high.url}" alt="" class="thumbnail">
<div class="content">
    <img src="${videoData.channelThumbnail}" alt="" class="channel-icon">
    <div class="info">
        <h4 class="title">${videoData.snippet.title}</h4>
        <p class="channel-name">${videoData.snippet.channelTitle}</p>
    </div>
</div>
`;


mainVideoContainer.appendChild(videoCard);

}



