
document.getElementById('search-button').addEventListener('click', function () {
    const searchText = document.getElementById('input-area').value;
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayPhone(data.data))
})

const displayPhone = phones => {
    const displayResult = document.getElementById('display-results');
    for (const phone of phones) {
        // console.log(phone.slug)
        const div = document.createElement('div');
        div.classList.add('col')
        div.innerHTML = `
            <div class="card h-100 p-3 bg-light">
                <img src="${phone.image}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${phone.phone_name}</h5>
                    <p class="card-text">Brand: <span class="fw-bold">${phone.brand}</span></p>
                    <button onclick="phoneDetails('${phone.slug}')" class="btn btn-info text-light">Details</button>
                </div>
            </div>
        `
        displayResult.appendChild(div)
    }
}
// ---------- Phone details in top ----------
const phoneDetails = id => {
    // console.log(id)
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    fetch(url)
        .then(res => res.json())
        .then(data => console.log(data.data))
}