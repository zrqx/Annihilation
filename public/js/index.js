// ## No Change when Cookies aren't set 

// Set Stats and Display
async function setStats() {
    let daysCount = document.querySelector('.daysCount')
    let invitesCount = document.querySelector('.invitesCount')

    let response = await fetch(`https://zrqx.in/stats`)

    invitesCount.innerHTML =  `${await response.json()} Invitations Sent`
    daysCount.innerHTML = `${21 - new Date().getDate()} Days to Go`
}

setStats()

// ### 1. SUBSEQUENT USER - START

// Select the Element
let ctaButton = document.querySelector('#cta-button')
let registerNavLink = document.querySelector('.register-nav-link')

// Get Cookie

function getCookie(cname){
    let cookieQuery = cname + '='
    let cookies = document.cookie.split(';')
    for (let i = 0; i < cookies.length; i++){
        if (cookies[i].includes(cookieQuery)){
            return cookies[i].replace(cookieQuery, '')
        }
    }
}

// Check for Existence of Cookies. Remove .register-nav-link element

if (document.cookie != ''){
    registerNavLink.remove()
    let name = getCookie('name')
    // Change CTA Text and Link href
    ctaButton.innerHTML = `${name}, Invite your Friends`
    ctaButton.href = 'invite.html'
}

// ### 1. SUBSEQUENT USER - END
