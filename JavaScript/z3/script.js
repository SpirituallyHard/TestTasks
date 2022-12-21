const Table = document.querySelector("table");
const TableBody = document.querySelector("tbody");
const btn = document.querySelector(".resetBtn")
const Start = document.querySelector(".StartPrice")
const Finish = document.querySelector(".FinishPrice")
const TableHead = document.querySelector("thead")

const URL = "http://exercise.develop.maximaster.ru/service/products/"

let DataBase;

fetch(URL).then(data => data.json()).then(data => {
    DataBase = data
    ST(data)
})

btn.addEventListener('click', () => {
    const StartValue = Number(Start.value);
    const FinishValue = Number(Finish.value);
    if(StartValue == 0 && FinishValue == 0){
        ST(DataBase)
    }
    else if(StartValue <= FinishValue && !isNaN(StartValue) && !isNaN(FinishValue)){
        ST(DataBase, Number(Start.value), Number(Finish.value))
    }
    else{
        console.log("Error")
    }
})

const ST = (data, StartPrice = 0, FinishPrice = Math.max() * (-1)) => {
    TableBody.innerHTML = "";
    data.forEach((Element, i) => {
        if(Number(Element.price) >= StartPrice && Number(Element.price) <= FinishPrice){
            const TableString = document.createElement("tr")
            const ID = document.createElement("td");
            const Name = document.createElement("td");
            const Price = document.createElement("td");
            const Quantity = document.createElement("td");
            const Sum = document.createElement("td");
            ID.innerHTML = i + 1;
            Name.innerHTML = Element.name;
            Price.innerHTML = Element.price;
            Quantity.innerHTML = Element.quantity;
            Sum.innerHTML = Number(Element.price * Element.quantity)
            TableString.appendChild(ID)
            TableString.appendChild(Name)
            TableString.appendChild(Quantity)
            TableString.appendChild(Price)
            TableString.appendChild(Sum)
            TableBody.appendChild(TableString)
        }
    })
    if(TableBody.innerHTML == ""){
        TableHead.style.display = 'none';Table.style.border = 'none';Table.style.textAlign = 'center'
        TableBody.innerHTML = "Нет данных, попадающих под условия фильтра"
    }
    else{
        TableHead.style = null;Table.style = null
    }
}