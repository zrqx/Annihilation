// ### 1. USER - INITIAL SCRIPT - START

// Set Cookie
function setCookie(cname, cvalue, exdays){
	const d = new Date();
	d.setTime(d.getTime() + (exdays*24*60*60*1000));
	let expires = "expires="+ d.toUTCString();
	document.cookie = cname + "=" + cvalue + ";" + expires + ";";
}

// Get Cookie
function getCookie(cname){
    let cookieQuery = cname + '='
    let cookies = document.cookie.split('; ')

    for (let i = 0; i < cookies.length; i++){
        if (cookies[i].includes(cookieQuery)){
            return cookies[i].replace(cookieQuery, '')
        }
    }

}

// API Request to Get User Data
async function handleUserInvitations(inviteCode){
    let response = await fetch(`https://zrqx.in/users/${inviteCode}`)
    let userdata = await response.json()

    if (userdata.invitations.length != 0){
        let invitesArray = userdata.invitations

        invitesArray.forEach(inviteeUniqueId => {
            console.log(inviteeUniqueId)
        });
    }
}


// API Request for User Registration with 'Genesis' defaults
async function registerUser(inviteeName, inviterName, inviterUniqueId){
    const response = await fetch('https://zrqx.in/users', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: inviteeName,
            inviterName: inviterName,
            inviterUniqueId: inviterUniqueId
        })
    })
    const content = await response.json()
    return content
}

// Check for Existence of Cookies
if (document.cookie != ''){
    // If Exists, Hide "Cookie Check", "Register Yourself buttons" and "Register Nav Link"
    let postLoginUnwantedElements = document.querySelector('.pre-login')
    let registerNavLink = document.querySelector('.register-nav-link')
    postLoginUnwantedElements.remove()
    registerNavLink.remove()

    // Load Cookies
    let name = getCookie('name')
    let balance = Number(getCookie('balance'))
    let uniqueId = getCookie('uniqueId')
    let inviterName = getCookie('inviterName')
    let inviterUniqueId = getCookie('inviterUniqueId')

    // Change HTML Tag Text
    let nameField = document.querySelector('.name')
    let uniqueIdField = document.querySelector('.inviteeUniquId')
    let inviterNameField = document.querySelector('.inviterName')
    let balanceField = document.querySelector('.balance')

    nameField.textContent = name
    uniqueIdField.textContent = uniqueId
    inviterNameField.textContent = inviterName
    balanceField.textContent = balance

    // Get Invitations info and Set Cookies, If inviteeOneName isn't set and balance is not equal to 2
    if (balance != 2  && (getCookie('inviteeOneName') == '' || undefined)){
        handleUserInvitations(uniqueId)
    }

    // Handle "Invite Friends" form Submission
    let inviteForm = document.querySelector('#inviteForm')
    inviteForm.addEventListener("submit", async function(e){
        e.preventDefault();
        let inviteeName = document.getElementById('inviteeName').value
        if (balance != 0){
            let userdata = await registerUser(inviteeName, name, uniqueId)
    
            // Check the 'Balance' Cookie
            let balance = Number(getCookie('balance'))
            // If Balance = 2, Create "InviteeOneName" and "InviteeOneUniquId" Cookies. Decrement "Balance" by 1 and Update Cookie
            if (balance == 2){
                setCookie("InviteeOneName", userdata.name, 100)
                setCookie("InviteeOneUniquId", userdata.uniqueId, 100)
                setCookie("balance", balance-1, 100)
            } else if (balance == 1) {
                // If Balance = 1, Create "InviteeTwoName" and "InviteeTwoUniquId" Cookies. Decrement "Balance" by 1 and Update Cookie
                setCookie("InviteeTwoName", userdata.name, 100)
                setCookie("InviteeTwoUniquId", userdata.uniqueId, 100)
                setCookie("balance", balance-1, 100)
            }

            // Reload the Page
            location.reload()
        }

    })

    // When Balance is Zero, Remove the "Invite" Input and Button 
    if (balance == 0) {inviteForm.remove()}

    // Load 'inviteeOneName', 'inviteeOneUniqueId' and 2, If they exist
    let inviteeList = document.getElementById('inviteeList')

    if (getCookie('InviteeOneName') != undefined){
        inviteeList.innerHTML += `<div class="diff-text">1. ${getCookie("InviteeOneName")}'s Invite Code is <span class='inviteHighlight'>${getCookie("InviteeOneUniquId")}</span> </div>`
    }
    if (getCookie('InviteeTwoName') != undefined){
        inviteeList.innerHTML += `<div class="diff-text">2. ${getCookie("InviteeTwoName")}'s Invite Code is <span class='inviteHighlight'>${getCookie("InviteeTwoUniquId")}</span></div>`
    }

} else {
    // If doesn't exist, Hide "You've Been Invited", Description and "Invite Friends"
    let preLoginUnwantedElements = document.querySelector('.post-login')
    preLoginUnwantedElements.remove()
}


// ### 1. USER - INITIAL SCRIPT - END