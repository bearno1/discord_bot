const Discord = require('discord.js');
const client = new Discord.Client();

const prefix = '\\';

client.login('NzI0NDc1MDgyOTU2NzM0NTA0.XvAt_w._P8PwIfMJnqcQj64NHF0_Ih0foY');

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  let mes = message.content.substring(prefix.length).spilt(" ");
  switch(mes[0]) {
    case 'play': 
      message.channel.send("ok");
      break;
  }
  return;
});
