let log = (msg: any) => {
  return console.log(msg);
}

document.querySelector('.button').addEventListener('click', function () {
  let inputValue: string = (<HTMLInputElement>document.getElementById('city')).value;

  if (inputValue === '') {
    log('no message')
  } else {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&APPID=047f848293f3ad6b92c6e08952a43d5d`)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        log(data)
        const cityName = data.name;
        const wind = data.wind.speed;
        const weatherStatus = data.weather[0].description;

        let currTemp = data.main.temp;

        //konvert to celsius and round
        currTemp = Math.round(currTemp - 273.15)

        document.getElementById('temperature').innerHTML = currTemp;

        document.getElementById('weather__status').innerHTML = weatherStatus;

        document.getElementById('wind__speed').innerHTML = wind;

        const body = document.querySelector('body');
        body.className = '';
        if (currTemp < 10) {
          body.classList.add('is--darkblue');
        } else if (currTemp < 20) {
          body.classList.add('is--cloudy')
        } else if (currTemp < 25) {
          body.classList.add('is--sunny-light')
        } else {
          body.classList.add('is--sunny')
        }

      }).catch(function (error) {
        log(error);
      });
  }
})

