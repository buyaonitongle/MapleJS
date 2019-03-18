var pwm = require('pwm');
var tim = require("timer");
canvas = require("canvas");
var config={pin:0, period:20,duty:0.5};//done 0 14
var pin=pwm.open(config);
cfg = {screen_type:2,orientation:1};
canvas_port = canvas.open(cfg);
//        低7  1   2   3   4   5   6   7  高1 高2 高3 高4 高5 不发音
var tone =[247,262,294,330,349,392,440,494,523,578,659,698,784,1000];//音符
var tperiod =[4048,3816,3401,3030,2865,2551,2272,2024,1912,1730,1517,1432,1275,1000];//us
var music =[8,6,6,6,6,6,
            6,6,6,5,6,7,
            8,6,6,6,6,6,
            5,6,6,10,9,8,9,
            8,6,6,6,6,6,
            6,6,6,5,6,7,
            8,6,6,6,6,6,
            5,6,6,10,9,8,6];
var time =[2,1,1,2,1,1,
        2,2,1,1,1,1,
        2,1,1,2,1,1,
        1,1,2,1,1,1,1,
        2,1,1,2,1,1,
        2,2,1,1,1,1,
        2,1,1,2,1,1,
        1,1,2,1,1,1,1];
print(tone.length);
print(music.length);
print(time.length);
function sing(data)
{
    var i = music[data];//音符
    var p = tperiod[i];//音符周期
    pin.set_period(p);
    tim.setDelay(time[data]*200);//音符时延
}
function sing98k(vol)
{
    var max = music.length;
    var i=0;
    pin.set_duty(vol);//音量0~1，0.01,0.2,0.5
    for(i=0;i < max;i++)
    {
        sing(i);
    }
    pin.set_duty(0);//mute
}
function oled_show()
{
    canvas_port.clear()
    canvas_port.beginPath();
    canvas_port.lineWidth = 2;
    canvas_port.strokeRect(0,0,126,62);
    canvas_port.fillText(24, 16, "[PLAY]:98K", "0816");
    canvas_port.stroke();
    canvas_port.closePath();
}
oled_show();
print("first");
sing98k(0.01);
//tim.setInterval(function(){
    print("second");
    sing98k(0.3);
//},15000);

print("js execute done!");