import OpenAI from 'openai';

export class OpenAiAPIConnector{

    constructor(WeatherCard){
        this.openaiapi,
        this.model = 'gpt-3.5-turbo',
        this.role = 'user',
        this.WeatherCard = WeatherCard
    }

    connectToApi(){
        const openaiconnection = new OpenAI({
            apiKey: process.env["OPENAI_API_KEY"],
            dangerouslyAllowBrowser: true
        })
        this.openaiapi = openaiconnection
    }

    selectModel(newModel){
        this.model = newModel
    }
    selectRole(newRole){
        this.role = newRole
    }

    generatePrompt(weatherData, farenheit){

        const localTime = weatherData.location.localtime
        const name = weatherData.location.name
        const region = weatherData.location.region
        const condition = weatherData.current.condition.text

        let temp = weatherData.current.temp_c
        let realFeel = weatherData.current.feelslike_c
        let degreeType = 'celsius'

        if(farenheit){
            temp = weatherData.current.temp_f
            realFeel = weatherData.current.feelslike_f
            degreeType = 'farenheit'
        }

        const prompt = 
        `The weather on ${localTime} is ${condition} with a temperature of ${temp} degrees ${degreeType} and feels like 
         ${realFeel} in ${name}, ${region}. What can I do today in this weather?
        `
        
        return prompt
    }

    async submitPromptAndGetResponse(prompt){

        const result = await this.openaiapi.chat.completions.create({
            model: this.model,
            messages: [{
                role:this.role,
                content: prompt
            }]
        })

        console.log(result)
        return result
    }

    async clickForSuggestion(){

        const prompt = this.generatePrompt(this.WeatherCard.API.data, this.WeatherCard.farenheit)
        const suggestion = await this.submitPromptAndGetResponse(prompt)
        return suggestion.choices[0].message.content
    }

    addFunctionToSuggestionBox(){
        const suggestionBox = document.querySelector('#suggestion-box')
        suggestionBox.addEventListener('click', async (e) => {
            const suggestion = await this.clickForSuggestion()
            suggestionBox.childNodes[0].innerHTML = suggestion
        })
    }

    clearSuggestionBox(){
        const suggestionBox = document.querySelector('#suggestion-box')
        suggestionBox.childNodes[0].innerHTML = "Click for suggestions"
    }

}



