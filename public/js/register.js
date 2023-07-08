// ### 0. INTITAL USER - START

// Set Cookie
function setCookie(cname, cvalue, exdays){
	const d = new Date();
	d.setTime(d.getTime() + (exdays*24*60*60*1000));
	let expires = "expires="+ d.toUTCString();
	document.cookie = cname + "=" + cvalue + ";" + expires + ";";
}

// Verify the Invite Code
let form = document.querySelector('#verifyForm')
form.addEventListener("submit", async function(e){
    e.preventDefault();
    let inviteCode = document.getElementById('invite-code').value.replace('  ', '').replace(' ', '')
    
    // If Invite Code Entered is structurally correct (contains dashes)
    if (inviteCode.includes('-')){
        try {
            // Perform an API Request and Get the Details
            let response = await fetch(`http://139.59.36.141/users/${inviteCode}`)
            let userdata = await response.json()

            // If the Invite is Valid, Load Cookies and Redirect to 'invite.html'
            let {name, uniqueId, balance, inviterName, inviterUniqueId, invitations} = userdata;
            setCookie('name', name, 100)
            setCookie('uniqueId', uniqueId, 100)
            setCookie('balance', balance, 100)
            setCookie('inviterName', inviterName, 100)
            setCookie('inviterUniqueId', inviterUniqueId, 100)

            // If 'Invitations' Array is not empty, set the 'inviteeOneName', 'inviteeTwoName' and their corresponding 'UniqueId' cookies
            // console.log(invitations.length)
            // invitations.forEach(invite => {
            //     console.log
            // });
            // Redirect to 'invite.html'
            window.location.href = 'invite.html'

        } catch (error) {
            // If Invite is Invalid, Display Error Message
            let errorMessage = document.getElementById('errorMessage')
            errorMessage.innerHTML = 'Invalid Invite Code'
            setTimeout(() => {
                errorMessage.innerHTML = ''
            }, 2000)
        }

    } else {
        // If Invite Code is Structurally Invalid, Display Error Message
        let errorMessage = document.getElementById('errorMessage')
        errorMessage.innerHTML = 'Invalid Invite Code Format. Correct Format: dazzling-shallow-rainbow'
    }

})

// ### 0. INITIAL USER - END



// ### 1. SUBSEQUENT USER - START

// If Cookies Exist, Redirect to 'invite.html'
if (document.cookie != ''){
    window.location.href = 'invite.html'
}

// ### 1. SUBSEQUENT USER - END