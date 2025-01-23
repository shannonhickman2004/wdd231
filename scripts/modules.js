import aCourse from "./scripts/course.mjs";

document.addEventListener("DOMContentLoaded", () => {
    aCourse.init();

    document.querySelector("#enrollStudent").addEventListener("click", function () {
        const sectionNum = parseInt(document.querySelector("#sectionNumber").value);
        if (isNaN(sectionNum)) {
            alert("Please enter a valid section number.");
            return;
        }
        aCourse.changeEnrollment(sectionNum);
    });

    document.querySelector("#dropStudent").addEventListener("click", function () {
        const sectionNum = parseInt(document.querySelector("#sectionNumber").value);
        if (isNaN(sectionNum)) {
            alert("Please enter a valid section number.");
            return;
        }
        aCourse.changeEnrollment(sectionNum, false);
    });
});
