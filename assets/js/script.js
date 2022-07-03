const APP_ID  = '0815ab91'
const APP_KEY = 'c6f602f360fe3dfe714cb623608c4cea'

var dateHeading = document.getElementById('date-heading')
var searchField = document.getElementById('search-field')
var addButton   = document.getElementById('add-button')
var nutriTable  = document.getElementById('nutrition-table')

dateHeading.textContent = moment().format('MMMM Do YYYY')

addButton.addEventListener('click', () => {
    var query = searchField.value

    fetch('https://api.edamam.com/api/nutrition-data?app_id=' + APP_ID + '&app_key=' + APP_KEY + '&nutrition-type=logging&ingr=' + query)
    .then(response => response.json())
    .then(data => {
        var item    = document.createElement('td')
        var fat     = document.createElement('td')
        var carbs   = document.createElement('td')
        var protein = document.createElement('td')
        var cals    = document.createElement('td')

        item.textContent    = query
        fat.textContent     = parseFloat(data.totalNutrients.FAT.quantity).toFixed(2)
        carbs.textContent   = parseFloat(data.totalNutrients.CHOCDF.quantity).toFixed(2)
        protein.textContent = parseFloat(data.totalNutrients.PROCNT.quantity).toFixed(2)
        cals.textContent    = parseFloat(data.totalNutrients.ENERC_KCAL.quantity).toFixed(2)

        var row = document.createElement('tr')
        row.append(item, fat, carbs, protein, cals)
        nutriTable.appendChild(row)
    })
})