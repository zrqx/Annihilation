// ### 1. USER - INITIAL SCRIPT - START ###

// Select Elements
let form = document.querySelector('#genesisRegisterForm')

// API Request for User Registration with 'Genesis' defaults
async function registerUser(name){
    const response = await fetch('https://zrqx.in/users', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: name,
            inviterName: 'Genesis',
            inviterUniqueId: 'i-am-life'
        })
    })
    const content = await response.json()
    return content
}

// Set Cookies
function setCookie(cname, cvalue, exdays){
	const d = new Date();
	d.setTime(d.getTime() + (exdays*24*60*60*1000));
	let expires = "expires="+ d.toUTCString();
	document.cookie = cname + "=" + cvalue + ";" + expires + ";";
}

// On Clicking Submit Button, Prevent Default, Handle the Input 
form.addEventListener("submit", async function(e){
    e.preventDefault();
    let name = document.getElementById('name').value
    try {
        let userdata = await registerUser(name)
        if (userdata != null){
            // Set Cookies and Redirect
            let {name, uniqueId, balance, inviterName, inviterUniqueId} = userdata;
            setCookie('name', name, 100)
            setCookie('uniqueId', uniqueId, 100)
            setCookie('balance', balance, 100)
            setCookie('inviterName', inviterName, 100)
            setCookie('inviterUniqueId', inviterUniqueId, 100)
    
            // Redirect
            window.location.href = 'index.html'
        }
    } catch (error) {
        let submitButton = document.getElementById('submitButton')
        submitButton.innerHTML = "Error: Something Happened"
    }
})

// ### 1. USER - INITIAL SCRIPT - END ###



// ### 2. USER - SUBSEQUENT SCRIPT - START ###

// Check Whether Cookies Exist. If yes, Redirect the user to invite.html
if (document.cookie != ''){
    window.location.href = 'invite.html'
}

// ### 2. USER - SUBSEQUENT SCRIPT - END ###