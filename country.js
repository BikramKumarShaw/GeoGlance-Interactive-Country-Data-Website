const countryName = new URLSearchParams(location.search).get('name')

const countryImage = document.querySelector('.country-details img');

document.querySelector('.full-card h1').innerText = countryName;

fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
.then((res) => res.json())
.then((data) => {

    console.log(data[0]);

    countryImage.src = data[0].flags.svg;
    countryImage.alt = `${countryName} flag`;

    document.querySelector('.native').innerText = data[0].name.common;
    document.querySelector('.population').innerText = data[0].population.toLocaleString('en-IN');
    document.querySelector('.region').innerText = data[0].region;
    document.querySelector('.sub-region').innerText = data[0].subregion ?? 'NA';

    document.querySelector('.tld').innerText = data[0].tld?.join(' , ') ?? 'NA';
    
    if (data[0].capital) {
        if (Array.isArray(data[0].capital)) {
            document.querySelector('.capital').innerText = data[0].capital;
        }
        else {
            console.log((typeof data[0].capital) === 'object');
            document.querySelector('.capital').innerText = Object.values(data[0].capital).map((curr) => curr.name).join(' , ');
        }
    }
    else {
        document.querySelector('.capital').innerText = 'NA'
    }

    if (data[0].currencies) {
        if (Array.isArray(data[0].currencies)) {
            document.querySelector('.currency').innerText = data[0].languages;
        }
        else {
            document.querySelector('.currency').innerText = Object.values(data[0].currencies).map((curr) => curr.name).join(' , ');
        }
    }
    else {
        document.querySelector('.currency').innerText = 'NA'
    }
    
    if (data[0].languages) {
        if (Array.isArray(data[0].languages)) {
            document.querySelector('.language').innerText = data[0].languages.join(' , ');
        }
        else {
            document.querySelector('.language').innerText = Object.values(data[0].languages).map((lang) => lang).join(' , ');
            
        }
        
    }
    else {
        document.querySelector('.language').innerText = 'NA'
    }
    
    if (data[0].borders) {
        data[0].borders.forEach(ele => {

            const anchor = document.createElement('a');

            fetch(`https://restcountries.com/v3.1/alpha/${ele}`)
            .then((res) => res.json())
            .then((data) => {
                anchor.innerText = data[0].name.common;
                anchor.href = `/country.html?name=${data[0].name.common}`;
            });

            
            document.querySelector('.border-country').appendChild(anchor);
        });
    }
    else {
        document.querySelector('.border-country').innerHTML = `<span>NA</span>`;
    }
})

document.querySelector('.back-btn').addEventListener('click', () => {
    window.history.back();
});

document.querySelector('.dark-btn').addEventListener('click', () => {

    document.querySelectorAll('.dark-btn p').forEach((ele) => {
        ele.classList.toggle('hide');
    })
    document.querySelector('body').classList.toggle('dark-mode');
})