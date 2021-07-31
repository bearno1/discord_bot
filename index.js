const Discord = require('discord.js');
const client = new Discord.Client();

var luck = {};
var lastlucky = {};
var id;

var prefix = '=';
var prefixEmbed = new Discord.MessageEmbed()
    .setColor('#4f86f7')
    .setDescription("This channal's prefix is =.");
function setPrefix(newPrefix) {
    prefix = newPrefix;
    prefixEmbed.setDescription("This channal's prefix is "+prefix+".");
    return;
}

var mainChannel;
var mainEmbed = new Discord.MessageEmbed()
    .setColor('#4f86f7')
    .setDescription("This is main channel.");
var errorNoMsgEmbed = new Discord.MessageEmbed()
    .setColor('#FF6347')
    .setDescription("forget message!!!");
var errorNomainChannelEmbed = new Discord.MessageEmbed()
    .setColor('#FF6347')
    .setDescription("You must set main channel!!!");

var defaultEmbed = new Discord.MessageEmbed()
    .setColor('#FF6347')
    .setDescription("ฉันไม่เข้าใจคุณ");

var talkEmbed= new Discord.MessageEmbed()
    .setColor('#4f86f7');
function sendTalk(messageTalk) {
  mainChannel.send(messageTalk);
  talkEmbed.setDescription("Sending: "+messageTalk+" to Room: "+mainChannel.name);
}

var helpEmbed = new Discord.MessageEmbed()
    .setColor('#C7B5E3')
    .setTitle("Command")
function setHelp() {
  helpEmbed.setDescription(prefix+"lucky : ดูดวงของคุณวันนี้\n"+
                           prefix+"playXO : เล่นเกม\n");
  return;
}

var luckyEmbed = new Discord.MessageEmbed()
    .setColor('#fff44f')
function luckyCal(msg) {
  id = msg.member.id;
  if(lastlucky[id] != msg.createdAt.getDate()) {
    lastlucky[id] = msg.createdAt.getDate();
    luck[id] = Math.floor(Math.random() * 11); 
  }
  luckyEmbed
    .setDescription("Lucky Level : "+String(luck[id]))
    .setTitle("ดวงวันนี้ของ "+msg.member.displayName);
  if(luck[id]<3) {
    luckyEmbed.setImage('https://i0.wp.com/ideasfornames.com/wp-content/uploads/2019/08/Depositphotos_61818125_s-2019.jpg');
  }
  else if(luck[id]<7) {
    luckyEmbed.setImage('https://i.pinimg.com/originals/d1/c4/6a/d1c46aa2d4a523998e140243e6985ae2.png');
  }
  else {
    luckyEmbed.setImage('https://stickershop.line-scdn.net/stickershop/v1/product/1019505/LINEStorePC/main.png');
  }
  return;
}

var XOtable = [["1","2","3"],["4","5","6"],["7","8","9"]];
var XOwinCon = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
var NTab = [[0,0],[0,1],[0,2],[1,0],[1,1],[1,2],[2,0],[2,1],[2,2]];
var XOturn = 0;
var playXOEmbed = new Discord.MessageEmbed()
  .setColor('#4f86f7')
var chooseerror1Embed = new Discord.MessageEmbed()
  .setColor('#FF6347')
  .setDescription("Please choose number from 1-9");
var chooseerror2Embed = new Discord.MessageEmbed()
  .setColor('#FF6347')
  .setDescription("Please choose number from 1-9");
var chooseerror3Embed = new Discord.MessageEmbed()
  .setColor('#FF6347')
 .setDescription("Please choose other number from 1-9");   
function setPlayXO() {
  playXOEmbed.setDescription("Command "+prefix+"C เลขช่องที่ต้องการวาง: ใช้ในการเลือกช่องที่ต้องการวาง\n"+"123\n"+"456\n"+"789");
  XOtable = [["1","2","3"],["4","5","6"],["7","8","9"]];
  XOturn = 0;
  return;
}
function setTable(chPos,msg) {
  chPos--;
  XOturn++;
  var iswin = false;
  if(XOtable[NTab[chPos][0]][NTab[chPos][1]]=="X" || XOtable[NTab[chPos][0]][NTab[chPos][1]]=="O") {
    XOturn--;
    return false;
  }
  if(XOturn%2 == 0) {
    XOtable[NTab[chPos][0]][NTab[chPos][1]] = "O";
  }
  else {
    XOtable[NTab[chPos][0]][NTab[chPos][1]] = "X";
  }
  for(var i = 0; i< XOwinCon.length; i++) {
    if(XOtable[NTab[XOwinCon[i][0]][0]][NTab[XOwinCon[i][0]][1]] == XOtable[NTab[XOwinCon[i][1]][0]][NTab[XOwinCon[i][1]][1]] 
    && XOtable[NTab[XOwinCon[i][1]][0]][NTab[XOwinCon[i][1]][1]] == XOtable[NTab[XOwinCon[i][2]][0]][NTab[XOwinCon[i][2]][1]]){
      iswin = true;
    }
  }
  var NowTable = "";
  for(var i=0; i < 3; i++) {
    NowTable += XOtable[i][0] + XOtable[i][1] + XOtable[i][2] + "\n";
  }
  if(iswin) {
    playXOEmbed.setDescription(NowTable)
               .setTitle(msg.member.displayName+" is a winner!!!\n");
    XOtable = [["1","2","3"],["4","5","6"],["7","8","9"]];
  }
  else {
    playXOEmbed.setDescription(NowTable)
               .setTitle("Turn : "+XOturn);
    if(XOturn==9) {
      playXOEmbed.setDescription(NowTable)
                 .setTitle("Draw !!!");
      XOtable = [["1","2","3"],["4","5","6"],["7","8","9"]];
    }
  }
  return true;
}

var colorerrorEmbed = new Discord.MessageEmbed()
  .setColor('#FF6347')
  .setDescription("Please enter color that you want.");

client.login('NzI0NDc1MDgyOTU2NzM0NTA0.XvAt_w._P8PwIfMJnqcQj64NHF0_Ih0foY');

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  if(msg.member.user.bot)return;
  if(msg.content[0] != prefix)return;
  let mes = msg.content.substring(prefix.length).split(" ");
  switch(mes[0]) {
    case "prefix":
      if(mes[1]) {
        setPrefix(mes[1]);
        msg.channel.send(prefixEmbed);
      }
      else {
        msg.channel.send(prefixEmbed);
      }
      break;
    case "main":
      mainChannel = msg.channel;
      //msg.channel.send(mainEmbed);
      break;
    case "talk":
      for(var i = 2; i < mes.length; i++) {
        mes[1] = mes[1] + " " + mes[i];
      }
      if(mainChannel) {
        if(mes[1]) {
          sendTalk(mes[1]);
          msg.channel.send(talkEmbed);
        }
        else {
          msg.channel.send(errorNoMsgEmbed);
        }
      }
      else {
        msg.channel.send(errorNomainChannelEmbed);
      }
      break;
    case "luck":
      luckyCal(msg);
      msg.channel.send(luckyEmbed);
      break;
    case "help":
      setHelp();
      msg.channel.send(helpEmbed);
      break;
    case "playXO":
      setPlayXO();
      msg.channel.send(playXOEmbed);
      break;
    case "C":
      if(mes[1]){
        var choosenumber = parseInt(mes[1]);
        if(choosenumber > 9 || choosenumber < 1) {
          msg.channel.send(chooseerror2Embed);
        }
        else{
          var correctchoose = setTable(choosenumber,msg);
          if(correctchoose) {
            msg.channel.send(playXOEmbed);
          }
          else {
            msg.channel.send(chooseerror3Embed);
          }
        }
      }
      else{
        msg.channel.send(chooseerror1Embed);
      }
      break;
    case "math":
      break;
    default:
      msg.channel.send(defaultEmbed);
  }
  return;
});