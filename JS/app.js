
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
        <div class="card mx-auto" style="max-width: 768px;">
            <div class="row">
                <div class="col-12 col-md-5 d-block m-auto">
                    <img src="${info.image}" class="card-img-top img-fluid" alt="...">
                </div>
                <div class="card-body col-12 col-md-7">
                    <h5 class="card-title">${info.name}</h5>
                    <p id="release-date" class="card-text">
                    ${info.releaseDate ? info.releaseDate : "No release date found"}</p>
                    <p class="card-text fw-bold">Main Features</p>
                    <p class="card-text">Chipset: <small class="text-muted">${info.mainFeatures.chipSet}</small></p>
                    <p class="card-text">Display-size: <small class="text-muted">${info.mainFeatures.displaySize}</small></p>
                    <p class="card-text">Memory: <small class="text-muted">${info.mainFeatures.memory}</small></p>
                    <p class="card-text">Storage: <small class="text-muted">${info.mainFeatures.storage}</small></p>
                    <p class="card-text">Sensor Info: <small class="text-muted">${info.mainFeatures.sensors.join(', ')}</small></p>
                    <p class="card-text fw-bold">Other Information</p>
                    <p class="card-text">Bluetooth: <small class="text-muted">${info.others ? info.others.Bluetooth : "Not found"}</small><br>GPS: <small class="text-muted"> ${info.others ? info.others.GPS : "Not found"}</small><br>NFC: <small class="text-muted">${info.others ? info.others.NFC : "Not found"}</small><br>Radio: <small class="text-muted">${info.others ? info.others.Radio : "Not found"}</small><br>USB: <small class="text-muted">${info.others ? info.others.USB : "Not found"}</small><br>WLAN: <small class="text-muted">${info.others ? info.others.WLAN : "Not found"}</small></p>
                </div>
            </div>
        </div>
    `
}
