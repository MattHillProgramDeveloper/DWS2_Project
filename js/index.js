let imagePrefix = 'https://image.tmdb.org/t/p/original/';
//noting the search input field for later
let elSearchInput = document.querySelector('#moviesearch');
let elSearch = document.querySelector('#search');
let elHamburger = document.querySelector('#hamburger');
let elMenuX = document.querySelector('#close');
let elLilMenu = document.querySelector('#lilmenu');
let elLogo = document.querySelector('#logo');



function searchMovies(searched) {
    if (searched === "") {
        alert("Please enter a movie title")
    }
    else {
        // Create an AJAX or Fetch request that writes
        // data to the #results section
        let xhr = new XMLHttpRequest();

        xhr.open('GET', 'https://api.themoviedb.org/3/search/movie?api_key=49f13a7ad6ac356132022f211dd3de03&language=en-US&query=' + searched + '&page=1&include_adult=false', true);
        xhr.send(null);
        //onload  fires once the server has responded to the request
        xhr.onload = function () {
            if (xhr.status === 200) {
                console.log("we see the server");
                let responseObject = JSON.parse(xhr.responseText);
                console.log(responseObject);
                if (responseObject.total_results === 0) {
                    noResults(searched);
                }
                else {
                    buildMovies(responseObject.results, searched);
                }


            }
        };
    }

}

function buildMovies(responseObject, searched) {

    //Declare a variable to store the content
    let movieContent = '<aside><h1>Results for ' + searched + '</h1></aside>';

    //begin a loop to start adding in new people content
    for (let i = 0; i < responseObject.length; i++) {
        //Declare a default image if a movie poster does not exist
        let imageURL = 'img/missing.jpg';
        //change the image to the actual poster if it does exist
        if (responseObject[i].poster_path) {
            imageURL = imagePrefix + responseObject[i].poster_path;
        }

        let title = responseObject[i].title;
        movieContent += '<figure class="item">';
        movieContent += '<img src=' + imageURL + ' alt="Poster for ' + title + '"/>';
        movieContent += '<figcaption>' + title + '</figcaption>';
        movieContent += '</figure>';
    }

    //query for the appropriate .section
    let content = document.querySelector('section#results');
    content.innerHTML = movieContent;

}

elSearchInput.addEventListener('keyup', function (e) {
    if (e.keyCode === 13) {
        searchMovies(elSearchInput.value);
    }
});


//To notify the user that their search was empty
function noResults(searched) {
    document.querySelector('section#results').innerHTML = '<aside><h1>Your query for ' + searched + ' returned zero results.</h1></aside>';

}

//This section will control the visibility of the mobile menu

elHamburger.addEventListener('click', function(){
    openMobileMenu();
},false);


elMenuX.addEventListener('click', function(){
    closeMobileMenu();
},false);



function openMobileMenu(){
    elLilMenu.style.display = "block";
    elHamburger.style.display = "none";
    elMenuX.style.display = "block";
    elSearch.style.display = "none";
    elLogo.style.display = "none";
}

function closeMobileMenu(){
    elLilMenu.style.display = "none";
    elHamburger.style.display = "block";
    elMenuX.style.display = "none";
    elSearch.style.display = "block";
    elLogo.style.display = "block";

}

//Just to put something interesting on the page when it loads
searchMovies('Fight Club');