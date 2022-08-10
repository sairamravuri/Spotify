console.log('welcome to spotify');


//intialize the variables 
let songIndex=0;
let audioElement = new Audio('Yemunnave Pilla.mp3');
let masterPlay=document.getElementById('masterPlay');
let myProgressBar=document.getElementById('bottomBar');
let gif=document.getElementById('gif');
let songname=document.getElementById('songname');
let songitems=Array.from(document.getElementsByClassName('songitem'));


let songs=[
    {
        songName: "Yemunnave Pilla",
        filePath:"Yemunnave Pilla.mp3",
        coverPath:"ypbg.jpg",
    },
    {
        songName: "Inkem Inkem Inkem Kaavaale",
        filePath:"Inkem Inkem Inkem Kaavaale.mp3",
        coverPath:"inkem inkem.jpg"
    },
    {
        songName: "Nuvvunte Naa Jathagaa",
        filePath:"Nuvvunte Naa Jathagaa.mp3",
        coverPath:"I-Manoharudu.jpg"
    },
    {
        songName: "Srivalli",
        filePath:"Srivalli.mp3",
        coverPath:"srivalli.jpg"
    },
    {
        songName: "Emai Poyave",
        filePath:"Emai Poyave.mp3",
        coverPath:"Emai-Poyave.jpg"
    },
    {
        songName: "Vellipomaake",
        filePath:"Vellipomaake.mp3",
        coverPath:"Sahasam-Swasaga.jpg"
    },
    {
        songName: "Samajavaragamana",
        filePath:"Samajavaragamana.mp3",
        coverPath:"Samajavaragamana.jpg"
    },
    {
        songName: "Maate Vinadhuga",
        filePath:"Maate Vinadhuga.mp3",
        coverPath:"Taxiwala.jpg"
    },
    {
        songName: "Leharaayi",
        filePath:"Leharaayi.mp3",
        coverPath:"leharaayi.jpg"
    },
    {
        songName: "Naa Kosam",
        filePath:"Naa Kosam.mp3",
        coverPath:"Bangarraju.jpg"
    }
]


songitems.forEach(function(element,i)
{
    element.getElementsByTagName("img")[0].src=songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText=songs[i].songName;
});

// audioElement.play();

//play/pause click
var allplay=function()
{
        var playing=songname.innerText;
        var temp=0;
        for(var i=0;i<songs.length;i++)
        {
            if(songs[i].songName==playing)
            {
                temp=i;
            }
        }
        Array.from(document.getElementsByClassName('songItemPlay')).forEach(function(element)
        {
            var index=element.id;
            if(index==temp)
            {
                element.classList.remove('fa-play');
               element.classList.add('fa-pause');
            }
        })
}
masterPlay.addEventListener('click',function()
{
    if(audioElement.paused || audioElement.currentTime<=0)
    {
        audioElement.play();
        masterPlay.classList.remove("fa-play");
        masterPlay.classList.add("fa-pause");
        gif.style.opacity=1;
        allplay();
    }
    else
    {
        audioElement.pause();
        masterPlay.classList.remove("fa-pause");
        masterPlay.classList.add("fa-play");
        gif.style.opacity=0;
        var playing=songname.innerText;
        var temp=0;
        for(var i=0;i<songs.length;i++)
        {
            if(songs[i].songName==playing)
            {
                temp=i;
            }
        }
        Array.from(document.getElementsByClassName('songItemPlay')).forEach(function(element)
        {
            var index=element.id;
            if(index==temp)
            {
                element.classList.remove('fa-pause');
               element.classList.add('fa-play');
            }
        })
    }
})

  


//Listen to Events
audioElement.addEventListener('timeupdate',function()
{
    var current=parseInt(audioElement.currentTime);
    var dur=parseInt(audioElement.duration);
    var ans=parseInt((current/dur)*100);
    myProgressBar.value=ans;
});

myProgressBar.addEventListener('change',function()
{
    audioElement.currentTime= (myProgressBar.value*audioElement.duration/100);
});

 const makeAllPlays=function()
 {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach(function(element)
    {
    element.classList.remove('fa-pause');
    element.classList.add('fa-play');
    })
 };


Array.from(document.getElementsByClassName('songItemPlay')).forEach(function(element)
{
    element.addEventListener('click',function(e)
    {
        if(!audioElement.paused)
        {
            var id=e.target.id;
            var playing=songname.innerText;
            var temp=0;
            for(var i=0;i<songs.length;i++)
            {
                if(songs[i].songName==playing)
                {
                    temp=i;
                }
            }
            if(id==temp)
            {
                audioElement.pause();
                e.target.classList.remove('fa-pause');
                e.target.classList.add('fa-play');
                masterPlay.classList.remove("fa-pause");
                masterPlay.classList.add("fa-play");
                return;
            }
        }
        makeAllPlays();
        songIndex=parseInt(e.target.id);
        e.target.classList.remove('fa-play');
        e.target.classList.add('fa-pause');
        audioElement.src=`${songs[songIndex].filePath}`;
        songname.innerText=songs[songIndex].songName;
        audioElement.currentTime=0;
        audioElement.play();
        gif.style.opacity=1;
        masterPlay.classList.remove("fa-play");
        masterPlay.classList.add("fa-pause");
    })
});

document.getElementById('next').addEventListener('click',function()
{
    songIndex+=1;
    if(songIndex>=10)
    {
        songIndex=0;
    }
    audioElement.src=`${songs[songIndex].filePath}`;
    songname.innerText=songs[songIndex].songName;
    audioElement.currentTime=0;
    audioElement.play();
    gif.style.opacity=1;
    masterPlay.classList.remove("fa-play");
    masterPlay.classList.add("fa-pause");
    makeAllPlays();
    allplay();
});
document.getElementById('previous').addEventListener('click',function()
{
    if(songIndex<=0)
    {
        songIndex=0;
    }
    else
    {
        songIndex-=1;
    }
    audioElement.src=`${songs[songIndex].filePath}`;
    songname.innerText=songs[songIndex].songName;
    audioElement.currentTime=0;
    audioElement.play();
    gif.style.opacity=1;
    masterPlay.classList.remove("fa-play");
    masterPlay.classList.add("fa-pause");
    makeAllPlays();
    allplay();
});