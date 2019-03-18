var dht=require("dht11");
var tim=require("timer");
canvas = require("canvas");
cfg = {screen_type:2,orientation:1};
canvas_port = canvas.open(cfg);
function oprint(temp,humi)
{
    canvas_port.clear()
    canvas_port.beginPath();
    canvas_port.lineWidth = 2;
    canvas_port.strokeRect(0,0,126,62);
    canvas_port.fillText(8, 16, "github:MapleJS", "0816");
    canvas_port.fillText(24, 32, temp+" C "+humi+" %", "0816");
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