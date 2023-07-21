const container = document.querySelector(".container"),
 musicImg = container.querySelector(".img-area img"),
 musicName = container.querySelector(".song-details .name"),
 musicArtist = container.querySelector(".song-details.artist");
 mainAudio = container.querySelector("#main-audio");
 playPauseBtn = container.querySelector(".play-pause");
 previousBtn = container.querySelector("#previous");
 nextBtn = container.querySelector("#next");
 progressArea = container.querySelector(".progress-area");
 progressBar = container.querySelector(".progress-bar");
 musicList = container.querySelector(".music-list");
 showMoreBtn = container.querySelector("#more-music");
 hideMusicBtn = container.querySelector("#close");
//  playpause=container.getElementsById("playpause")


 let musicIndex = Math.floor((Math.random() * allMusic.length) + 1);;

 window.addEventListener("load",()=>{
    loadMusic(indexNumb);
    playingNow();
 })

 function loadMusic(indexNumb){
    musicName.innerText = allMusic[indexNumb - 1].name;
    musicArtist.innerText = allMusic[indexNumb - 1].artist;
    musicImg.src = `images/${allMusic[indexNumb - 1].img}.jpg`;
    mainAudio.src = `songs/${allMusic[indexNumb - 1].src}.mp3`;
 }

 function playMusic(){
    container.classList.add("paused");
    playPauseBtn.querySelector("i").innerText = "pause";
    mainAudio.play();
 }

 function pauseMusic(){
    container.classList.remove("paused");
    playPauseBtn.querySelector("i").innerText = "play_arrow";
    mainAudio.pause();
 }

 function nextMusic(){
    musicIndex++;
    musicIndex > allMusic.length ? musicIndex = 1 : musicIndex = musicIndex;
    loadMusic(musicIndex)
    playMusic();
    playingNow();
 }

 function previousMusic(){
    musicIndex--;
    musicIndex < 1 ? musicIndex = allMusic.length : musicIndex = musicIndex;
    loadMusic(musicIndex)
    playMusic();
    playingNow();
 }


 playPauseBtn.addEventListener("click",()=>{
    const isMusicPaused = container.classList.contains("paused");
    isMusicPaused ? pauseMusic() : playMusic();
    playingNow();
 })

 
 nextBtn.addEventListener("click",()=>{
    nextMusic();
 })

 previousBtn.addEventListener("click",()=>{
    previousMusic();
 })

 mainAudio.addEventListener("timeupdate",(e)=>{
    // console.log(e)
    const currentTime = e.target.currentTime;
    const duration = e.target.duration;
    let progressWidth = (currentTime / duration) * 100;
    progressBar.style.width = `${progressWidth}%`;

   //  mainAudio.addEventListener("loadeddata",()=>{
        let musicCurrentTime = container.querySelector(".current")
        let musicDuration = container.querySelector(".duration")

        mainAudio.addEventListener("loadeddata",()=>{

        let audioDuration = mainAudio.duration;
        let totalMin = Math.floor(audioDuration/60)
        let totalSec= Math.floor(audioDuration%60)
        if(totalSec < 10){
            totalSec = `0${totalSec}`;
        }
        musicDuration.innerText = `${totalMin}:${totalSec}`;

      //   let audioDuration = mainAudio.currentTime;
        let currentMin = Math.floor(currentTime / 60)
        let currentSec= Math.floor(currentTime % 60)
        if(currentSec < 10){
            currentSec = `0${currentSec}`;
        }
        musicCurrentTime.innerText = `${currentMin}:${currentSec}`;
    })
 })

 progressBar.addEventListener("click",(e)=>{
   let progressWidthval = progressBar.clientWidth;
   let clickedoffsetX = e.offsetX;
   let songDuration = mainAudio.duration;

   mainAudio.currentTime = (clickedoffSetX / progressWidthval) * songDuration;
   playMusic();
 })

 const repeatBtn = container.querySelector("#repeat-plist");
 repeatBtn.addEventListener("click",()=>{

   let getText = repeatBtn.innerText;
   switch(getText){
      case "repeat": repeatBtn.innerText = "repeat_one";
         repeatBtn.setAttribute("title","song looped")
         break;
      case "repeat_one": repeatBtn.innerText = "shuffle";
         repeatBtn.setAttribute("title","playback shuffle")
         break;
      case "shuffle": repeatBtn.innerText = "repeat";
         repeatBtn.setAttribute("title","playlist looped")
         break;
   }
 })

 mainAudio.addEventListener("ended",()=>{

   let getText = repeatBtn.innerText;
   switch(getText){
      case "repeat": nextMusic();
      loadMusic(musicIndex);
         break;
      case "repeat_one":
          mainAudio.currentTime = 0;
         loadMusic(musicIndex);
         playMusic();
         break;
      case "shuffle":
         let randIndex = Math.floor((Math.random() * allMusic.length) + 1);
         do{
            let randIndex = Math.floor((Math.random() * allMusic.length) + 1);
         }while(musicIndex == randIndex);
         musicIndex = randIndex;
         loadMusic(musicIndex);
         playMusic();
         playingNow();
         break;
   }
 })

 showMoreBtn.addEventListener("click", ()=>{
   ulTag.classList.toggle("show");
 })

 
 hideMusicBtn.addEventListener("click", ()=>{
   showMoreBtn.click();
 })

 const ulTag = container.querySelector("ul");
 for (let i = 0; i<allMusic.length; i++){
   let liTag = ` <li li-index="${i+1}">
   <div class="row">
       <span>${allMusic[i].name}</span>
       <p>${allMusic[i].artist}</p>
   </div>
   <audio class="${allMusic[i].src}" src="songs/${allMusic[i].src}.mp3"></audio>
   <span class="audio-duration">3:40</span>
</li>`;
ulTag.insertAdjacentHTML("beforeend", liTag);

let liAudioDuration = ulTag.querySelector(`#${allMusic[i].src}`);
let liAudioTag = ulTag.querySelector(`.${allMusic[i].src}`);

liAudioTag.addEventListener("loadeddata",()=>{

   let audioDuration = mainAudio.duration;
   let totalMin = Math.floor(audioDuration/60)
   let totalSec= Math.floor(audioDuration%60)
   if(totalSec < 10){
       totalSec = `0${totalSec}`;
   }
   liAudioDuration.innerText = `${totalMin}:${totalSec}`;
   liAudioDuration.setAttribute("t-duration", `${totalMin}:${totalSec}`)
})
 }

 const allliTags = ulTag.querySelectorAll("li");
//  for (let j = 0; j<allliTags.length; j++){

//    if(allliTags[j].getAttribute("li-index") == musicIndex){
//       allliTags[j].classList.add("playing")
//    }
//    allliTags[j].setAttribute("onclick","clicked(this)")
//  }

function playingNow(){
   for (let j = 0; j<allliTags.length; j++){
      let audioTag = allliTags[j].querySelector(".audio-duration")

      if(allliTags[j].classList.contains("playing")){
         allliTags[j].classList.remove("playing");
         // audioTag.innerText = "";
         let adDuration = audioTag.getAttribute("t-duration")
         audioTag.innerText = adDuration;
      }

      if(allliTags[j].getAttribute("li-index") == musicIndex){
         allliTags[j].classList.add("playing")
         audioTag.innerText = "playing"
      }
      allliTags[j].setAttribute("onclick","clicked(this)")
    }

}

 function clicked(element){
   let getLiIndex = element.getAttribute("li-index");
   loadMusic(musicIndex);
   playMusic();
 }