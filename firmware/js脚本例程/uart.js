var pin = require("uart");
var port = pin.open({uartNumber:1});
var buf =new Buffer("hello huawei");
port.write(buf);
print("js execute done");