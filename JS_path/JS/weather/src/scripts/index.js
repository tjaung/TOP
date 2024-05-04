const { WeatherAPI } = require("./WeatherAPI")
import { WeatherCard } from "./WeatherCard"
import { OpenAiAPIConnector } from "./openai"
console.log(process.env.API_KEY)

const WeatherData = new WeatherAPI()
const Weather = new WeatherCard(WeatherData)

Weather.giveToggleButtonFunctionality()

const OpenAIObj = new OpenAiAPIConnector(Weather)
OpenAIObj.connectToApi()
OpenAIObj.addFunctionToSuggestionBox()

const submit = document.querySelector('#submit-city')

submit.addEventListener('click', async (e) => {
    e.preventDefault()
    Weather.postWeatherData()
    OpenAIObj.clearSuggestionBox()
})