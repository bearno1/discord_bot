const Discord = require('discord.js'); 
const cilent = new Discord.Client();

cilent.once('ready',() => {console.log('Blueberry now online');});

cilent.login(process.env.token);
