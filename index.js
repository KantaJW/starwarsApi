//starta en hämta den API-slutpunkt som vill använda//
let array_of_films
fetch('https://swapi.dev/api/films/')
    .then(response => response.json())
    .then(films => {
        array_of_films = films.results
    })

//search function den visar upp lista med filmer med tecknen som skriva i sök rutan//
let search_box = document.querySelector('#input-search')
search_box.addEventListener('input', filter_search)

let search_button = document.querySelector('#button-search')
search_button.addEventListener('click', onSearchClick)
function onSearchClick(){
    console.log('test')
    if (filter_search()) {
        console.log('onSearchClick')
        show_film_details(0)
    } else {
        console.log('notRestore')
    }
}
//loopar till all films data för att ska visa upp efter sök//
var films_filtered

function filter_search(inputEvent) {
    films_filtered = array_of_films.filter(value => {
        let str_name = value.title.toLowerCase()
        return str_name.includes(search_box.value)
    })
    if(search_box.value !=='') show_result()
    if (films_filtered.length == 1) {
        console.log('films_filtered.length = '+films_filtered.length)
        return true
    }
    else {
        console.log('false!')
        return false
    }
}
//show result efter search film hämta data element från API de korta details av films film title, director och opening crawl//
function show_result() {
    div = document.createElement('DIV')
    films_filtered.forEach((film, index) => {

        let a = document.createElement('A')
        a.setAttribute('onclick', `show_film_details(${index})`)

        let h2 = document.createElement('H2')
        h2.textContent = film.title
        a.appendChild(h2)
        div.appendChild(a)

        let p = document.createElement('P')
        p.textContent = film.director
        div.appendChild(p)

        p = document.createElement('P')
        p.textContent = film.opening_crawl
        div.appendChild(p)
    });
    document.querySelector('#search-result').innerHTML = ''
    document.querySelector('#search-result').appendChild(div)
}

//show mer details funktion av filmen efter klicka välja film hämta data element från API de details lista av filmen//
function show_film_details(ind) {
    let film_selected = films_filtered[ind]
    div = document.createElement('DIV')

    let table = document.createElement('TABLE')
    div.appendChild(table)

    let tr = document.createElement('TR')
    tr.innerHTML = `<td><h3>Film title:</h3></td><td><h3>${film_selected.title}</h3></td>`
    table.appendChild(tr)

    tr = document.createElement('TR')
    tr.innerHTML = `<td><h3>episode:</h3></td><td><h3>${film_selected.episode_id}</h3></td>`
    table.appendChild(tr)

    tr = document.createElement('TR')
    tr.innerHTML = `<td><h3>about:</h3></td><td><h3>${film_selected.opening_crawl}</h3></td>`
    table.appendChild(tr)


    tr = document.createElement('TR')
    tr.innerHTML = `<td><h3>director:</h3></td><td><h3>${film_selected.director}</h3></td>`
    table.appendChild(tr)


    tr = document.createElement('TR')
    tr.innerHTML = `<td><h3>producer:</h3></td><td><h3>${film_selected.producer}</h3></td>`
    table.appendChild(tr)


    tr = document.createElement('TR')
    tr.innerHTML = `<td><h3>release date:</h3></td><td><h3>${film_selected.release_date}</h3></td>`
    table.appendChild(tr)

//skapa html element teble row som visar data från acter_list//
    let tr_char = document.createElement('TR')
//skapa variabel characters list för hämta string characters från fetch//
    let acter_list = ''
//hämta array characters från film_characters som run från funktion show_film_details()//
    let characters = film_selected.characters
//hämta array chatacters från url i api jason och lägga i fetch//
    characters.forEach((char_url, index) => {
        fetch(char_url)
            .then(response => response.json())
            .then(acter => {
                if (acter_list.length == 0)
                //om name lista är första i list då behöver inte har , //
                acter_list += acter.name
                else
                //det är andra i namn lista då ska ha  , förra namn//
                acter_list += ', ' + acter.name
                //get string från character list lägga i html//
                tr_char.innerHTML = `<td><h3>characters:</h3></td><td><h3>${acter_list}</h3></td>`
            })
    })
    table.appendChild(tr_char)
    //skapa html element table row som visar data från vehicles_list//
    let tr_vehicles = document.createElement('TR')
    //skapa variabel vehicles list för hämta string vehicles från fetch//
    let vehicles_list = ''
    //hämta array vehicles från film_vehicles som run från funktion show_film_details()//
    let vehicles = film_selected.vehicles
    //hämta array vehicles från url i api jason och lägga i fetch//
    vehicles.forEach((url, index) => {
        fetch(url)
            .then(response => response.json())
            .then(vehicles => {
                if (vehicles_list.length == 0)
                //om name lista är första i list då behöver inte har , //
                vehicles_list += vehicles.name
                else
                //det är andra i namn lista då ska ha  , förra namn//
                vehicles_list += ', ' + vehicles.name
                //get string från vehicles list lägga i html//
                tr_vehicles.innerHTML = `<td><h3>vehicles:</h3></td><td><h3>${vehicles_list}</h3></td>`
            })
    })
    //get html visa upp i table då table som hänga ihopp med div och vidare i search-result// 
    table.appendChild(tr_vehicles)

    document.querySelector('#search-result').innerHTML = ''
    document.querySelector('#search-result').appendChild(div)
}
