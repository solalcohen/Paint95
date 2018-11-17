var Paint = {};
Paint.color = ['red', 'blue', 'green', 'yellow', 'black','grey'];
Paint.selectedColor = 'black';
Paint.selectedSize = '10';


Paint.Start = function () {
    Paint.generateColor();
    Paint.selectSize();
    Paint.new();
    Paint.Erase();
    Paint.startToDraw();
    Paint.stopToDraw();
    Paint.save();
    Paint.load();
};

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

Paint.Erase = function () {
    var eraser = document.getElementById('gomme');
    eraser.addEventListener('click', function (e) {
        Paint.selectedColor = 'white';
    })
};

Paint.startToDraw = function () {
    var firstClick = document.getElementById("demo");
    firstClick.addEventListener("mousedown", function (e) {
        firstClick.addEventListener("mousemove", Paint.draw);
    });

};

Paint.stopToDraw = function () {
    document.addEventListener("click", function (e) {
        document.getElementById("demo").removeEventListener("mousemove", Paint.draw);

    });
};

Paint.save = function () {
    var saveBtn = document.getElementById("Save");
    saveBtn.addEventListener("click", function (e) {
        var toile = document.getElementById('demo');
        var toileLeft = toile.getBoundingClientRect().left;
        var toileTop = toile.getBoundingClientRect().top;
        var toileObj = {};
        toileObj['draw'] = [];
        var drawMade = toile.getElementsByTagName('div');
        for (var i = 0; i < drawMade.length; i++) {
            var currentDraw = drawMade[i];
            var drawObj = {};
            drawObj['color']=currentDraw.style.backgroundColor;
            drawObj['top'] = currentDraw.getBoundingClientRect().top - toileTop;
            drawObj['left'] = currentDraw.getBoundingClientRect().left - toileLeft;
            drawObj['position']=currentDraw.style.position;
            drawObj['width']=currentDraw.style.width;
            drawObj['height']=currentDraw.style.height;
            drawObj['border']=currentDraw.style.borderRadius;

            toileObj['draw'].push(drawObj);
        }
        localStorage.setItem('toile', JSON.stringify(toileObj));
        alert('Paint Saved succesfully !');
        Paint.show();
    });
   
};

Paint.load = function () {
    var loadBtn = document.getElementById("Load");
    loadBtn.addEventListener("click", function (e) {
        var loadedToile = localStorage.getItem('toile');
        var toileObj = JSON.parse(loadedToile);
        Paint.clear();
        var drawMade = toileObj['draw'];
        for (var i = 0; i < drawMade.length; i++) {
            var currentDraw = drawMade[i];
            var newDiv=document.createElement('div');
            var toile=document.getElementById('demo');
            newDiv.style.top = currentDraw['top'] + 'px';
            newDiv.style.left = currentDraw['left'] + 'px';
            newDiv.style.backgroundColor=currentDraw['color'];
            newDiv.style.position=currentDraw['position'];
            newDiv.style.width=currentDraw['width'];
            newDiv.style.height=currentDraw['height'];
            newDiv.style.borderRadius=currentDraw['border'];
            toile.appendChild(newDiv);
        }alert('Paint loaded succesfully !');
    });
};

Paint.new = function () {
    var newCanvas = document.getElementById('new');
    newCanvas.addEventListener('click', Paint.show);

};


Paint.show = function () {
    document.getElementById('demo').style.display = "block";
    Paint.clear();

}
Paint.clear = function () {
    var toile = document.getElementById('demo');
    var drawMade = toile.getElementsByTagName('div');
    while (drawMade.length > 0) {
        toile.removeChild(drawMade[0]);
    }
};


Paint.Start();




