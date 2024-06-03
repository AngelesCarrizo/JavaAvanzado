import { API } from "./api.js"
console.log(API)
const lista = document.getElementById("todosprod")


const auth =async ({id,nombre,desc,precio,imagen,stock}) =>{
    const data = await fetch('http://localhost:3000/prod/allprod',{
        method:"get",
        headers:{
            "Content-Type": "application/json",
        }
    })
    const
}

ñista.addEventListener('click', (e)=>{
  
   
})

   

    
