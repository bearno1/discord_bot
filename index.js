const Discord = require('discord.js');
const client = new Discord.Client();

const prefix = '!';
const Myplaylist = ["palette","Celebrity","old town road","ยาพิษ","HONNE - Day 1"];
const CountMyplaylist = 5;
let playlist = 0;

client.login('NzI0NDc1MDgyOTU2NzM0NTA0.XvAt_w._P8PwIfMJnqcQj64NHF0_Ih0foY');

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  if(msg.member.displayName=="Blueberry")return;
  if(msg.member.voice.channel) {
    msg.member.voice.channel.join();
  }
  msg.channel.send("Hi "+msg.member.displayName);
  if(msg.content[0]!=prefix)return;
  let mes = msg.content.substring(prefix.length).split(" ");
  return;
});
