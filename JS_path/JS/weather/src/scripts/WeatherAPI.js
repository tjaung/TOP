export class WeatherAPI {
    constructor(){
        this.location,
        this.data
    }

    async fetchWeatherData(city) {
        try{
            const cityURL = `http://api.weatherapi.com/v1/current.json?key=${process.env.API_KEY}&q=${city.toLowerCase()}&aqi=no`
            const response = await fetch(cityURL);
            const cityData = await response.json()
            console.log(cityData)
            this.updateLocation(cityData.location)
            this.updateWeatherData(cityData)

            return cityData
        }
        catch(error){
            console.log(error)
            alert(error)
        }
    }

    async updateLocation(newLocation) {
        this.location = newLocation
    }

    async updateWeatherData(newData){
        this.data = newData
    }

}