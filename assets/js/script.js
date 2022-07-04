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
var saveButton     = document.getElementById('save-button')

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
        var entry = {    item: query
                    ,     fat: parseFloat(data.totalNutrients.FAT.quantity).toFixed(1)
                    ,   carbs: parseFloat(data.totalNutrients.CHOCDF.quantity).toFixed(1)
                    , protein: parseFloat(data.totalNutrients.PROCNT.quantity).toFixed(1)
                    ,    cals: parseFloat(data.totalNutrients.ENERC_KCAL.quantity).toFixed(1) }
        
        journal[dateInput.value].push(entry)
        addItem(entry)
    })

    itemInput.value = ''
})

saveButton.addEventListener('click', () => {
    localStorage.setItem('food-journal', JSON.stringify(journal))
})

function changeDate(day) {
    while (nutritionTable.children.length > 1) {
        nutritionTable.removeChild(nutritionTable.lastChild)
    }

    if (journal[day]) {
        for (var i = 0; i < journal[day].length; i++) {
            addItem(journal[day][i])
        }
    } else {
        journal[day] = []
    }
}

function addItem(entry) {
    var item    = document.createElement('td')
    var fat     = document.createElement('td')
    var carbs   = document.createElement('td')
    var protein = document.createElement('td')
    var cals    = document.createElement('td')

    item.textContent    = entry.item
    fat.textContent     = entry.fat
    carbs.textContent   = entry.carbs
    protein.textContent = entry.protein
    cals.textContent    = entry.cals

    var row = document.createElement('tr')
    row.append(item, fat, carbs, protein, cals)
    nutritionTable.appendChild(row)
}