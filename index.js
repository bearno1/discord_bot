const Discord = require('discord.js');
const client = new Discord.Client();

var prefix = '=';
var prefixEmbed = new Discord.MessageEmbed()
    .setColor('#0099ff')
    .setDescription("This channal's prefix is =");
function setPrefix(newPrefix) {
    prefix = newPrefix;
    prefixEmbed.setDescription("This channal's prefix is "+prefix);
    return;
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
        setPrefix(mes[1]);
        msg.channel.send(prefixEmbed);
      }
      else {
        msg.channel.send(prefixEmbed);
      }
      break;
    default:
      msg.channel.send("ฉันไม่เข้าใจคุณ");
  }
  return;
});
