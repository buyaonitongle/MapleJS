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
    canvas_port.fillCircle(task, row+10, 4);
    canvas_port.fillRect(10,row+6,task,row+15);
    canvas_port.stroke();
    canvas_port.closePath();
}
function show(value)
{
    canvas_port.clear();
    canvas_port.fillText(25, 0, "loading...", "0816");
    canvas_port.fillText(40, 45, value+"%", "0816");
    show_task(20,value);

}
var dval=10;
tim.setInterval(function(){
    if (dval > 100)dval =10;
    show(dval);
    dval+=10;
},2000)
print("js execute done");