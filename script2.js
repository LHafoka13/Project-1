var redirectUri = "http://192.168.137.1:8080/"
var authorizationToken; //this returns in the url after login
var queryURL; // "https://api.spotify.com/v1/search?q=" + searchTerm + "&type=artist";
var searchTerm; //this is the user input
var scope = 'user-library-modify';//this will be added to our auth link
var spotifyAuthLink = 'https://accounts.spotify.com/authorize?client_id=702323baa1774004a3f0d2dd03f411e2&response_type=token&scope=' + encodeURIComponent(scope) + '&redirect_uri=' + redirectUri;
var authButton = document.getElementById('auth');

//on click of authentication button set the url (window.location.href) to the spotify auth link
function openAuth () {
    window.location.href=spotifyAuthLink;
    console.log()
}

authButton.addEventListener("click", openAuth)

//get authorization token from url and add 'Bearer' to the beginning of the string (location.hash.substr(1))

//on click of search button run a search function that includes the fetch call

//make the fetch call with the authorizationToken as a header