const accessKey = "E8uHAfA8xVUwgQl3r_IOFIBCpkADA5OHzFjlwh-RQLg"

const form = document.querySelector("form")
const inpute1 = document.querySelector("#search-input")
const searchResults = document.querySelector(".search-results")
const showMore = document.querySelector(".showmore")

let inputdata = ''
let page = 1;
async function searchImg(){
    inputdata = inpute1.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputdata}&client_id=${accessKey}`

    const response = await fetch(url);
    const data = await response.json();

    const results = data.results;

    if(page ===  1){
        searchResults.innerHTML = ''
    }

    results.map((result) => {
        const imageWrapper =  document.createElement("div")
        imageWrapper.classList.add("search-results")
        const image = document.createElement("img")
        image.src = result.urls.small
        image.alt = result.alt_description
        const imagelink = document.createElement("a")
        imagelink.href = result.links.html
        imagelink.target = "_blank"
        imagelink.textContent = result.alt_description


        imageWrapper.appendChild(image)
        imageWrapper.appendChild(imagelink)
        searchResults.appendChild(imageWrapper)
    });

    page++;
    if(page>1){
        showMore.style.display = "block";
    }

    
}

form.addEventListener("submit",(event)=>{
    event.preventDefault()
    page = 1;
    searchImg()
})


showMore.addEventListener("submit",()=>{
    searchImg()
})

