const button =  document.querySelector('#session')


button.addEventListener('click', async()=>{
    const response_json = await fetch('/logout',  {
        method: 'DELETE'
    })
  
    if(response_json.status === 200){
        window.location.href = '/login'
    }
  })