document.addEventListener('DOMContentLoaded', () => {
    fetchDogs();
})

const dogsAPI = "http://localhost:3000/dogs"
const dogTable = document.querySelector("#table-body")
const form = document.querySelector("form")

function fetchDogs() {
    fetch(dogsAPI)
    .then(response => response.json())
    .then(dogs => {
        dogs.forEach(showDogs)
    })
}

function showDogs(dog) {

    let dogTr = document.createElement("tr")

    let dogName = document.createElement("td")
    dogName.textContent = dog.name 

    let dogBreed = document.createElement("td")
    dogBreed.textContent = dog.breed 

    let dogSex = document.createElement("td")
    dogSex.textContent = dog.sex 

    let dogEditTag = document.createElement("td")
    dogEditTag.dataset.id = dog.id
    
    let dogEditBtn = document.createElement("button")
    dogEditBtn.textContent = "Edit"
    dogEditTag.append(dogEditBtn)

    dogEditBtn.addEventListener("click", e => {
        e.preventDefault();
        populateForm(dog);
    })

    dogTr.append(dogName, dogBreed, dogSex, dogEditTag)
    dogTable.append(dogTr)
}

function populateForm(dog) {
    form.name.value = dog.name
    form.breed.value = dog.breed
    form.sex.value = dog.sex
    form.dataset.id = dog.id
}

function renderDogs() {
    fetch(dogsAPI)
    .then(response => response.json())
    .then(dogs => {
        dogs.forEach(showDogs)
    })
}

form.addEventListener("submit", e=> {
    let dogId = form.dataset.id
    let dogName = form.name.value
    let dogBreed = form.breed.value
    let dogSex = form.sex.value
    
    fetch(`http://localhost:3000/dogs/${dogId}`, {
        method: "PATCH",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({name: dogName, breed: dogBreed, sex: dogSex})
    })

    fetchDogs();
})

