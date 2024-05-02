// import { WeatherAPI } from "./WeatherAPI"
// const weatherCard = ((API) => {

//     // --- GET THIS VARS
//     let _API = API
//     let _farenheit = true

//     // --- GET DOM ITEMS
//     const toggleDegreeButton = document.querySelector('#toggle-degree')
//     const cityName = document.querySelector('#city')
//     const temp = document.querySelector('#temp')
//     const weather = document.querySelector('#weather')

//     let postWeatherData = async () => {

//         const searchVal = document.querySelector('#search').value

//         if(searchVal){
//             try{
//                 const data = await _API.fetchWeatherData(searchVal)    
//                 console.log(data)
//                 _API.updateLocation(data.location)
//                 _API.updateWeatherData(data)

//                 let dataCity = _API.location.name
//                 let dataTempF = _API.data.current.temp_f + '\u00B0' + ' / Feels like ' + _API.data.current.feelslike_f + '\u00B0'
//                 let dataTempC = _API.data.current.temp_c + '\u00B0' + ' / Feels like ' + _API.data.current.feelslike_c + '\u00B0'
//                 let dataWeather = _API.data.current.condition.text
//                 let dataWeatherIcon = _API.data.current.condition.icon
    
//                 cityName.innerHTML = dataCity
//                 temp.innerHTML = _farenheit ? dataTempF : dataTempC
//                 weather.innerHTML = dataWeather
//             }
//             catch(error){
//                 console.log(error)
//                 alert(error)
//             }
//         }
//         else{
//             console.log('Enter a City')
//             alert('Please Enter a City')
//         }
//     }

//     let toggleFarenheit = () => {
//         const temp = document.querySelector('#temp')
//         if(_farenheit){
//             _farenheit = false
//             let dataTempC = _API.data.current.temp_c + '\u00B0' + ' / Feels like' + _API.data.current.feelslike_c + '\u00B0'
//             temp.innerHTML = dataTempC
//         }
//         else{
//             _farenheit = true
//             let dataTempF = _API.data.current.temp_f + '\u00B0' + ' / Feels like' + _API.data.current.feelslike_f + '\u00B0'
//             temp.innerHTML = dataTempF
//         }
//     }

//     toggleDegreeButton.addEventListener("click", toggleFarenheit);

// })();

// export default weatherCard

export class WeatherCard{
    constructor(API){
        this.API = API
        this.farenheigt = true
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
                this.API.updateLocation(data.location)
                this.API.updateWeatherData(data)

                let dataCity = data.location.name
                let dataTempF = data.current.temp_f + '\u00B0' + ' / Feels like ' + data.current.feelslike_f + '\u00B0'
                let dataTempC = data.current.temp_c + '\u00B0' + ' / Feels like ' + data.current.feelslike_c + '\u00B0'
                let dataWeather = data.current.condition.text
                let dataWeatherIcon = data.current.condition.icon
    
                cityName.innerHTML = dataCity
                temp.innerHTML = this.farenheigt ? dataTempF : dataTempC
                weather.innerHTML = dataWeather
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

        if(this.farenheigt){
            this.farenheigt = false
            let dataTempC = this.API.data.current.temp_c + '\u00B0' + ' / Feels like ' + this.API.data.current.feelslike_c + '\u00B0'
            temp.innerHTML = dataTempC
        }
        else{
            this.farenheigt = true
            let dataTempF = this.API.data.current.temp_f + '\u00B0' + ' / Feels like ' + this.API.data.current.feelslike_f + '\u00B0'
            temp.innerHTML = dataTempF
        }

        if(this.farenheigt) toggleDegreeButton.innerHTML = 'C'
        else{toggleDegreeButton.innerHTML = 'F'}
    }

    giveToggleButtonFunctionality(){
        const toggleDegreeButton = document.querySelector('#toggle-degree')
        toggleDegreeButton.addEventListener('click', this.toggleFarenheit)
    }
    
}