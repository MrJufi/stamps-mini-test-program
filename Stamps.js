const moment = require('moment')

// Program 1   
function fooBarArray () {
    function isPrime (num) {
        let check = true

        if (num < 2) {
            check = false
        }

        for (let i = num - 1 ; i > 1 ; i--) {
           if(num % i === 0) {
             check = false
           }
        } 

        return check
    }

    const listNoPrimeFooBar = () => {
        let arrayList = []
        for (let i = 100 ; i > 0 ; i--) {
           if (!isPrime(i)) {
             arrayList.push(i)  
           } 
        }

        return arrayList.map((num) => {
            if (num % 3 === 0 && num % 5 === 0) num = 'FooBar'
            if (num % 3 === 0) num = 'Foo'
            if (num % 5 === 0) num = 'Bar'

            return num
        })
    }

    console.log(listNoPrimeFooBar().join(', '))
}

// Program 2   
const API_URL = 'http://api.openweathermap.org/data/2.5/forecast?q=jakarta&appid=363e6ccf07295f8a5db0b902b2e2370d&units=metric'

async function weatherForecast () {
    try {
        const weatherData = await fetch(API_URL)

        if (!weatherData.ok) throw new Error('Error While Fetching Data')

        const { list } = await weatherData.json()

        const forecastData = list.reduce((newTempData, currentData) => {
            const date = currentData.dt_txt.split(' ')[0]
            const temperature = currentData.main.temp

            if (!newTempData[date]) {
                newTempData[date] = temperature
            }

            return newTempData;
        }, {})

        console.log('Weather Forecast:')
        for (date in forecastData) {
            console.log(`${moment(date).locale('en').format('ddd, DD MMM YYYY')}: ${forecastData[date]}\u00B0C`)   
        }

    } catch (err) {
        console.log(err)
    }
}

fooBarArray()
weatherForecast()