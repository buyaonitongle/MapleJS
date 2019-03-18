//条形图
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

    canvas_port.strokeRect(5,32,13,60);
    canvas_port.fillRect(18,40,26,60);

    canvas_port.strokeRect(36,20,44,60);
    canvas_port.fillRect(49,10,57,60);

    canvas_port.strokeRect(67,10,75,60);
    canvas_port.fillRect(80,40,88,60);


    canvas_port.stroke();
    canvas_port.closePath();
}
show();
print("js execute done");