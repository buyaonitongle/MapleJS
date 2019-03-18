var pwm = require('pwm');
var gpio = require('gpio');
var dht =require("dht11");
var tim = require("timer");
canvas = require("canvas");
cfg = {screen_type:2,orientation:1};
canvas_port = canvas.open(cfg);
var config1={
  pin:12,
  dir:gpio.DIR_OUT,
  mode:gpio.PULLUP
};
var config2={pin:0, period:20,duty:0.5};//done 0 14
var beepin=pwm.open(config2);
var relay=gpio.open(config1);
dht.init(5);
var flag = 0;
function beeper(data)
{
    beepin.setPeriod(2730);
    beepin.setDuty(0.5);
    tim.setDelay(100);
    beepin.setDuty(0);
}
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
tim.setInterval(function() {
    if(flag)
    {
        flag=0;
        relay.write(0); 
        beeper();
    }
    else
    {
        flag=1
        relay.write(1);
        beeper();
    }
    print(flag);
    var obj =dht.getTempHumi();
    print("temp: "+obj.temp+" C");
    print("humi: "+obj.humidity+" %");
    oprint(obj.temp,obj.humidity);
  }, 3000);
print("js execute done!");