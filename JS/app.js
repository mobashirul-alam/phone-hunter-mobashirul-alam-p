
document.getElementById('search-button').addEventListener('click', function () {
    const searchText = document.getElementById('input-area').value;
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayPhone(data))
    document.getElementById('input-area').value = ''
})

const displayPhone = phones => {
    const displayResult = document.getElementById('display-results');
    displayResult.textContent = '';
    const resultDetails = document.getElementById('result-details');
    resultDetails.textContent = '';
    if (phones.status === false) {
        const errorField = document.getElementById('error-field');
        errorField.innerText = `Oops!!! No Phone found...`
    }
    else {
        const errorField = document.getElementById('error-field');
        errorField.innerText = '';
        const phoneLimit = phones.data.slice(0, 20);
        for (const phone of phoneLimit) {
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
}
// ---------- Phone details in top ----------
const phoneDetails = id => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayPhoneDetails(data.data))
}

const displayPhoneDetails = info => {
    const resultDetails = document.getElementById('result-details');
    resultDetails.innerHTML = `
        <div class="card mx-auto" style="width: 56rem;">
            <div class="row">
                <div class="col-md-6">
                    <img src="${info.image}" class="card-img-top" alt="...">
                </div>
                <div class="card-body col-md-6">
                    <h5 class="card-title">${info.name}</h5>
                    <p id="release-date" class="card-text">${getReleaseDate(info.releaseDate)}</p>
                    <p class="card-text">Chipset: <small class="text-muted">${info.mainFeatures.chipSet}</small></p>
                    <p class="card-text">Display-size: <small class="text-muted">${info.mainFeatures.displaySize}</small></p>
                    <p class="card-text">Memory: <small class="text-muted">${info.mainFeatures.memory}</small></p>
                    <p class="card-text">Storage: <small class="text-muted">${info.mainFeatures.storage}</small></p>
                    <p class="card-text">Sensor Info: <small class="text-muted">${info.mainFeatures.sensors}</small></p>
                    <p class="card-text fw-bold">Other Information: </p>
                    <p class="card-text">Bluetooth: <small class="text-muted">${info.others.Bluetooth}</small><br>GPS: <small class="text-muted"> ${info.others.GPS}</small><br>NFC: <small class="text-muted">${info.others.NFC}</small><br>Radio: <small class="text-muted">${info.others.Radio}</small><br>USB: <small class="text-muted">${info.others.USB}</small><br>WLAN: <small class="text-muted">${info.others.WLAN}</small></p>
                </div>
            </div>
        </div>
    `
}
const getReleaseDate = date => {
    if (date === '') {
        return 'No release date found';
    }
    else {
        return date;
    }
}
