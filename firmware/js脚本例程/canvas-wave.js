//正弦波
var tim=require("timer");
canvas = require("canvas");
cfg = {screen_type:2,orientation:1};
canvas_port = canvas.open(cfg);
function show(x,flag)
{
    canvas_port.clear()
    canvas_port.beginPath();
    canvas_port.lineWidth = 1;
    canvas_port.moveto(0,32);
    canvas_port.lineto(127,32);
    canvas_port.fillTriangle(119,28,119,36,127,32);
    if(flag)
    {
        canvas_port.arc(x+16, 32, 16, 180, 360, 0);
        canvas_port.arc(x+48, 32, 16, 0, 180, 0);
        canvas_port.arc(x+80, 32, 16, 180, 360, 0);
    }
    else
    {
        canvas_port.arc(x+16, 32, 16, 0, 180, 0);
        canvas_port.arc(x+48, 32, 16, 180, 360, 0);
        canvas_port.arc(x+80, 32, 16, 0, 180, 0);
    }
    
    canvas_port.stroke();
    canvas_port.closePath();
}
var wflag=0;
tim.setInterval(function(){
    show(8,wflag);
    if(wflag == 0)
        wflag = 1;
    else
        wflag = 0;
},200);
print("js execute done");