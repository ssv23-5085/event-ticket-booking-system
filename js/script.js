//Add Tickets State
const remainingTickets = {
    "Avengers Movie": 50,
    "Music Concert": 40,
    "Cricket Match": 60
}
// Select Elements 
const modal = document.getElementById("booking-modal");
const bookButtons = document.querySelectorAll(".book-btn");
const closeBtn = document.querySelector(".close-btn");
const eventSelect = document.getElementById("event");

//Open Modal when any book button is clicked
bookButtons.forEach(button => {
    button.addEventListener("click", () => {
       modal.style.display = "block";
       //Get Event name from button
       const eventName = button.getAttribute("data-event");
       //Set selected event in dropdown
       eventSelect.value = eventName;
    });
});

//Close Modal

closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
});

//Close when clicking outside modal

window.addEventListener("click", (e) => {
    if(e.target === modal) {
        modal.style.display = "none";
    }
});

//Form Validation
const bookingForm = document.getElementById("booking-form");

bookingForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const name = document.getElementById("name").value.trim();

    const email = document.getElementById("email").value.trim();

    const eventSelected = document.getElementById("event").value;

    const tickets = document.getElementById("tickets").value;

    //Name Validation
    if(name === "") {
        alert("Please enter your name.");
       return;
}

       //Email Validation
    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if(!email.match(emailPattern)) {
        alert("Please enter a valid email address.");
        return;
}

        //Tickets Validation
    if(tickets === "" || tickets <= 0) {
         alert("Please enter a valid ticket quantity.");
         return; 
    }

    if(tickets > 10) {
        alert("You can book maximum 10 tickets.")
        return;
    }

    const ticketsRequested = parseInt(tickets);
    if(remainingTickets[eventSelected] < ticketsRequested) {
        alert("Not enough tickets availabe!");
        return;
    }
    remainingTickets[eventSelected] -= ticketsRequested;

    let ticketElement;

    if(eventSelected === "Avengers Movie") {
        ticketElement = document.getElementById("tickets-avengers");
    }

    if(eventSelected === "Music Concert") {
        ticketElement = document.getElementById("tickets-concert");
    }
     
    if(eventSelected === "Cricket Match") {
        ticketElement = document.getElementById("tickets-cricket");
    }

    ticketElement.textContent = "Tickets Left: " + remainingTickets[eventSelected];

    if(remainingTickets[eventSelected] < 10) {
        ticketElement.classList.add("low");
    }
     
    //Success message
    alert(
        "🎉 Booking Confirmed!\n\n" +
        "Name: " + name +
        "\nEvent: " + eventSelected +
        "\nTickets: " + tickets
);

  //Reset Form
  bookingForm.reset();

  //Close popup
  modal.style.display = "none"; 
          

});