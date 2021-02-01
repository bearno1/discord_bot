const Discord = require('discord.js');
const client = new Discord.Client();

const prefix = '!';
var answer=" ";
var room;

client.login('NzI0NDc1MDgyOTU2NzM0NTA0.XvAt_w._P8PwIfMJnqcQj64NHF0_Ih0foY');

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  if(msg.member.displayName=="Blueberry")return;
  if(msg.member.displayName=="inwbearX") {
    room.send(msg.content);
    msg.channel.send("ok");
  }
  else {
    room=msg.channel;
  }
  if(msg.content[0]!=prefix)return;
  let mes = msg.content.substring(prefix.length).split(" ");
  return;
});
