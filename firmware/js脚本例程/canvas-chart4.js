//神经网络
var tim=require("timer");
canvas = require("canvas");
cfg = {screen_type:2,orientation:1};
canvas_port = canvas.open(cfg);
function show()
{
    canvas_port.clear()
    canvas_port.beginPath();
    canvas_port.lineWidth = 1;
    canvas_port.arc(30, 20, 10, 0, 360, 0);
    canvas_port.fillCircle(80, 20, 8);
    canvas_port.arc(60, 50, 10, 10, 360, 0);
    canvas_port.moveto(40,20);
    canvas_port.lineto(72,20);

    canvas_port.moveto(77,26);
    canvas_port.lineto(65,43);

    canvas_port.stroke();
    canvas_port.closePath();
}
show();
print("js execute done");