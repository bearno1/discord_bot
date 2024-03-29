const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');
let fortune = require('./fortune.json');


var prefix = '=';
var prefixEmbed = new Discord.MessageEmbed()
    .setColor('#4f86f7')
    .setDescription("This channal's prefix is =.");
function setPrefix(newPrefix) {
    prefix = newPrefix;
    prefixEmbed.setDescription("This channal's prefix is "+prefix+".");
    return;
}

var mainChannel = 0;
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
    .setDescription("Sorry, I'm afraid I don't follow you.");

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
  helpEmbed.setDescription(prefix+"fortune : fortune-telling\n"+
                           prefix+"playXO : play XO with your friend\n"+
                           prefix+"XOwithAI : play XO with Creamii\n");
  return;
}

var timeEmbed = new Discord.MessageEmbed()
    .setColor('#C7B5E3')
function setTime(msg) {
  timeEmbed.setDescription(String((msg.createdAt.getHours()+7)%24)+" : "+String(msg.createdAt.getMinutes()));
  return;
}

var id;
var luckyEmbed = new Discord.MessageEmbed()
    .setColor('#fff44f')
function luckyCal(msg) {
  id = msg.member.id;
  if(!fortune[id]) {
    fortune[id] = {
      LastFortuneTime: msg.createdAt.getDate(),
      FortuneLV: Math.floor(Math.random() * 11)
    };
  }
  if(fortune[id].LastFortuneTime != msg.createdAt.getDate()) {
    fortune[id].LastFortuneTime = msg.createdAt.getDate();
    fortune[id].FortuneLV = Math.floor(Math.random() * 11); 
  }
  luckyEmbed
    .setDescription("Fortune Level : "+String(fortune[id].FortuneLV))
    .setTitle("Your Fortune "+msg.member.displayName);
  if(fortune[id].FortuneLV<3) {
    luckyEmbed.setImage('https://i0.wp.com/ideasfornames.com/wp-content/uploads/2019/08/Depositphotos_61818125_s-2019.jpg');
  }
  else if(fortune[id].FortuneLV<7) {
    luckyEmbed.setImage('https://i.pinimg.com/originals/d1/c4/6a/d1c46aa2d4a523998e140243e6985ae2.png');
  }
  else {
    luckyEmbed.setImage('https://stickershop.line-scdn.net/stickershop/v1/product/1019505/LINEStorePC/main.png');
  }
  fs.writeFile('./fortune.json',JSON.stringify(fortune),(err)=>{
    if(err)console.log(err);
  });
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
  .setDescription("Please choose number from 1-9 !");
var chooseerror2Embed = new Discord.MessageEmbed()
  .setColor('#FF6347')
  .setDescription("Please choose number from 1-9 !!");
var chooseerror3Embed = new Discord.MessageEmbed()
  .setColor('#FF6347')
 .setDescription("Please choose other number from 1-9");   
function setPlayXO() {
  playXOEmbed.setDescription("Command "+prefix+"C number: choosing number to play\n"+"123\n"+"456\n"+"789");
  XOtable = [["1","2","3"],["4","5","6"],["7","8","9"]];
  XOturn = 0;
  return;
}
function setTable(chPos,msg,isAI) {
  chPos--;
  XOturn++;
  var iswin = false;
  if(XOtable[NTab[chPos][0]][NTab[chPos][1]]=="X" || XOtable[NTab[chPos][0]][NTab[chPos][1]]=="O") {
    XOturn--;
    return [false,false];
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
  if(iswin&&(!isAI)) {
    for(var i = 0; i < 3; i++) {
      for(var j = 0 ;j < 3;j++){
        if(XOtable[i][j] == "X")XOtable[i][j] = "O";
        else if(XOtable[i][j] == "O")XOtable[i][j] = "X";
      }
    }
    isAI = true;
  }
  var NowTable = "";
  for(var i=0; i < 3; i++) {
    NowTable += XOtable[i][0] + XOtable[i][1] + XOtable[i][2] + "\n";
  }
  if(iswin) {
    if(isAI) {
      playXOEmbed.setDescription(NowTable)
                 .setTitle("Creamii is a winner!!!\n");
      XOtable = [["1","2","3"],["4","5","6"],["7","8","9"]];
      return [true,true];
    }
    else {
      playXOEmbed.setDescription(NowTable)
                 .setTitle(msg.member.displayName+" is a winner!!!\n");
      XOtable = [["1","2","3"],["4","5","6"],["7","8","9"]];
      return [true,true];
    }
  }
  else {
    playXOEmbed.setDescription(NowTable)
               .setTitle("Turn : "+XOturn);
    if(XOturn>=9) {
      playXOEmbed.setDescription(NowTable)
                 .setTitle("Draw !!!");
      XOtable = [["1","2","3"],["4","5","6"],["7","8","9"]];
      return [true,true];
    }
  }
  return [true,false];
}
var AIchoose = [5,1,7,3,4,6,2,8,9];
var playXOAIEmbed = new Discord.MessageEmbed()
  .setColor('#4f86f7')
function setPlayXOAI() {
  playXOAIEmbed.setDescription("Command "+prefix+"CC number: choosing number to play\n"+"123\n"+"456\n"+"789");
  XOtable = [["1","2","3"],["4","5","6"],["7","8","9"]];
  XOturn = 0;
  return;
}

client.login(TOKEN);

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  if(msg.member.user.bot)return;
  if(msg.content[0] != prefix)return;
  if(mainChannel == 0)mainChannel = msg.channel;
  let mes = msg.content.substring(prefix.length).split(" ");
  switch(mes[0]) {
    case "prefix":
      if(mes[1]) {
        setPrefix(mes[1]);
      }
      msg.channel.send(prefixEmbed);
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
    case "fortune":
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
          var correctchoose = setTable(choosenumber,msg,false);
          if(correctchoose[0]) {
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
    case "XOwithAI":
      setPlayXOAI();
      msg.channel.send(playXOAIEmbed);
      break;
    case "CC":
      if(mes[1]){
        var choosenumber = parseInt(mes[1]);
        if(choosenumber > 9 || choosenumber < 1) {
          msg.channel.send(chooseerror2Embed);
        }
        else{
          var correctchoose = setTable(choosenumber,msg,false);
          if(correctchoose[0]) {
            msg.channel.send(playXOEmbed);
            if(!correctchoose[1]) {
              for(var AIC = 0; AIC < 9; AIC++) {
                var correctchooseforbot = setTable(AIchoose[AIC],msg,true);
                if(correctchooseforbot[0]) {
                  msg.channel.send("=CC "+AIchoose[AIC]);
                  msg.channel.send(playXOEmbed);
                  break;
                }
              }
            }
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
    case "time":
      setTime(msg);
      msg.channel.send(timeEmbed);
      break;
    default:
      msg.channel.send(defaultEmbed);
  }
  return;
});
