//圆形 矩形
canvas = require("canvas");
cfg = {screen_type:2,orientation:1};
canvas_port = canvas.open(cfg);
canvas_port.beginPath();
canvas_port.lineWidth = 1;
canvas_port.strokeRect(0,0,29,29);
canvas_port.lineWidth = 2;
canvas_port.strokeRect(40,0,69,29);
canvas_port.lineWidth = 4;
canvas_port.strokeRect(80,0,109,29);
canvas_port.lineWidth = 2;
canvas_port.arc(60, 42, 20, 0, 360, 0);
canvas_port.stroke();
canvas_port.closePath();
print("js execute done");