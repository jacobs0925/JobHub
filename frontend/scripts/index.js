let searchButton = document.getElementById('searchbutton')
let searchBar = document.getElementById('searchbar')

searchButton.addEventListener('click', function ()
{
    const searchValue = searchBar.value;
    if (searchValue != "")
    {
        const newURL = `jobresults.html?search=${encodeURIComponent(searchValue)}`;
        window.location.href = newURL;
    }
})