const SpreadSheet = document.getElementById('Spreadsheet');
const SpreadSheetBody = SpreadSheet.querySelector('tbody');
const Row_Add = document.querySelector('#Row_Add')
const Row_Remove = document.querySelector('#Row_Remove')
const Column_Add = document.querySelector('#Column_Add')
const Column_Remove = document.querySelector('#Column_Remove')
let trs = SpreadSheet.getElementsByTagName('tr');
let check = localStorage.length === 0 ? true : false

const DefaultTable = () =>
{
    for (let i = 0; i < 5; i++){SpreadSheetBody.insertRow(i)}
    for (let i = 0; i < trs.length; i++) {trs[i].innerHTML = "<td></td><td></td><td></td><td></td><td></td>"}
}

const TableRecoveryAfterUpdate = () =>
{
    if(check) {DefaultTable()}
    else
    {
        let temp=[];
        let temp3=[];
        for (let i = 0; i < localStorage.length; i++)
        {
            let test = localStorage.key(i);
            let temp2 = test.split(' ');
            temp[i] = temp2[0];
            temp3[i] = temp2[1];
        }
        let newSet = new Set(temp);
        for (let i = 0; i < temp3.length; i++) {temp3[i] = Number(temp3[i])}
        let tdLength = Math.max.apply(null, temp3);
        temp = Array.from(newSet); temp.sort()
        for (let i = 0; i < temp.length; i++)
        {
            SpreadSheetBody.insertRow(i);
        }
        for (let i = 0; i < trs.length; i++)
        {
            for(let j = 0; j <= tdLength; j++)
            {
                let td = "<td></td>"
                trs[i].innerHTML = td.repeat(tdLength + 1)
            }
        }
    }
}

TableRecoveryAfterUpdate();


if (localStorage.length === 0)
{
    for (let i = 0; i < trs.length; i++)
    {
        let tds = trs[i].getElementsByTagName('td')
        for (let j = 0; j < tds.length; j++)
        {
            localStorage.setItem(i.toString() + ' ' + j.toString(),'')
        }
    }
}

for (let i = 0; i < localStorage.length; i++)
{
    let test = localStorage.key(i);
    let temp = test.split(' ');
    if (temp[0] > trs.length - 1)
    {
        let tds = trs[0].getElementsByTagName('td');
        let temp = document.createElement("tr");
        SpreadSheetBody.appendChild(temp);
        for (let i = 0; i < tds.length; i++)
        {
            let elem = document.createElement("td")
            temp.appendChild(elem)
        }
    }
}

for(let i = 0; i < localStorage.length; i++)
{
    let test = localStorage.key(i);
    let temp = test.split(' ');
    for (let j = 0; j < trs.length; j++)
    {
        if(Number(temp[0]) === j)
        {
            let tds = trs[j].getElementsByTagName('td');
            tds[Number(temp[1])].innerHTML = localStorage.getItem(test);
        }

    }
}

for (let i = 0; i < trs.length; i++)
{
    let tds = trs[i].getElementsByTagName('td')
    {
        for (let j = 0; j < tds.length; j++)
        {
            if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i
                .test(navigator.userAgent)) {
                tds[j].addEventListener('click', function f () {
                    let input = document.createElement('input');
                    input.placeholder = '12345';
                    input.value = this.innerHTML;
                    this.innerHTML = '';
                    this.appendChild(input);
                    let td = this;
                    input.addEventListener('blur', function() {
                        td.innerHTML = this.value;
                        td.addEventListener('click', f)
                    })
                    this.removeEventListener('click', f);
                })
            }
            else
            {
                tds[j].addEventListener('dblclick', function f() {
                    let input = document.createElement('input');
                    input.value = this.innerHTML;
                    this.innerHTML = '';
                    this.appendChild(input);
                    let td = this;
                    input.addEventListener('blur', function() {
                        td.innerHTML = this.value;
                        localStorage.setItem(i.toString() + ' ' + j.toString(), this.value);
                        td.addEventListener('dblclick', f)
                    })
                    this.removeEventListener('dblclick', f);
                })
            }
        }
    }
}

Row_Add.addEventListener('click', function f() {
    let tds = trs[0].getElementsByTagName('td');
    let temp = document.createElement("tr");
    SpreadSheetBody.appendChild(temp);
    for (let i = 0; i < tds.length; i++)
    {
        let elem = document.createElement("td");
        temp.appendChild(elem);
    }
    for (let i = trs.length - 1; i < trs.length; i++)
    {
        let tds = trs[i].getElementsByTagName('td')
        for (let j = 0; j < tds.length; j++)
        {
            localStorage.setItem(i.toString() + ' ' + j.toString(),'')
        }
    }
    for (let i = trs.length - 1; i < trs.length; i++)
    {
        let tds = trs[i].getElementsByTagName('td')
        {
            for (let j = 0; j < tds.length; j++)
            {
                if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i
                    .test(navigator.userAgent)) {
                    tds[j].addEventListener('click', function f () {
                        let input = document.createElement('input');
                        input.placeholder = '12345';
                        input.value = this.innerHTML;
                        this.innerHTML = '';
                        this.appendChild(input);
                        let td = this;
                        input.addEventListener('blur', function() {
                            td.innerHTML = this.value;
                            td.addEventListener('click', f)
                        })
                        this.removeEventListener('click', f);
                    })
                }
                else
                {
                    tds[j].addEventListener('dblclick', function f() {
                        let input = document.createElement('input');
                        input.value = this.innerHTML;
                        this.innerHTML = '';
                        this.appendChild(input);
                        let td = this;
                        input.addEventListener('blur', function() {
                            td.innerHTML = this.value;
                            localStorage.setItem(i.toString() + ' ' + j.toString(), this.value);
                            td.addEventListener('dblclick', f)
                        })
                        this.removeEventListener('dblclick', f);
                    })
                }
            }
        }
    }
})

Row_Remove.addEventListener('click', () => {
    let t = trs[trs.length - 1];
    for (let i = 0; i < localStorage.length; i++)
    {
        let test = localStorage.key(i);
        let temp = test.split(' ');
        if (Number(temp[0]) === trs.length - 1)
        {
            if ((trs.length - 1) === 0) {}
            else
            {
                localStorage.removeItem(test);
            }
        }
    }
    for (let i = 0; i < localStorage.length; i++)
    {
        let test = localStorage.key(i);
        let temp = test.split(' ');
        if (Number(temp[0]) === trs.length - 1)
        {
            if ((trs.length - 1) === 0)
            {
                alert("Запрещено удалять последнюю строку!")
            }
            else
            {
                localStorage.removeItem(test);
            }
        }
    }
    if(trs.length - 1 !== 0)
    {
        SpreadSheetBody.removeChild(t);
    }
    else {}
})

Column_Add.addEventListener('click', () =>
{
    for (let i = 0; i < trs.length; i++)
    {
        let td = document.createElement('td')
        trs[i].appendChild(td);
    }
    for (let i = 0; i < trs.length; i++)
    {
        let tds = trs[i].getElementsByTagName('td')
        for (let j = tds.length - 1; j < tds.length; j++)
        {
            localStorage.setItem(i.toString() + ' ' + j.toString(),'')
        }
    }
    for (let i = 0; i < trs.length; i++)
    {
        let tds = trs[i].getElementsByTagName('td')
        {
            for (let j = tds.length - 1; j < tds.length; j++)
            {
                if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i
                    .test(navigator.userAgent)) {
                    tds[j].addEventListener('click', function f () {
                        let input = document.createElement('input');
                        input.placeholder = '12345';
                        input.value = this.innerHTML;
                        this.innerHTML = '';
                        this.appendChild(input);
                        let td = this;
                        input.addEventListener('blur', function() {
                            td.innerHTML = this.value;
                            td.addEventListener('click', f)
                        })
                        this.removeEventListener('click', f);
                    })
                }
                else
                {
                    tds[j].addEventListener('dblclick', function f() {
                        let input = document.createElement('input');
                        input.value = this.innerHTML;
                        this.innerHTML = '';
                        this.appendChild(input);
                        let td = this;
                        input.addEventListener('blur', function() {
                            td.innerHTML = this.value;
                            localStorage.setItem(i.toString() + ' ' + j.toString(), this.value);
                            td.addEventListener('dblclick', f)
                        })
                        this.removeEventListener('dblclick', f);
                    })
                }
            }
        }
    }
})

const Column_Remover = () =>
{
    Column_Remove.addEventListener('click', () =>{
        for (let i = 0; i < localStorage.length; i++)
        {
            let test = localStorage.key(i);
            let temp = test.split(' ');
            for (let j = 0; j < trs.length; j++)
            {
                let tds = trs[j].getElementsByTagName('td')
                for (let k = tds.length - 1; k < tds.length; k++)
                {
                    if (Number(temp[1]) === tds.length - 1)
                    {
                        if (k === 0)
                        {
                            check = true;
                        }
                        else
                        {
                            localStorage.removeItem(test)
                        }
                    }
                }
            }
        }
        for (let i = localStorage.length - 1; i >= 0; i--)
        {
            let test = localStorage.key(i);
            let temp = test.split(' ');
            for (let j = 0; j < trs.length; j++)
            {
                let tds = trs[j].getElementsByTagName('td');
                for (let k = tds.length - 1; k < tds.length; k++)
                {
                    if (Number(temp[1]) === tds.length - 1)
                    {
                        if (k === 0) {}
                        else
                        {
                            localStorage.removeItem(test)
                        }
                    }
                }
            }
        }
        for (let i = 0; i < trs.length; i++)
        {
            let check = false;
            let tds = trs[i].getElementsByTagName('td')
            for (let j = tds.length - 1; j < tds.length; j++)
            {
                if (j === 0)
                {
                    check = true;
                    break;
                }
                else
                {
                    tds[j].remove()
                }
            }
        }
        if (check){alert("Запрещено удалять последний столбец!")}
    })
}
Column_Remover()