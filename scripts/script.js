document.addEventListener('DOMContentLoaded', () => {
    // Hamburger Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const menu = document.querySelector('nav ul');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            menu.classList.toggle('active');
        });
    }

    // Set the current year dynamically
    const currentYear = new Date().getFullYear();
    const currentYearElement = document.getElementById("currentYear");
    if (currentYearElement) {
        currentYearElement.textContent = currentYear;
    }

    // Set the last modified date dynamically
    const lastModifiedDate = new Date(document.lastModified);
    const lastModifiedElement = document.getElementById("lastModified");
    if (lastModifiedElement) {
        lastModifiedElement.textContent = `Last Updated: ${lastModifiedDate.toLocaleDateString()}`;
    }

    // Courses data
    const courses = [
        { code: "CSE 110", completed: true, credits: 2 },
        { code: "WDD 130", completed: true, credits: 2 },
        { code: "CSE 111", completed: true, credits: 2 },
        { code: "CSE 210", completed: true, credits: 2 },
        { code: "WDD 131", completed: true, credits: 2 },
        { code: "WDD 231", completed: false, credits: 2 },
    ];

    const courseList = document.getElementById("course-list");
    const filterButtons = document.querySelectorAll(".filter-buttons button");
    const totalCreditsElement = document.getElementById("total-credits");
    const courseDetails = document.getElementById("course-details");

    // Function to display the modal with course details
    function displayCourseDetails(course) {
        courseDetails.innerHTML = '';
        courseDetails.innerHTML = `
            <button id="closeModal">❌</button>
            <h2>${course.code}</h2>
            <h3>${course.completed ? "Completed" : "Not Completed"}</h3>
            <p><strong>Credits:</strong> ${course.credits}</p>
            <p><strong>Description:</strong> Example description for ${course.code}</p>
        `;

        // Show the modal
        courseDetails.showModal();

        // Close modal functionality
        const closeModal = document.getElementById("closeModal");
        closeModal.addEventListener("click", () => {
            courseDetails.close();
        });

        // Close the modal when clicking outside of it
        courseDetails.addEventListener("click", (event) => {
            if (event.target === courseDetails) {
                courseDetails.close();
            }
        });
    }

    // Function to display courses
    const displayCourses = (filter = "all") => {
        if (!courseList) return;

        courseList.innerHTML = ""; // Clear current course list
        courses
            .filter(course => filter === "all" || course.code.startsWith(filter.toUpperCase()))
            .forEach(course => {
                const courseCard = document.createElement("div");
                courseCard.textContent = `${course.code} (${course.credits} credits)`;
                courseCard.className = `course-card ${course.completed ? "completed" : ""}`;
                courseCard.setAttribute("data-credits", course.credits); // Add data-credits attribute

                // Add click event listener to show modal
                courseCard.addEventListener("click", () => {
                    displayCourseDetails(course);
                });

                courseList.appendChild(courseCard);
            });

        // Recalculate total credits after displaying
        calculateTotalCredits();
    };

    // Function to calculate total credits
    const calculateTotalCredits = () => {
        if (!totalCreditsElement) return;

        let totalCredits = 0;

        courses.forEach(course => {
            if (course.completed) {
                totalCredits += course.credits;
            }
        });

        totalCreditsElement.textContent = `Total Credits: ${totalCredits}`;
    };

    // Attach filter functionality to buttons
    if (filterButtons) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const filter = button.getAttribute('data-filter');
                displayCourses(filter);
            });
        });
    }

    // Initialize display
    displayCourses();
});


