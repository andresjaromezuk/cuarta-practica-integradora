const showProducts = document.querySelector('#showProducts')
const prevPage = document.querySelector('#prevPage')
const nextPage = document.querySelector('#nextPage')
const productTitle = document.querySelector('#productTitle')

window.addEventListener('load', async () => {
    
    const response_json = await fetch('http://localhost:8080/api/products?limit=1')
    const response = await response_json.json()
    
    const payload = response.payload
    console.log(response.payload)
    
    let prevLink = "/products?limit=1&page=1"
    
    let nextLink = payload.nextLink

    let product_id 

    //Mostrar productos
    product_id = showAllProducts(payload)
    
    //Botones de páginas
    showPageButtons(payload)
   
    console.log(product_id)
    prevPage.addEventListener('click', async ()=>{
        const response_json = await fetch(`http://localhost:8080/api/${prevLink}`)
        const response = await response_json.json()
        product_id = showAllProducts(response.payload)
        showPageButtons(response.payload)
        prevLink = response.payload.prevLink
        nextLink = response.payload.nextLink
    })
    
    nextPage.addEventListener('click', async ()=>{
        const response_json = await fetch(`http://localhost:8080/api${nextLink}`)
        const response = await response_json.json()
        product_id = showAllProducts(response.payload)
        showPageButtons(response.payload)
        nextLink = response.payload.nextLink
        prevLink = response.payload.prevLink
    })

    productTitle.addEventListener('click', async ()=>{
        window.location.href = `http://localhost:3000/product.html?product=${product_id}`
    })
    
})

function showAllProducts(payload){
    let product_id
    payload.docs.forEach(element => {
        productTitle.innerHTML = `<h3><a href="#"> ${element.title} </a></h3>`
        showProducts.innerHTML = `
        <ul>
            <li> Descripción: ${element.description}</li>
            <li> Precio: ${element.price} </li>
        </ul>
        <img src="${element.thumbnail[0]}">
        <br>
        `
        product_id = element._id
    });
    return product_id
}

function showPageButtons(payload){
    if(payload.hasPrevPage){
        prevPage.innerHTML = "<button> < Página anterior</button>"
    }
    
    if(payload.hasNextPage){
        nextPage.innerHTML = `<button>Página siguiente></button>`
    }
}