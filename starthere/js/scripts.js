// Grab the entire URL for this page, including the attached query values
const currentUrl = window.location.href;

// Divide the URL into two parts: base URL and query string
const everything = currentUrl.split('?');

//Grab just the second half
let formData = everything[1].split('&')

function show(cup) {
    console.log(cup);
    formData.forEach((element) => {
        if (element.startsWith(cup)) {
            result=element.split('=')[1].replace("%40","@")
    }
})
return(result)
} //end show

const showInfo = document.querySelector('#results')
showInfo.innerHTML = `
<p>Appointment for ${show("first")} ${show("last")}</p>
<p>Proxy ${show('orginance')} on ${show('fecha')} in the ${show('location')} Temple.</p>
<p>Your Phone: ${show('phone')}</p>
<p>Your Email: ${show('email')}</p>
`

