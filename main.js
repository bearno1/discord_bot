const Discord = require('discord.js'); 
const client = new Discord.Client();
const prefix = "#bb";
var note = new Array();
var collect = new Array();

client.once('ready',() => {
    console.log('Blueberry now online');
    client.channels.cache.get('724600369505632379').send('Hi! I am Blueberry.\nVersion:1.0.1(beta test)\nto Command ME\n#bb !newnote <notename> เพิ่ม note ใหม่\n#bb !addnote <notename> <notemassage> เพิ่มข้อความใน note\n#bb !removenote <notename> ลบ note นั้นออก\n#bb !printnote <notename> พิมพ์ข้อความใน note นั้น\nNEW fuction!!!\n#bb !list พิมพ์ชื่อ note ทั้งหมด');
});

client.login(process.env.token);

client.on('message', msg => { 
    let arg = msg.content.substring(prefix.length).split('\n');
    if(!msg.content.startsWith(prefix))return;
    
});
