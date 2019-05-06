var uart = require('uart');
var config={uartNumber:1, baudRate:9600, dataBits:8, stopBits:1}; 
var port=uart.open(config);
var switch_status =0;
/*
* 该demo模拟wifi模组与电控MCU之间是用uart通信，其通信协议的帧格式举例如下：
* head + cmd + length + payload + tail
* head: 两个字节，默认为0xFE 0xA5
* cmd：一个字节，例如0x01是开关命令
* length： 一个字节，描述payload字段的长度
* payload： n个字节，适用于cmd的数据
* tail：两个字节，默认为0xFF 0xEE
*/
function uart_send(cmd,payload)
{
    var packet = new Buffer(7);
    packet.writeUInt8(0xFE, 0);
    packet.writeUInt8(0xA5, 1);
    packet.writeUInt8(cmd, 2);
    packet.writeUInt8(0x01, 3);
    packet.writeUInt8(payload, 4);
    packet.writeUInt8(0xFF, 5);
    packet.writeUInt8(0xEE, 6);
    port.write(packet);
}
// 监听串口接收数据，在接收到相应数据后，触发回调函数
port.on(uart.DATA, 7, function(data) {
    print('receive from uart:', data);
    var cmd = data.readUInt8(2);
    var payload = data.readUInt8(4);
    if (cmd == 0x01) // 开关命令
    {
        switch_status = payload;
        uart_send(cmd, payload);// 返回开关状态
    }
});
uart_send(0x01,switch_status);
print("js execute done!");
