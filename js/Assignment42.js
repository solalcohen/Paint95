var Paint = {};
Paint.color = ['red', 'blue', 'green', 'yellow', 'black'];
Paint.selectedColor = 'black';
Paint.selectedSize = '10';

Paint.generateColor = function () {
    for (var i = 0; i < Paint.color.length; i++) {
        var buttonItem = document.createElement('li');
        var newButton = document.createElement('button');
        newButton.style.backgroundColor = Paint.color[i];
        newButton.className = "color";
        newButton.id = Paint.color[i];
        buttonItem.appendChild(newButton);
        var menu = document.getElementById("touch_color");
        menu.appendChild(buttonItem);
        newButton.addEventListener('click', function (e) {
            Paint.selectedColor = e.target.id;
        })

    }
}
Paint.selectSize = function () {
    document.getElementById("myRange").addEventListener('input', function () {
        Paint.selectedSize = document.getElementById("myRange").value;
    });
}

Paint.draw = function (event) {
    var newDiv = document.createElement('div');
    newDiv.style.backgroundColor = Paint.selectedColor;
    newDiv.style.width = Paint.selectedSize + 'px';
    newDiv.style.height = Paint.selectedSize + 'px';
    newDiv.style.borderRadius = "50%";
    newDiv.style.position = "absolute";
    newDiv.style.left = event.pageX - this.offsetLeft + "px";
    newDiv.style.top = event.pageY - this.offsetTop + "px";
    var elem = document.getElementById("demo");
    elem.appendChild(newDiv);
}
document.getElementById("demo").addEventListener("mousedown", function (e) {
    document.getElementById("demo").addEventListener("mousemove", Paint.draw);

});

document.addEventListener("click", function (e) {
    document.getElementById("demo").removeEventListener("mousemove", Paint.draw);

});
Paint.generateColor();
Paint.selectSize();


