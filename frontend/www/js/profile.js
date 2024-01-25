const firstName = document.querySelector('#firstName')
const lastName = document.querySelector('#lastName')
const email = document.querySelector('#email')
const age = document.querySelector('#age')
const button = document.querySelector('button')

window.addEventListener('load', async () => {
    console.log(document.cookie.split("=")[1])
    const response_json = await fetch('http://localhost:8080/api/users/profile',{ 
    headers: {
        'Authorization': `Bearer ${document.cookie.split("=")[1]}`
      }})
    console.log(await response_json)
    // if (response_json.status !== 200) {
    //     alert('Debes iniciar sesión')
    //     return (window.location.href = '/login.html')
    // }
   
    const response = await response_json.json()

    firstName.innerHTML = `<p>${response.payload.firstName}</p>`
    lastName.innerHTML = `<p>${response.payload.lastName}</p>`
    email.innerHTML = `<p>${response.payload.email}</p>`
    age.innerHTML = `<p>${response.payload.age}</p>` 
    
    button.addEventListener('click', async()=>{
        const response_json = await fetch('http://localhost:8080/api/sessions/logout',  {
            method: 'DELETE'
        })

        console.log(await response_json.json())

        if(response_json.status === 200){
            document.cookie = "Authorization=; expires=Thu, 19 Dec 2024 12:00:00 UTC; path=/"
            window.location.href = '/login.html'
        }
    })
})

