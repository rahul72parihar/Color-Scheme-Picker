const generateBtn = document.getElementById("generate")
const pickColorEl = document.getElementById("pickColor")
const modeEl = document.getElementById("input-list")
const formEl = document.getElementById("color-form")
const copiedEl = document.getElementById("copied")
formEl.addEventListener('submit',function(e){
    e.preventDefault()
    renderColors()
})
function renderColors(){
    let currColor = pickColorEl.value.slice(1)
    let currMode = modeEl.value
    // console.log("currMode -> "+currMode)
    // console.log(currColor)
    fetch(`https://www.thecolorapi.com/scheme?hex=${currColor}&mode=${currMode}&count=5`)
        .then(res => res.json())
        .then(data=>{
            for(let i = 0; i<5; i++){
                // console.log("color"+i+" -> "+data.colors[i].hex.value)
                let temp = data.colors[i].hex.value;
                document.getElementsByClassName(`color`)[i].style.backgroundColor=temp
                console.log("dataset->"+document.getElementsByClassName(`color`)[i].dataset.color)
                document.getElementsByClassName(`color`)[i].dataset.color=temp
                document.getElementsByClassName(`color-name`)[i].textContent=temp
                // console.log(data.colors[i].hex.value)
            }
        })
}
let flag = false;
document.addEventListener('click',function(e){
    if(e.target.classList.contains("color")){
        console.log(e.target.getAttribute('data-color'))
        copyFunction(e.target.getAttribute('data-color'))
    }
    else if(e.target.classList.contains("color-name")){
        console.log(e.target.textContent)
        copyFunction(e.target.textContent)
    }
})
function copyFunction(element){
    navigator.clipboard.writeText(element)
    copiedEl.style.display="block";
    setTimeout(function(){
        copiedEl.style.display="none";
    },1200)
}