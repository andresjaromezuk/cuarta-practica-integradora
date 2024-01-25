const formLogin = document.querySelector('form')

formLogin.addEventListener('submit', async e => {
  e.preventDefault()

  const response = await fetch('http://localhost:8080/api/sessions/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    // @ts-ignore
    body: new URLSearchParams(new FormData(formLogin))
  })

  if (response.status === 201) {
    const {payload} = await response.json()
    document.cookie = `Authorization=${payload}; expires=Thu, 19 Dec 2024 12:00:00 UTC; path=/`
    window.location.href = '/profile.html'
  } else {
    const error = await response.json()
    alert(error.message)
  }
})