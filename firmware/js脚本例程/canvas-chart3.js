//曲线图
var tim=require("timer");
canvas = require("canvas");
cfg = {screen_type:2,orientation:1};
canvas_port = canvas.open(cfg);
function show()
{
    canvas_port.clear()
    canvas_port.beginPath();
    canvas_port.lineWidth = 1;
    
    canvas_port.moveto(0,0);
    canvas_port.lineto(0,60);
    

    canvas_port.moveto(0,60);
    canvas_port.lineto(120,60);
    canvas_port.fillTriangle(112,56,112,64,120,60);

    canvas_port.fillCircle(0,30,2);
    canvas_port.moveto(0,30);
    canvas_port.lineto(10,35);

    canvas_port.moveto(10,35);
    canvas_port.lineto(20,34);

    canvas_port.moveto(20,34);
    canvas_port.lineto(30,50);
    canvas_port.fillCircle(30,50,2);

    canvas_port.moveto(30,50);
    canvas_port.lineto(40,40);

    canvas_port.moveto(40,40);
    canvas_port.lineto(50,38);

    canvas_port.moveto(50,38);
    canvas_port.lineto(60,36);

    canvas_port.moveto(60,36);
    canvas_port.lineto(70,30);

    canvas_port.moveto(70,30);
    canvas_port.lineto(80,28);

    canvas_port.moveto(80,28);
    canvas_port.lineto(90,20);

    canvas_port.moveto(90,20);
    canvas_port.lineto(100,10);

    canvas_port.moveto(100,10);
    canvas_port.lineto(110,5);
    canvas_port.fillCircle(110,5,2);

    canvas_port.stroke();
    canvas_port.closePath();
}
show();
print("js execute done");