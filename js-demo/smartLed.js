var led = require("smartLed");
var cfg = {connection: led.CC, period:1000, rPin:5, gPin:12, bPin:0, cwPin:23, wwPin:22};
var rgb = led.open(cfg);

rgb.switchOn();
start();

function start() {
  flashing();
}

//2s完成一次闪烁，持续10s
function flashing() {
rgb.colorSet(0xFF0000);
  rgb.on(led.TIMER, 1000, 100000, function(count){
    if (count % 2 == 0){
        rgb.brightSet(0);
    }
    else{
        rgb.brightSet(255);
    }
    if (count == 10000 / 1000) {
      breath();
    }
  });
}

//20ms刷新一次呼吸灯亮度，最亮到下次最亮的周期为1s, 保持一直呼吸
function breath() {
  rgb.colorSet(0xFF0000);
  rgb.on(led.TIMER, 20, 10000, function(count){
    var data = count % 100; // 呼吸周期为1s，20ms刷新一次，那么50次为一个周期[0, 99]
    var right = data > 50 ? data - 50 : 50 - data; // 亮度为 (|x - 25|) / 25 
    rgb.brightSet(right / 50 * 255);
    if (count == 10000 / 20) {
      change1();
    }
  });
}

//20ms刷新一次颜色，直到颜色从红色渐变到绿色
function change1() {
  rgb.brightSet(255);
  rgb.on(led.TIMER, 20, 20 * 255, function(count){
    origin  = 0xFF0000;
    var curRGB =  origin - (count << 16) + (count << 8);
    rgb.colorSet(curRGB);
    if (count == 255) {
      change2();
    }

  });
}
//20ms刷新一次颜色，直到颜色从绿色渐变到蓝色
function change2() {
  rgb.on(led.TIMER, 20, 20 * 255, function(count){
    origin  = 0x00FF00;
    var curRGB =  origin - (count << 8) + count;
    rgb.colorSet(curRGB);
    if (count == 255) {
      change3();
    }
  });
}
//20ms刷新一次颜色，直到颜色从蓝色渐变到红
function change3() {
  rgb.on(led.TIMER, 20, 20 * 255, function(count){
    origin  = 0x0000FF;
    var curRGB =  origin + (count << 16) - count;
    rgb.colorSet(curRGB);
    if (count == 255) {
      start();
    }
  });
}
print("js execute done!");
