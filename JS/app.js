
document.getElementById('search-button').addEventListener('click', function () {
    const searchText = document.getElementById('input-area').value;
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    fetch(url)
        .then(res => res.json())
        .then(data => console.log(data))
})