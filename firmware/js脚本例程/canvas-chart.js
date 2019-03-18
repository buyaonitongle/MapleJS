//电池图标 仪表刻度
var dht=require("dht11");
var tim=require("timer");
var canvas = require("canvas");
cfg = {screen_type:2,orientation:1};
canvas_port = canvas.open(cfg);
function show_scale(sx,sy,ex,ey)//画仪表刻度
{
    canvas_port.lineWidth = 2;
    canvas_port.moveto(sx,sy);
    canvas_port.lineto(ex,ey);
    canvas_port.lineWidth = 1;
}
function oprint(temp,humi)
{
    canvas_port.clear()
    canvas_port.beginPath();
    canvas_port.lineWidth = 1;
    //电池图标
    canvas_port.strokeRect(17,5,33,10);
    canvas_port.strokeRect(10,10,40,63);
    canvas_port.fillRect(13,61-humi/2,37,61);
    //仪表
    canvas_port.arc(96, 32, 30, 0, 360, 0);
    canvas_port.arc(96, 32, 2, 0, 360, 0);
    show_scale(66,32,68,32);
    show_scale(96,2,96,4);
    show_scale(122,32,124,32);
    canvas_port.lineWidth = 4;
    canvas_port.arc(96, 32, 22, 180, 180+80+humi, 0);
    canvas_port.fillText(96, 40, "%", "0816");
    canvas_port.stroke();
    canvas_port.closePath();
}
dht.init(5);

tim.setInterval(function(){
    var obj =dht.getTempHumi();
    print("温度: "+obj.temp+" C");
    print("湿度: "+obj.humidity+" %");
    oprint(obj.temp,obj.humidity);
},3000)
print("js execute done");