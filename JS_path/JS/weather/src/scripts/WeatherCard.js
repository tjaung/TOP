import * as weather_conditions from "../weather_conditions.json"

export class WeatherCard{
    constructor(API){
        this.API = API
        this.farenheit = true
    }

    async postWeatherData() {
    
        const cityName = document.querySelector('#city')
        const temp = document.querySelector('#temp')
        const weather = document.querySelector('#weather')
    
        const searchVal = document.querySelector('#search').value
        if(searchVal){
            try{
                const data = await this.API.fetchWeatherData(searchVal)    
                console.log(data)
                let dataCity = data.location.name
                let dataTempF = data.current.temp_f + '\u00B0' + ' / Feels like ' + data.current.feelslike_f + '\u00B0'
                let dataTempC = data.current.temp_c + '\u00B0' + ' / Feels like ' + data.current.feelslike_c + '\u00B0'
                let dataWeather = data.current.condition.text
                let dataWeatherIcon = this.selectWeatherIcon(dataWeather)
                console.log(dataWeatherIcon)
                cityName.innerHTML = dataCity
                temp.innerHTML = this.farenheit ? dataTempF : dataTempC
                weather.src = dataWeatherIcon
                weather.alt = dataWeather

            }
            catch(error){
                console.log(error)
                alert(error)
            }
        }
        else{
            console.log('Enter a City')
            alert('Please Enter a City')
        }
    }
    
    toggleFarenheit() {
        const temp = document.querySelector('#temp')
        const toggleDegreeButton = document.querySelector('#toggle-degree')

        if(this.farenheit){
            this.farenheit = false
            let dataTempC = this.API.data.current.temp_c + '\u00B0' + ' / Feels like ' + this.API.data.current.feelslike_c + '\u00B0'
            temp.innerHTML = dataTempC
        }
        else{
            this.farenheit = true
            let dataTempF = this.API.data.current.temp_f + '\u00B0' + ' / Feels like ' + this.API.data.current.feelslike_f + '\u00B0'
            temp.innerHTML = dataTempF
        }

        if(this.farenheit) toggleDegreeButton.innerHTML = 'C'
        else{toggleDegreeButton.innerHTML = 'F'}
    }

    giveToggleButtonFunctionality(){
        const toggleDegreeButton = document.querySelector('#toggle-degree')
        toggleDegreeButton.addEventListener('click', () => {this.toggleFarenheit()})
    }

    selectWeatherIcon(weatherStatus){
        const statusToIcon = weather_conditions
        let iconFileName

        for(let i=0; i<statusToIcon.length; i++){
            if(weatherStatus === statusToIcon[i]['day']){
                iconFileName = `../src/imgs/day/${statusToIcon[i]['icon']}.png`
                console.log('found: ' + iconFileName)
            } 
            else if(weatherStatus === statusToIcon[i]['night']){
                iconFileName = `../src/imgs/night/${statusToIcon[i]['icon']}.png`
                console.log('found: ' + iconFileName)
            }
        }

        return iconFileName
    }
}