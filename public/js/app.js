const weatherForm = document.querySelector("form")
const search = document.querySelector("input")
const messageOne = document.querySelector("#message-1")
const messageTwo = document.querySelector("#message-2")

weatherForm.addEventListener("submit",(e)=>{
    e.preventDefault();

    const address = search.value;
    
    messageOne.textContent = "Loading......";
    messageTwo.textContent = ""
    
    fetch("/weather?address=" + address).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                messageOne.textContent =data.error;
            } else {
                messageOne.textContent = data.location + ", " + data.description
                messageTwo.textContent = "Temperature is " + data.temperature + " degrees and feels like " + data.feelsLike + "."
            }
        });
    })
})

