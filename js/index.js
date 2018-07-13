let imagePrefix='https://image.tmdb.org/t/p/original/';
//noting the search input field for later
let searchInput = document.querySelector('#search');



function searchMovies() {

// Create an AJAX or Fetch request that writes
// data to the #results section
var xhr = new XMLHttpRequest();
var searched = document.querySelector('#moviesearch').value;
alert(searched);

xhr.open('GET', 'https://api.themoviedb.org/3/search/movie?api_key=49f13a7ad6ac356132022f211dd3de03&language=en-US&query='+searched+'&page=1&include_adult=false', true);
xhr.send(null);
//onload  fires once the server has responded to the request
xhr.onload = function () {
    if (xhr.status === 200) {
        console.log("we see the server");
        let responseObject = JSON.parse(xhr.responseText);
        console.log(responseObject);
        buildUiPeople(responseObject.results,searched);

    }
};

}

function buildUiPeople(responseObject,searched) {

    //Declare a variable to store the content
    let movieContent = '<aside><h1>Results for '+searched+'</h1></aside>';
        
    //begin a loop to start adding in new people content
    for (var i = 0; i < responseObject.length; i++) {
        //Declare all needed variables and fill them from the json object
        let imageURL = imagePrefix +responseObject[i].poster_path;
        let title =   responseObject[i].title;
        movieContent += '<figure class="item">';
        movieContent += '<img src=' + imageURL + ' alt="Poster for '+title+'"/>';
        movieContent += '<figcaption>' + title + '</figcaption>';
        movieContent += '</figure>';
    }

    //query for the appropriate .section
    let content = document.querySelector('section#results');
    content.innerHTML = movieContent;

}

searchInput.addEventListener('keyup',function(e){
    if (e.keyCode === 13) {
    searchMovies();
  }
});

