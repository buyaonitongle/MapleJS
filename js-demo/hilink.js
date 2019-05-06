var hilink = require('hilink');
var gpio = require('gpio');
var config1 = {
  pin:12,
  dir:gpio.DIR_OUT,
  mode:gpio.PULLUP
};
var relay=gpio.open(config1);
function turn(on) {
  print("switch:"+on);
  relay.write(on);
}
var services = {};
services['switch'] = {
  /*
   * this.data.on
   *     bool    0:关;1:开;
   */
  'data': {
    'on': ''
  },
  'pm': 'GPR',
  'ctrl': function () {
    turn(this.data.on);
  }
};
var init=function () {
  hilink.initParam({'sn':'','prodId':'9004','model':'switch','dev_t':'012','manu':'005','mac':'','hiv':'1.0.0','fwv':'1.0.0','hwv':'1.0.0','swv':'1.0.0','prot_t':1}, 'binarySwitch,switch;', '75CA98E09BB8EEF214CD3DE8D52757A57C1F4D43D49EC9523327137B23B4DF3B318513BFEBF3AEA5230CA3908167732815AB067DFB998DB3DEAAC5690A1AFD7E956C5C0F7E618C624F6757823A9F45AD362D691AC30BC49BAF23321308BCDF18D5A49C71AEF6F0EF2ED3EC4F0AAFD2C47D75940273F1C782265B5369F2E24CEB3F73D2F13088C9128B422DA8A631D8CDC1314589F86901BBC690AEC19DFE04882D82EB379F181AFE87F90FA922768FAB817479CDEC56282FC3C8E8AFCFDBE9F484E10ED95ABE139971F2B71EB0E5AD3F9E32231D1FE05F08FC090EE22683F68DA7282DDE55FE9B2C76FF4DBD8C68039E104895F8477F953770F9CC70A157DBC0', '363A6A5D2265374B75776F5C63272B74BDA4E43897F0A24897671AC3BFF82FC68CA95316C456EAB7C117C1BE974D2F01');
};
init();
hilink.on(hilink.DEVSTAT, function(state){
  if (state == 0) {
    /*TODO disconnect*/
  } else if(state == 1) {
    /*TODO connect*/
  }
  return 0;
});
hilink.on(hilink.GET, function (svc_id, instr) {
  return hilink.getHandler(services, svc_id);
});
hilink.on(hilink.PUT, function (svc_id,payload) {
  hilink.putHandler(services, svc_id, payload);
});
print('js execute done');

