document.getElementById("lodingarea").style.display="none"
/* search click me */
const searchclick = () =>{
    document.getElementById("lodingarea").style.display="block"
    document.getElementById("erro").style.display ="none"
    document.getElementById("Mobile-area").innerHTML='';
    document.getElementById("Detail-area-display").innerHTML=''
    const input = document.getElementById("input-value");
    const inputvalue = input.value;
    if(inputvalue == ''){
        document.getElementById("erro").style.display ="block"
        document.getElementById("lodingarea").style.display="none"
        document.getElementsByClassName("allPhoneshow")[0].style.display="none"
    }else{
        const url = `https://openapi.programming-hero.com/api/phones?search=${inputvalue}`
        fetch(url)
        .then(res => res.json())
        .then(data => display(data.data))
    }
    input.value =''
}
/* search result and data */
const display = Mobile =>{
    document.getElementById("lodingarea").style.display="none"
    if(Mobile.length == 0){
       const erro = document.getElementById("erro");
       erro.innerText ="Did Not Mobile"
       erro.style.display ="block"
    }
    else if(Mobile.length >= 20){
        clickmobile(Mobile.slice(0,20))
        const allbutton = document.getElementsByClassName("allPhoneshow")[0];
        allbutton.style.display ="block"
        allbutton.addEventListener("click", function (){
            clickmobile(Mobile)
        })
    }
    else{
       
        clickmobile(Mobile)
    }
}
const clickmobile = Mobiledata =>{
    Mobiledata.forEach(Mobiles => {
        const Mobilearea = document.getElementById("Mobile-area");
        const div =document.createElement("div");
        div.style.padding="40px 0"
        div.innerHTML=`<div class="card pt-3">
        <img src="${Mobiles.image}" class="card-img-top w-50 mx-auto" alt="not a images">
        <div class="card-body">
            <h3>Names: ${Mobiles.phone_name}</h3>
            <h3>Brand: ${Mobiles.brand}</h3>
          <button class="btn btn-primary px-4" onclick="Detailclick('${Mobiles.slug}')">Detail</button>
        </div>
        </div>`
        Mobilearea.appendChild(div)
    });
    
}
/* Detail data load */
const Detailclick = Detail =>{
    document.getElementById("Detail-area-display").innerHTML=''
    const Details =`https://openapi.programming-hero.com/api/phone/${Detail}`
    fetch(Details)
    .then(res => res.json())
    .then(data =>displayDetail(data.data))
}
/* Detail displow show */
const displayDetail =(data)=>{
    const Detailresult = document.getElementById("Detail-area-display");
    const div = document.createElement("div");
    div.innerHTML =`<div class="card p-4">
        <img src="${data.image}" class="card-img-top w-50 mx-auto" alt="not a images">
        <div class="card-body">
            <h3>Names: ${data.name}</h3>
            <h3>Brand: ${data.brand}</h3>
            <h5>ReleasDate: ${data.releaseDate}</h5>
            <strong>${data.mainFeatures.storage}</strong>
            <strong>${data.mainFeatures.displaySize}</strong>
            <strong>${data.mainFeatures.chipSet}</strong>
            <strong>${data.mainFeatures.memory}</strong>
            <strong>${data.mainFeatures.sensors[0]}</strong>
            <strong>${data.mainFeatures.sensors[1]}</strong>
            <strong>${data.mainFeatures.sensors[2]}</strong>
            <strong>${data.mainFeatures.sensors[3]}</strong>
            <strong>${data.mainFeatures.sensors[4]}</strong>
            <strong>${data.mainFeatures.sensors[5]}</strong>
        </div>
    </div>
    ` 
    Detailresult.appendChild(div)
}
