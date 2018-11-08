var newDiv;
var color='black';
// var btnred=document.getElementById('submit1');
// btnred.style.color='red';
function draw() {
    newDiv = document.createElement('div');
    newDiv.style.backgroundColor = color;
    newDiv.style.height = "5px";
    newDiv.style.width = "5px";
    newDiv.style.borderRadius = "50%";
    newDiv.style.position = "absolute";
    newDiv.style.left = event.pageX + 'px';
    newDiv.style.top = event.pageY + 'px';
    var elem = document.getElementById("demo");
    elem.appendChild(newDiv);
}

document.getElementById("demo").addEventListener("mousedown", function () {
    document.getElementById("demo").addEventListener("mousemove", draw);

});

document.getElementById("demo").addEventListener("click", function () {
    document.getElementById("demo").removeEventListener("mousemove", draw);

});

