let dogUrl = "http://localhost:3000/pups"

// Dom selectors
const dBar = document.getElementById("dog-bar")
const dInfo = document.getElementById("dog-info")
const dButton = document.getElementById("good-dog-filter")
const filterBtn = document.getElementById("good-dog-filter")
let filterStatus = false;
// event listeners
filterBtn.addEventListener("click", () => {
    filterStatus = !filterStatus;
    filterBtn.innerText = `Filter good dogs: ${filterStatus ? "ON" : "OFF"}`;
    fetchDogs();
  });
// Fetches
const fetchDogs = () => {
    if (filterStatus) {
      dogUrl += "?isGoodDog=true";
    }
    fetch(dogUrl)
      .then((res) => res.json())
      .then((dogArr) => {
        console.log(dogArr)
        dBar.innerHTML = "";
        dogArr.forEach((dog) => {
          renderDogs(dog)
        })
        renderDetails(dogArr[0])
      })
  }
// Renders
const renderDogs = (dog) =>{
    const sTag = document.createElement("span")
    sTag.textContent = dog.name
    console.log(sTag)
    dBar.append(sTag)
    sTag.addEventListener("click", (e) =>{
        renderDetails(dog)
    })
}
const renderDetails = (dog) => {
    dInfo.innerHTML = ""
    const imgTag = document.createElement("img")
    imgTag.src = dog.image
    const h2Tag = document.createElement("h2")
    h2Tag.textContent = dog.name
    const btn = document.createElement("button")
    btn.innerText = dog.isGoodDog? "Good Dog!" : "Bad Dog!";
    btn.addEventListener("click", (e) => {
        dog.isGoodDog = !dog.isGoodDog; 
        btn.innerText = dog.isGoodDog? "Good Dog!" : "Bad Dog!"; 
        updateDog(dog)
    })
    dInfo.append(imgTag, h2Tag, btn)
}
const updateDog = (dog) => {
    fetch(`${dogUrl}/${dog.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        isGoodDog: dog.isGoodDog
      })
    })
    .then(res => res.json())
    .then(updatedDog => {
      console.log(`Dog ${updatedDog.name} updated!`)
    })
    .catch(error => console.error(error))
  }
// Init
const init = () =>{
    fetchDogs()
}
init()