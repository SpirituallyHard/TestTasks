let div = document.createElement('div');
document.body.append(div);
div.style.marginLeft = "3%"
function Square_Width(value)
{
    document.getElementById('Height').value = value;
    div.style.borderWidth = "thin";
    div.style.borderStyle = "solid";
    div.style.borderColor = 'black';
    div.style.width = value+"px";
    div.style.height = value+"px";
}
function Square_Height(value)
{
    document.getElementById('Width').value = value;
    div.style.borderWidth = "thin";
    div.style.borderStyle = "solid";
    div.style.borderColor = 'black';
    div.style.width = value+"px";
    div.style.height = value+"px";
}

function Change_Color()
{
    let color = '#' + Math.floor(Math.random()*16777215).toString(16);
    div.style.backgroundColor = color;
}