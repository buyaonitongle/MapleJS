var tim=require("timer");
var canvas = require("canvas");
var dht=require("dht11");
cfg = {screen_type:2,orientation:1};
canvas_port = canvas.open(cfg);
var prevalue = 35;
var times=0;
function show(value)
{
    if(times > 11)
    {
        canvas_port.clear();
        times=0;
    }
    value = value%10 +value%100;
    value = value/2

    canvas_port.beginPath();
    canvas_port.lineWidth = 1;
    
    canvas_port.moveto(0,0);
    canvas_port.lineto(0,60);
    

    canvas_port.moveto(0,60);
    canvas_port.lineto(120,60);
    canvas_port.fillTriangle(112,56,112,64,120,60);

    canvas_port.moveto(times*10,60-prevalue);
    canvas_port.lineto(times*10+10,60-value);
    
    canvas_port.stroke();
    canvas_port.closePath();
    prevalue = value;
    times++;
}
dht.init(5);
tim.setInterval(function(){
    var obj =dht.getTempHumi();
    print("temp: "+obj.temp+" C");
    print("humi: "+obj.humidity+" %");
    show(obj.humidity);
},3000)
print("js execute done");