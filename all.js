/*Declaration*/
let data = [];
const Url = "https://raw.githubusercontent.com/hexschool/js-training/main/travelApi.json";
const card = document.querySelector(".ticketCard-area");
const search = document.querySelector(".regionSearch");
const submit = document.querySelector(".addTicket-btn");
const item = document.querySelector("#searchResult-text");
const nameInput = document.querySelector('#ticketName');
const imgUrlInput = document.querySelector('#ticketImgUrl');
const priceInput = document.querySelector('#ticketPrice');
const groupInput = document.querySelector('#ticketNum');
const rateInput = document.querySelector('#ticketRate');
const descriptionInput = document.querySelector('#ticketDescription');
const errorMsg = `<i class="fas fa-exclamation-circle"></i><span>必填!</span>`;
let str = "";

axios.get(Url)
    .then(function (response) {
        data = response.data.data;
        init();
    })
    .catch(function (error) {
        alert("沒撈到資料...");
    });


function init(){
    card.innerHTML = "";
    item.textContent = "";
    let count = 0;
    data.forEach(function (item, index){
        str = concatenation(item);
        card.innerHTML += str;
        count ++;
    });
    item.textContent = `本次搜尋共 ${count} 筆資料`;
}
/*DRY*/
function concatenation(item){
    return `
    <li class="ticketCard">
            <div class="ticketCard-img">
                <a href="#">
                    <img src="${item.imgUrl}" alt="">
                </a>
                <div class="ticketCard-region">${item.area}</div>
                <div class="ticketCard-rank">${item.rate}</div>
            </div>
            <div class="ticketCard-content">
                <div>
                    <h3>
                        <a href="#" class="ticketCard-name">${item.name}</a>
                    </h3>
                    <p class="ticketCard-description">
                        ${item.description}
                    </p>
                </div>
                <div class="ticketCard-info">
                    <p class="ticketCard-num">
                        <span><i class="fas fa-exclamation-circle"></i></span>
                        剩下最後 <span id="ticketCard-num"> ${item.group}</span> 組
                    </p>
                    <p class="ticketCard-price">
                        TWD <span id="ticketCard-price">${item.price}</span>
                    </p>
                </div>
            </div>
        </li>
    `;
}
/*form submit check*/
function validation(item){
    return !(item.id === "" || item.name === "" || item.imgUrl === "" || item.area === "" || item.description === ""
        || item.group === "" || item.price === "" || item.rate <= 0 || item.rate > 10);
}




/*Submit action*/
submit.addEventListener('click',()=>{
    let name = document.querySelector("#ticketName").value;
    let imgUrl = document.querySelector("#ticketImgUrl").value;
    let area = document.querySelector("#ticketRegion").value;
    let price = document.querySelector("#ticketPrice").value;
    let group = document.querySelector("#ticketNum").value;
    let rate = document.querySelector("#ticketRate").value;
    let description = document.querySelector("#ticketDescription").value;
    let newData = {
        "id": data.length,
        "name": name,
        "imgUrl": imgUrl,
        "area": area,
        "description": description,
        "group": group,
        "price": price,
        "rate": rate
    }
    if(validation(newData)){
        data.push(newData);
        const allInput = document.querySelectorAll('.input');
        allInput.forEach((item)=>{
            item.value = "";
        });
        init();
        alert("新增成功");
    }else{
        alert("資料錯誤");
    }
});
/*Search action*/
search.addEventListener('change',()=> {
    if(search.value === ""){
        init();
    }else{
        card.innerHTML = "";
        let count = 0;
        data.filter(item => item.area === search.value)
            .forEach(function (item, index) {
                str = concatenation(item);
                card.innerHTML += str;
                count ++
            });
        item.textContent = `本次搜尋共 ${count} 筆資料`;
    }
});


/*AJAX no-blank-check*/
nameInput.addEventListener('blur',(e)=>{
    if(nameInput.value === ""){
        document.querySelector("#ticketName-message").innerHTML = errorMsg;
    }else{
        document.querySelector("#ticketName-message").innerHTML ="";
    }
});
imgUrlInput.addEventListener('blur',(e)=>{
    if(imgUrlInput.value === ""){
        document.querySelector("#ticketImgUrl-message").innerHTML = errorMsg;
    }else{
        document.querySelector("#ticketImgUrl-message").innerHTML ="";
    }
});
priceInput.addEventListener('blur',(e)=>{
    if(priceInput.value === ""){
        document.querySelector("#ticketPrice-message").innerHTML = errorMsg;
    }else{
        document.querySelector("#ticketPrice-message").innerHTML ="";
    }
});
groupInput.addEventListener('blur',(e)=>{
    if(groupInput.value === ""){
        document.querySelector("#ticketNum-message").innerHTML = errorMsg;
    }else{
        document.querySelector("#ticketNum-message").innerHTML ="";
    }
});
rateInput.addEventListener('blur',(e)=>{
    if(rateInput.value === ""){
        document.querySelector("#ticketRate-message").innerHTML = errorMsg;
    }else{
        document.querySelector("#ticketRate-message").innerHTML ="";
    }
});
descriptionInput.addEventListener('blur',(e)=>{
    if(descriptionInput.value === ""){
        document.querySelector("#ticketDescription-message").innerHTML = errorMsg;
    }else{
        document.querySelector("#ticketDescription-message").innerHTML ="";
    }
});





