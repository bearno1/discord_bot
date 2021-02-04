var prefixEmbed = new Discord.MessageEmbed()
    .setColor('#0099ff');
    
function setPrefix(newPrefix) {
    prefixEmbed.setDescription("This channal's prefix is "+newPrefix);
    return;
}