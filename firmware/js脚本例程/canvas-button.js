//滑动开关 单选
var tim=require("timer");
canvas = require("canvas");
cfg = {screen_type:2,orientation:1};
canvas_port = canvas.open(cfg);
function show(flag)
{
    canvas_port.clear()
    canvas_port.beginPath();
    canvas_port.lineWidth = 1;
    canvas_port.arc(10, 32, 8, 90, 270, 0);
    canvas_port.arc(26, 32, 8, 270, 360, 0);
    canvas_port.arc(26, 32, 8, 0, 90, 0);
    canvas_port.moveto(10,24);
    canvas_port.lineto(26,24);
    canvas_port.moveto(10,40);
    canvas_port.lineto(26,40);
    if(flag)
    {
        canvas_port.fillCircle(10,32,10);
        canvas_port.fillText(40, 24, "ON", "0816");
        canvas_port.arc(85, 32, 10, 0, 360, 0);
        canvas_port.fillCircle(85, 32, 6);
    }
    else
    {
        canvas_port.fillCircle(26,32,10);
        canvas_port.fillText(40, 24, "OFF", "0816");
        canvas_port.arc(85, 32, 10, 0, 360, 0);
    }
    canvas_port.fillText(0, 0, "HTML5 Canvas", "0816");
    canvas_port.stroke();
    canvas_port.closePath();
}
var wflag=0;
tim.setInterval(function(){
    show(wflag);
    if(wflag)
    {
        wflag = 0;
    }
    else
    {
        wflag = 1;
    }
},2000);
print("js execute done");