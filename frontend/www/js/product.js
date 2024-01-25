const title = document.querySelector('h1')
const showProducts = document.querySelector('#showProducts')
const input = document.querySelector('input')

window.addEventListener('load', async ()=>{
    const query = new URLSearchParams(window.location.search);
    const param_id = query.get('product')
    input.value = param_id

    //Mostrar producto
    const response_json = await fetch(`http://localhost:8080/api/products/${param_id}`)
    const response = await response_json.json()
    showAllProducts(response.payload)


    //Agregar al carrito
    document.querySelector('button').addEventListener('click', async (e) =>{
        e.preventDefault()
        const product_id = input.value
        try{
            const response = await fetch('http://localhost:8080/api/carts',{
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json'
                }
        })
        if (response.status === 200){
            const data = await response.json()
            const cart_id = data.payload._id
            const cart = await fetch(`http://localhost:8080/api/carts/${cart_id}/product/${product_id}`,{
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json'
                }
            })
            alert("El producto fue agregado al carrito")
        }
        }catch(e){
           console.log(e.message) 
        }
        
    })
})


function showAllProducts(payload){
        title.innerText = `${payload.title}`
        showProducts.innerHTML = `
        <ul>
            <li> Descripción: ${payload.description}</li>
            <li> Precio: ${payload.price} </li>
        </ul>
        <img src="${payload.thumbnail[0]}">
        <br>
        `
}