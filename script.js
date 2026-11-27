/* ==================================
   CAMPUSCONNECT - EVENT PORTAL
   JavaScript File: script.js
================================== */

// 1. EVENT DATA

const events = {
    "Campus Music Fest": {
        date: "28 November 2026",
        time: "4:00 PM onwards",
        description: "A lively evening of music, performances and student talent."
    },

    "Business Ideas Summit": {
        date: "1 December 2026",
        time: "To be announced",
        description: "Share ideas, learn from discussions and explore entrepreneurship."
    },

    "Tech Innovation Day": {
        date: "4 December 2026",
        time: "To be announced",
        description: "Explore student projects, technology and creative solutions."
    }
};


// 2. SELECT HTML ELEMENTS

const eventButtons = document.querySelectorAll(".event-button");

const detailTitle = document.getElementById("detail-title");
const detailDescription = document.getElementById("detail-description");
const detailDate = document.getElementById("detail-date");
const detailTime = document.getElementById("detail-time");

const registrationForm = document.getElementById("registration-form");
const registrationList = document.getElementById("registration-list");

const formError = document.getElementById("form-error");

const confirmation = document.getElementById("confirmation");
const confirmationText = document.getElementById("confirmation-text");


// 3. VIEW EVENT DETAILS

eventButtons.forEach(button => {

    button.addEventListener("click", function () {

        const eventName = this.dataset.event;
        const event = events[eventName];

        if (!event) return;

        detailTitle.textContent = eventName;
        detailDescription.textContent = event.description;
        detailDate.textContent = event.date;
        detailTime.textContent = event.time;

        document.getElementById("details").scrollIntoView({
            behavior: "smooth"
        });

    });

});


// 4. GET REGISTRATIONS FROM LOCAL STORAGE

function getRegistrations() {

    return JSON.parse(localStorage.getItem("registrations")) || [];

}


// 5. SAVE REGISTRATIONS

function saveRegistrations(registrations) {

    localStorage.setItem(
        "registrations",
        JSON.stringify(registrations)
    );

}


// 6. DISPLAY MY REGISTRATIONS

function displayRegistrations() {

    const registrations = getRegistrations();

    registrationList.innerHTML = "";

    if (registrations.length === 0) {

        registrationList.innerHTML = '<p class="empty-message">You have not registered for any events yet.</p>';

        return;
    }

    registrations.forEach(registration => {

        const card = document.createElement("div");

        card.className = "saved-registration";

        const heading = document.createElement("h3");

        heading.textContent = registration.event;

        const name = document.createElement("p");

        name.textContent = "Student Name: " + registration.name;

        const studentId = document.createElement("p");

        studentId.textContent = "Student ID: " + registration.studentId;

        const email = document.createElement("p");

        email.textContent = "Email: " + registration.email;

        card.appendChild(heading);
        card.appendChild(name);
        card.appendChild(studentId);
        card.appendChild(email);

        registrationList.appendChild(card);

    });

}


// 7. EVENT REGISTRATION FORM

registrationForm.addEventListener("submit", function (e) {

    e.preventDefault();

    const name = document.getElementById("student-name").value.trim();

    const studentId = document.getElementById("student-id").value.trim();

    const email = document.getElementById("student-email").value.trim();

    const event = document.getElementById("event-choice").value;


    // Check empty fields

    if (!name || !studentId || !email || !event) {

        formError.textContent = "Please fill all the fields.";

        return;
    }


    // Check valid event

    if (!events[event]) {

        formError.textContent = "Please select a valid event.";

        return;
    }


    // Get existing registrations

    const registrations = getRegistrations();


    // Check duplicate registration

    const alreadyRegistered = registrations.some(registration => {

        return registration.studentId === studentId &&
               registration.event === event;

    });


    if (alreadyRegistered) {

        formError.textContent =
            "You are already registered for this event.";

        return;
    }


    // Create new registration

    const newRegistration = {

        name: name,
        studentId: studentId,
        email: email,
        event: event

    };


    // Save registration

    registrations.push(newRegistration);

    saveRegistrations(registrations);


    // Show confirmation message

    formError.textContent = "";

    confirmationText.textContent =
        name + ", your registration for " + event +
        " has been saved successfully.";

    confirmation.classList.remove("hidden");


    // Reset form

    registrationForm.reset();


    // Update registration list

    displayRegistrations();


    // Scroll to confirmation

    confirmation.scrollIntoView({

        behavior: "smooth"

    });

});


// 8. LOAD SAVED REGISTRATIONS WHEN PAGE OPENS

displayRegistrations();
