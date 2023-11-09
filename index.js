const apiBaseURL = `https://fsa-puppy-bowl.herokuapp.com/api/2310-FSA-ET-WEB-FT`;
const body = document.querySelector("body");

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
    const html = `<h2>${detailOfPuppy.player.name}</h2>
                <img src="${detailOfPuppy.player.imageUrl}" alt="image of a puppy">
                <p>${detailOfPuppy.player.breed}</p>
                <button id="back-button">Go back to all puppies</button>`;
    body.innerHTML = html;
    // Adding event listener to the back button to go to all puppies
    const backButton = document.querySelector("#back-button");
    backButton.addEventListener("click", () => {
        getAllPuppies();
    });
};

//Fetch data from API and store all puppies in the state
const getAllPuppies = async () => {
    body.innerHTML = "";
    const response = await fetch(`${apiBaseURL}/players`);
    const responseJson = await response.json();
    state.allPuppies = responseJson.data.players;
    renderAllPuppies();
};



//Display all puppies on the page
const renderAllPuppies = () => {
    body.innerHTML = "";
    //create an article for each puppy card
    const section = document.createElement("section");
    //Map through each element and add single element to the article
    section.innerHTML = state.allPuppies
    .map(
        (singlePuppy) =>
            `<article id= ${singlePuppy.id}><img src =${singlePuppy.imageUrl}><p>${singlePuppy.name}</p></article>`
    )
    .join("");
    body.appendChild(section);

    //Create event target for each puppy
    const puppyCards = document.querySelectorAll("article");
    puppyCards.forEach((puppyCardItem) => {
        puppyCardItem.addEventListener("click", (event) => {
            getPuppyDetails(event.target.id || event.target.parentNode.id);
        });
    });
};
getAllPuppies();

//