const contentContainer = document.querySelector('.content');

let allfilterCountriesData = [];

fetch('data.json')
.then((res) => res.json())
.then((data) => {

    allCountriesData = data;

    data.forEach((country) => {
        renderCountry(country);
    })
})

const filterByRegion = document.querySelector('select');

filterByRegion.addEventListener('change', (e) => {

    fetch(`https://restcountries.com/v3.1/region/${e.target.value}`)
    .then((res) => res.json())
    .then((data) => {

        allfilterCountriesData = data;
        console.log(data)

        document.querySelector('.content').innerHTML = '';

        data.forEach((country) => {
            renderCountry(country);
        })
    })
})


document.querySelector('.search-bar input').addEventListener('input', (e) => {
      
    const filteredData = allfilterCountriesData.filter((ele) => {
        const name = ele.name?.common?.toLowerCase() || ele.name?.toLowerCase();
        return name.includes(e.target.value.toLowerCase().trim());
    });

    document.querySelector('.content').innerHTML = '';

    filteredData.forEach((country) => {
            renderCountry(country);
        })
})


function renderCountry (country) {
    const card = document.createElement('a');
        card.classList.add('card');
        card.href = `./country.html?name=${country.name?.common ?? country.name}`;

        card.innerHTML = `<img src="${country.flags?.svg}" alt="${country.name?.common ?? country.name} flag">
                            <div class="card-content">
                                <h3>${country.name?.common ?? country.name}</h3>
                                <div class="details">
                                    <p><span class="sub-details">Population: </span><span>${country.population.toLocaleString('en-IN')}</span></p>
                                    <p><span class="sub-details">Region: </span><span>${country.region}</span></p>
                                    <p><span class="sub-details">Capital: </span><span>${country.capital}</span></p>
                                </div>
                            </div>`;

        contentContainer.append(card);
}



document.querySelector('.dark-btn').addEventListener('click', () => {

    document.querySelectorAll('.dark-btn p').forEach((ele) => {
        ele.classList.toggle('hide');
    })
    document.querySelector('body').classList.toggle('dark-mode');
})