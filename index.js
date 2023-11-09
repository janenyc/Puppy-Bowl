const apiBaseURL = `https://fsa-puppy-bowl.herokuapp.com/api/2310-FSA-ET-WEB-FT`;
const div = document.querySelector("div");

// State object to store all puppies and details
const state = {
    allPuppies: [],
    details: [],
};

//fetch and display details of a specific puppy
const getPuppyDetails = async (id) => {
    // Fetching puppy details from API
    const response = await fetch(`${apiBaseURL}/players/${id}`);
    const jsonResponse = await response.json();
    const puppyDetails = jsonResponse.data;
    // Rendering details of the puppy
    renderDetails(puppyDetails);
};
// render puppy details on the page
renderDetails = (detailOfPuppy) => {
    //Create HTML for puppy details
    const html = `<div class='container'>
                <h2>${detailOfPuppy.player.name}</h2>
                <img src="${detailOfPuppy.player.imageUrl}" alt="Image of ${detailOfPuppy.player.name}">
                <p>Breed: ${detailOfPuppy.player.breed}</p>
                <p>Status: ${detailOfPuppy.player.status}</p>
                <button id="back-button">Go back to all puppies</button>
                </div>`
    div.innerHTML = html;
    // Adding event listener to the back button to go to all puppies
    const backButton = document.querySelector("#back-button");
    backButton.addEventListener("click", () => {
        getAllPuppies();
    });
};

//Fetch data from API and store all puppies in the state
const getAllPuppies = async () => {
    div.innerHTML = "";
    const response = await fetch(`${apiBaseURL}/players`);
    const responseJson = await response.json();
    state.allPuppies = responseJson.data.players;
    renderAllPuppies();
};

//Display all puppies on the page
const renderAllPuppies = () => {
    div.innerHTML = "";
    //create an article for each puppy card
    const section = document.createElement("section");
    //Map through each element and add single element to the article
    section.innerHTML = state.allPuppies
    .map(
        (singlePuppy) =>
            `<article id= ${singlePuppy.id}>
            <img src ="${singlePuppy.imageUrl}">
            <p>${singlePuppy.name}</p>
            <button class="view-button" id="${singlePuppy.id}">View Details</button>
            <button class="delete-button" id="${singlePuppy.id}">Delete</button>
            </article>`
    )
    .join(" ");
    div.appendChild(section);

    //Event listener for showing puppy details
    const viewDetailsButtons = document.querySelectorAll(".view-button");
    viewDetailsButtons.forEach((button) => {
        button.addEventListener("click", (event) => {
            getPuppyDetails(event.target.id);
        });
    });

    //Add event listener to delete button
    const deleteButtons = document.querySelectorAll('.delete-button')
    deleteButtons.forEach((button)=>{
        button.addEventListener('click', (event)=>{
            deletePuppy(event.target.id)
        })
    })
};
getAllPuppies();

//Form submission to add a new puppy
const form = document.querySelector("form");
form.addEventListener("submit", async (event) => {
    event.preventDefault();
    await addNewPuppy();
});
//Function to add a new puppy
const addNewPuppy = async () => {
    const nameInput = document.querySelector("#name");
    const imageInput = document.querySelector("#imgUrl");
    const breedInput = document.querySelector("#breed");
    const statusInput = document.querySelector("#status");

    const response = await fetch(`${apiBaseURL}/players`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            name: nameInput.value,
            imageUrl: imageInput.value,
            breed: breedInput.value,
            status: statusInput.value,
        }),
    });
    const newPuppy = await response.json();
    state.allPuppies.push(newPuppy);
    renderAllPuppies();

    // Clear the form fields
    nameInput.value = "";
    imageInput.value = "";
    breedInput.value = "";
    statusInput.value = "bench";
};

//Function to delete a puppy
const deletePuppy = async()=>{
    try{
    const response =await fetch(`${apiBaseURL}/players/${id}`,{
        method: "DELETE",
    })
    const result = await response.json();
    console.log(result);
    }
    catch(err){
        console.error(err);
    }
}

