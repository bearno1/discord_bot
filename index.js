const Discord = require('discord.js');
const client = new Discord.Client();

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

var talkEmbed = new Discord.MessageEmbed()
    .setColor('#4f86f7');
function sendTalk(messageTalk) {
  mainChannel.send(messageTalk);
  talkEmbed.setDescription("send:"+messageTalk+" Room:"+mainChannel.displayName);
}

client.login('NzI0NDc1MDgyOTU2NzM0NTA0.XvAt_w._P8PwIfMJnqcQj64NHF0_Ih0foY');

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  if(msg.member.displayName == "Blueberry")return;
  if(msg.content[0] != prefix)return;
  let mes = msg.content.substring(prefix.length).split(" ");
  switch(mes[0]) {
    case "prefix":
      if(mes[1]) {
        setPrefix([1]);
        msg.channel.send(prefixEmbed);
      }
      else {
        msg.channel.send(prefixEmbed);
      }
      break;
    case "main":
      mainChannel = msg.channel;
      msg.channel.send(mainEmbed);
      break;
    case "talk":
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
    default:
      msg.channel.send(defaultEmbed);
  }
  return;
});
