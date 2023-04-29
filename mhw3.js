const API_KEY = 'AIzaSyBsQitCa3xiprU4JxWIJjvB91AyBZa3jz8';
const composerButtons = document.querySelectorAll('.article .btn');
for (const item of composerButtons){
    item.addEventListener('click', onClick);
}

async function onClick(event) {
  const article = event.currentTarget.parentNode;
  const dropdown = article.querySelector('.dropdown');
  const composerName = article.querySelector('.btn').dataset.id;

  if (dropdown.classList.contains('show')) {
    dropdown.classList.remove('show');
    dropdown.innerHTML = '';
    return;
  }

  const response = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=4&q=${composerName}&videoSyndicated=true&videoDuration=medium&type=video&key=${API_KEY}`);
  const data = await response.json();

  data.items.forEach(item => {
    const video = document.createElement('div');
    video.innerHTML = `<iframe class="video" src="https://www.youtube.com/embed/${item.id.videoId}" frameborder="0" allow="encrypted-media; gyroscope; picture-in-picture" allowfullscreen=""></iframe>`;
    dropdown.appendChild(video);
  });

  dropdown.classList.add('show');
}


const app_id = " 600104";
const app_secret = "ecfbde1233f560ca222013b2990dcef1";
const my_url = "http://localhost/mhw3.html";


function redirect(){

  let dialog_url = `https://connect.deezer.com/oauth/auth.php?app_id=${app_id}&redirect_uri=${encodeURIComponent(my_url)}&perms=email,offline_access,manage_library&response_type=token`;

  window.location.href = dialog_url;

}

const playlist_buttons = document.querySelectorAll('.playlist-btn');
for(const playlist_button of playlist_buttons){

  playlist_button.addEventListener('click', addplaylist)
  
}

function getaccesstoken(){
  
  var hash = window.location.hash.substr (1); // get the hash part without #

  if (!hash){
    return null
  }

  var params = hash.split ('&').reduce (function (res, item) { // split by & and convert to key-value pairs
    var parts = item.split ('='); // split by =
    res [parts [0]] = parts [1]; // assign to object
    return res;
  }, {});
  var access_token = params ["access_token"]; // get the value of access_token
  return access_token;

}

function addplaylist(event){

  if(!getaccesstoken()){
    redirect();
  }
 
  button = event.currentTarget;
  playlist_id = button.dataset.id;
  console.log("addplaylist")
  fetch(`https://api.deezer.com/user/me/playlists?output=jsonp&request_method=POST&playlist_id=${playlist_id}&output=jsonp&access_token=${getaccesstoken()}`)

}

