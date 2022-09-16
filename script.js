const KEY = '590670814617382519193x81259';
        const getPosition = function(){
            return new Promise((resolve, reject) => {
                navigator.geolocation.getCurrentPosition(resolve, reject)
            })
        }

        const whereAmi = () => {
            document.getElementById('msg')
            .style.display = 'block'
            getPosition().then(pos => {
                const { latitude: lat, longitude: lng } = pos.coords;
                return fetch(`https://geocode.xyz/${lat},${lng}?json=1&auth=&auth=${KEY}`)
            })
            .then(reponse => reponse.json())
            .then(data => {
                
                renderHtmlCountry(data)
                return fetch(`https://restcountries.com/v2/name/${data.country}`);

            })
            .then(country => country.json())
            .then(data => {
                
                document.getElementById('img').src = data[0].flag;
            })
            .finally(() => {
                document.getElementById('msg').style.display = 'none';
            })
        }
        


        document.querySelector('.btn')
        .addEventListener('click', whereAmi)













        const renderHtmlCountry = (data) => {
            const { country, city, state, staddress } = data;
            const html = `
                <div class="card">
                    <h3>${country}</h3>
                    <h5>${city}</h5>
                    <p>${state}</p>
                    <p>${staddress}</p>
                </div>
            `;

            document.querySelector('.info')
            .insertAdjacentHTML('afterbegin', html)
        }
        //getPosition().then(pos => console.log(pos))