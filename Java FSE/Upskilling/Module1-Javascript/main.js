console.log("Welcome to the Community Portal");

window.onload = () => {
    alert("Page Loaded Successfully");
};

class Event {

    constructor(name, category, seats) {
        this.name = name;
        this.category = category;
        this.seats = seats;
    }

    checkAvailability() {
        return this.seats > 0;
    }
}

let events = [

    new Event("Music Fest", "Music", 20),

    new Event("Baking Workshop", "Workshop", 15),

    new Event("Football Match", "Sports", 0)

];

function displayEvents(eventList) {

    const container =
        document.querySelector("#eventContainer");

    container.innerHTML = "";

    eventList.forEach(event => {

        if (event.checkAvailability()) {

            const card =
                document.createElement("div");

            card.classList.add("card");

            card.innerHTML = `
                <h3>${event.name}</h3>
                <p>Category: ${event.category}</p>
                <p>Seats: ${event.seats}</p>
                <button onclick="registerUser('${event.name}')">
                    Register
                </button>
            `;

            container.appendChild(card);
        }
    });
}

displayEvents(events);

function registerUser(eventName) {

    try {

        const event =
            events.find(e => e.name === eventName);

        if (!event) {
            throw new Error("Event Not Found");
        }

        if (event.seats <= 0) {
            throw new Error("No Seats Available");
        }

        event.seats--;

        alert(
            `Registered for ${eventName}
Remaining Seats: ${event.seats}`
        );

        displayEvents(events);

    }
    catch(error) {
        alert(error.message);
    }
}

document
.querySelector("#categoryFilter")
.addEventListener("change", function(){

    const category = this.value;

    if(category === "All"){
        displayEvents(events);
    }
    else{

        const filtered =
            events.filter(
                event =>
                event.category === category
            );

        displayEvents(filtered);
    }
});

document
.querySelector("#registrationForm")
.addEventListener("submit", function(event){

    event.preventDefault();

    const name =
        this.elements["name"].value;

    const email =
        this.elements["email"].value;

    const selectedEvent =
        this.elements["event"].value;

    const message =
        document.querySelector("#message");

    if(name === "" || email === ""){

        message.innerHTML =
            "Please fill all fields";

        return;
    }

    message.innerHTML =
        `Registration Successful for
        ${selectedEvent}`;
});

function fetchEvents(){

    console.log("Loading Events...");

    fetch(
    "https://jsonplaceholder.typicode.com/posts"
    )
    .then(response => response.json())
    .then(data => {

        console.log(
            "Data Loaded Successfully"
        );

    })
    .catch(error => {

        console.log(error);

    });
}

fetchEvents();

async function loadEvents(){

    try{

        const response =
            await fetch(
            "https://jsonplaceholder.typicode.com/posts"
            );

        const data =
            await response.json();

        console.log(
            "Async/Await Data Loaded"
        );

    }
    catch(error){

        console.log(error);
    }
}

loadEvents();

const clonedEvents = [...events];

console.log(clonedEvents);

Object.entries(events[0]).forEach(
    ([key,value]) => {
        console.log(key,value);
    }
);