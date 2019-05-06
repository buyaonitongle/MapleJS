var canvas = require("canvas");
var cfg = {screenType:"tft",orientation:2};
var tft = canvas.open(cfg);

tft.beginPath();

//绘制黑色背景
tft.lineWidth = 1;
tft.strokeStyle=0x000000;
tft.fillRect(0,0,479,319);
//绘制刻度线
tft.strokeStyle=0xEEEEFF;
tft.lineWidth = 3;
for(var i = 390; i >= 135; i-=15) {
  var ang = i>=360?i-360:i;
  tft.arc(190,188,181,ang,ang+15,0);//绘制一个刻度的圆弧
  tft.lineto(190,188);//连接至圆心，绘制刻度线
}
//补充剩余一条刻度线
tft.moveto(318,318);
tft.lineto(190,188);
//擦除一个同心圆，留出边缘刻度线
tft.strokeStyle=0x000000;
tft.lineWidth = 1;
tft.fillCircle(190,188,130);
//绘制刻度值
tft.strokeStyle=0xEEEEFF;
tft.fillText(100,270,"0","0816");
tft.fillText(78,240,"10","0816");
tft.fillText(65,210,"20","0816");
tft.fillText(62,179,"30","0816");
tft.fillText(68,150,"40","0816");
tft.fillText(79,122,"50","0816");
tft.fillText(97,95,"60","0816");
tft.fillText(124,74,"70","0816");
tft.fillText(155,65,"80","0816");
tft.fillText(181,60,"90","0816");
tft.fillText(207,65,"100","0816");
tft.fillText(239,76,"110","0816");
tft.fillText(260,97,"120","0816");
tft.fillText(279,122,"130","0816");
tft.fillText(290,150,"140","0816");
tft.fillText(294,180,"150","0816");
tft.fillText(289,208,"160","0816");
tft.fillText(277,240,"170","0816");
tft.fillText(255,270,"180","0816");
//绘制速度单位
tft.fillText(173,125,"KM/h","0816");
//绘制仪表盘框底
tft.lineWidth = 3;
tft.moveto(63,318);
tft.lineto(315,318);
//绘制里程框
tft.strokeStyle=0xEEEEFF;
tft.lineWidth = 1;
tft.fillRect(145,280,235,300);
//写入里程
tft.strokeStyle=0x000000;
tft.fillText(160,283,"12345KM","0816");
//绘制指针盘
tft.strokeStyle=0xAA0000;
tft.lineWidth = 2;
tft.fillCircle(190,188,10);
tft.moveto(190,188);
tft.lineto(60,290);
tft.closePath();

print("JS execute done!");
