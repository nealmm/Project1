
const APP_ID = "0815ab91";
const API_KEY = "c6f602f360fe3dfe714cb623608c4cea";

var button = document.querySelector('.searchBtn');
var inputValue = document.querySelector('.inputValue');


//retrieves data from apis on click of button
button.addEventListener('click', function(){

    var food = document.querySelector(".inputValue").value;
    
    var WeatherApi = "https://api.edamam.com/api/nutrition-data?app_id=0815ab91&app_key=c6f602f360fe3dfe714cb623608c4cea&nutrition-type=logging&ingr=" + food;
   
    fetch(WeatherApi)
        .then(function (foodData) {
            return foodData.json()

            .then(function (response) {
                console.log(response);
                
            })
        })
        
});