const Discord = require('discord.js');
const client = new Discord.Client();

const prefix = '!';
const Greetinglist = ["Hi ","Hey ","สวัสดี "," Yo ","你好 ","Good Luck! "];
const Countgreetinglist = Greetinglist.length;
let Ngreetinglist = 0;

client.login('NzI0NDc1MDgyOTU2NzM0NTA0.XvAt_w._P8PwIfMJnqcQj64NHF0_Ih0foY');

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  if(msg.member.displayName=="Blueberry")return;
  msg.channel.send(Greetinglist[Ngreetinglist]+msg.member.displayName);
  Ngreetinglist++;
  if(Ngreetinglist>=Countgreetinglist)Ngreetinglist=0;
  if(msg.content[0]!=prefix)return;
  let mes = msg.content.substring(prefix.length).split(" ");
  return;
});
