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
    let arg = msg.content.substring(prefix.length).split(" ");

    if(!msg.content.startsWith(prefix))return;
    if(arg[2]=='error'){
      msg.reply('Notename is incorrect.');
      return;
    }

    var arg_size = arg.length;
    var note_size = note.length;
    var isnote = 'false';
    var i,j,rr=1;
    var note_print;
    var isprint = 'false';
    var isnoteprint = 'false';
    switch(arg[1]){
        case 'test':
          msg.channel.send('Hi! I am Bot.');
          break;
        case '!newnote':
          isprint = 'true';
          isnote = 'true';
          note_print = "new note "+arg[2];
          note.push(arg[2]);
          collect.push(new Array());
          break;
        case '!printnote':
          isprint = 'true';
          isnoteprint = 'true';
          note_print = arg[2]+':'+'\n';
          for(i=0;i<note_size;i++){
            if(note[i]==arg[2]){
              isnote = 'true';
              var collect_size = collect[i].length;
              for(j=0;j<collect_size;j++){
                note_print += (j+1);
                note_print += '.';
                note_print += collect[i][j];
                note_print += '\n';
              }
            }
          }
          break;
        case '!addnote':
          isprint = 'true';
          note_print = 'add '+arg[2]+':';
          for(i=0;i<note_size;i++){
            if(note[i]==arg[2]){
              isnote = 'true';
              for(j=3;j<arg_size;j++){
                if(j!=3)note_print += ',';
                note_print += arg[j];
                collect[i].push(arg[j]);
              }
            }
          }
          break;
        case '!removenote':
          isprint = 'true';
          note_print = 'remove '+arg[2];
          for(i=0;i<note_size;i++){
            if(note[i]==arg[2]){
              note[i]='error';
              isnote = 'true';
            }
          }
          break;
        case '!list':
          isnote = 'true';
          isprint = 'true';
          note_print = 'list:\n';
          for(i=0;i<note_size;i++){
            if(note[i]!='error'){
              note_print += rr;
              rr++;
              note_print += '.'+note[i]+'\n';
            }
          }
          break;
        default:
          msg.channel.send('I can\'t understand you');
          break;
    }
    if(isnoteprint == 'true'){
      if(isnote == 'true')msg.channel.send(note_print);
      else msg.reply('note not found');
    }
    else if(isprint == 'true'){
      if(isnote == 'true')msg.reply(note_print);
      else msg.reply('note not found');
    }
});
