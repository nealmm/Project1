const APP_ID  = '0815ab91'
const APP_KEY = 'c6f602f360fe3dfe714cb623608c4cea'

var journal = {}

var stored = localStorage.getItem('food-journal')

if (stored) {
    journal = JSON.parse(stored)
}

var dateInput      = document.getElementById('date-input')
var itemInput      = document.getElementById('item-input')
var addButton      = document.getElementById('add-button')
var nutritionTable = document.getElementById('nutrition-table')
var totalFat       = document.getElementById('total-fat')
var totalCarbs     = document.getElementById('total-carbs')
var totalProtein   = document.getElementById('total-protein')
var totalCalories  = document.getElementById('total-calories')
var saveButton     = document.getElementById('save-button')
var jokeButton     = document.getElementById('joke-button')


dateInput.value = moment().format('YYYY-MM-DD')
changeDate(dateInput.value)

dateInput.addEventListener('input', event => {
    changeDate(event.target.value)
})

addButton.addEventListener('click', () => {
    var query = itemInput.value

    fetch('https://api.edamam.com/api/nutrition-data?app_id=' + APP_ID + '&app_key=' + APP_KEY + '&nutrition-type=logging&ingr=' + query)
    .then(response => response.json())
    .then(data => {
        var entry = {     item: query
                    ,      fat: Math.round(data.totalNutrients.FAT.quantity)
                    ,    carbs: Math.round(data.totalNutrients.CHOCDF.quantity)
                    ,  protein: Math.round(data.totalNutrients.PROCNT.quantity)
                    , calories: Math.round(data.totalNutrients.ENERC_KCAL.quantity) }
        
        journal[dateInput.value].push(entry)
        addItem(entry)
    })

    itemInput.value = ''
})

saveButton.addEventListener('click', () => {
    localStorage.setItem('food-journal', JSON.stringify(journal))
})

function changeDate(day) {
    while (nutritionTable.hasChildNodes()) {
        nutritionTable.removeChild(nutritionTable.firstChild)
    }

    totalFat.textContent      = 0
    totalCarbs.textContent    = 0
    totalProtein.textContent  = 0
    totalCalories.textContent = 0

    if (journal[day]) {
        journal[day].forEach(addItem)
    }
    else {
        journal[day] = []
    }
}

function addItem(entry) {
    var row = document.createElement('tr')

    var item         = document.createElement('td')
    var fat          = document.createElement('td')
    var carbs        = document.createElement('td')
    var protein      = document.createElement('td')
    var calories     = document.createElement('td')
    var removeButton = document.createElement('button')

    item.textContent         = entry.item
    fat.textContent          = entry.fat
    carbs.textContent        = entry.carbs
    protein.textContent      = entry.protein
    calories.textContent     = entry.calories
    removeButton.textContent = 'remove'

    row.append(item, fat, carbs, protein, calories, removeButton)
    nutritionTable.appendChild(row)

    totalFat.textContent      = parseInt(totalFat.textContent)      + entry.fat
    totalCarbs.textContent    = parseInt(totalCarbs.textContent)    + entry.carbs
    totalProtein.textContent  = parseInt(totalProtein.textContent)  + entry.protein
    totalCalories.textContent = parseInt(totalCalories.textContent) + entry.calories

    removeButton.addEventListener('click', () => {
        journal[dateInput.value].splice(row.index - 1, 1)
        nutritionTable.removeChild(row)

        totalFat.textContent      = parseInt(totalFat.textContent)      - entry.fat
        totalCarbs.textContent    = parseInt(totalCarbs.textContent)    - entry.carbs
        totalProtein.textContent  = parseInt(totalProtein.textContent)  - entry.protein
        totalCalories.textContent = parseInt(totalCalories.textContent) - entry.calories
    })
}

jokeButton.addEventListener('click', () => {
    

    fetch('https://api.spoonacular.com/food/jokes/random?apiKey=0ca927cd7ba44742a875c47e86abe2a8')
    .then(response => response.json())
    .then(data => {
        
        console.log(data);
        displayJoke(data);
        
    })

});

function displayJoke(data){

    var jokeDisplay    = document.getElementById('joke-display')
    
    jokeDisplay.textContent = data.text
    
}