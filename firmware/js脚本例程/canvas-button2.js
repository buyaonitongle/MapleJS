//音乐暂停、开始、快进、快退
var tim=require("timer");
canvas = require("canvas");
cfg = {screen_type:2,orientation:1};
canvas_port = canvas.open(cfg);
function show(flag)
{
    canvas_port.clear()
    canvas_port.beginPath();
    canvas_port.lineWidth = 1;
    canvas_port.arc(15, 42, 12, 0, 360, 0);//first cirecle
    canvas_port.moveto(11,38);
    canvas_port.lineto(11,46);
    canvas_port.fillTriangle(11,42,15,38,15,46);
    canvas_port.fillTriangle(15,42,19,38,19,46);
    canvas_port.lineWidth = 2;
    canvas_port.arc(45, 42, 12, 0, 360, 0);//second cirecle
    canvas_port.lineWidth = 1;
    canvas_port.fillTriangle(53,42,42,38,42,46);
    canvas_port.arc(75, 42, 12, 0, 360, 0);//third cirecle
    canvas_port.fillRect(71,38,79,46);
    canvas_port.arc(105, 42, 12, 0, 360, 0);//forth cirecle
    canvas_port.moveto(109,38);
    canvas_port.lineto(109,46);
    canvas_port.fillTriangle(109,42,105,38,105,46);
    canvas_port.fillTriangle(105,42,101,38,101,46);
    canvas_port.fillText(0, 0, "HTML5 Canvas", "0816");
    canvas_port.stroke();
    canvas_port.closePath();
}
show();
print("js execute done");