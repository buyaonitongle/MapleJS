var tim=require("timer");
canvas = require("canvas");
cfg = {screen_type:2,orientation:1};
canvas_port = canvas.open(cfg);
function show_task(row,task)
{
    canvas_port.beginPath();
    canvas_port.lineWidth = 1;
    canvas_port.arc(10, row+10, 8, 90, 270, 0);
    canvas_port.arc(110, row+10, 8, 270, 360, 0);
    canvas_port.arc(110, row+10, 8, 0, 90, 0);
    canvas_port.moveto(10,row+2);
    canvas_port.lineto(110,row+2);
    canvas_port.moveto(10,row+18);
    canvas_port.lineto(110,row+18);
    canvas_port.fillCircle(10, row+10, 4);
    canvas_port.fillRect(10,row+6,task,row+15);
    canvas_port.strokeRect(task,row+10-12,task+15,row+10+12);
    canvas_port.stroke();
    canvas_port.closePath();
}
function show()
{
    canvas_port.clear();
    show_task(20,70);
}
show();
print("js execute done");