const Discord = require("discord.js");
const ms = require("ms");

module.exports.run = async (bot, message, args) => {

  //#cmute @user 1s/m/h/d
  let role1 = "✽ Discord Staff";
  let gRole1 = message.guild.roles.find(`name`, role1);
  let role2 = "Chat-Muter";
  let gRole2 = message.guild.roles.find(`name`, role2);
  let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
          if(!message.member.roles.has(gRole2.id)) return message.channel.send("You can't do this command.");
  if(!tomute) return
  let Rich = new Discord.RichEmbed()
  .setImage('https://f.top4top.net/p_951lu9dk1.png')
  send(Rich)

  if(tomute.roles.has(gRole1.id)) return message.channel.send("Can't mute that player!");
  let muterole = message.guild.roles.find(`name`, "Chat-Muted");
  //start of create role
  if(!muterole){
    try{
      muterole = await message.guild.createRole({
        name: "Chat-Muted",
        color: "#000000",
        permissions:[]
      })
      message.guild.channels.forEach(async (channel, id) => {
        await channel.overwritePermissions(muterole, {
          SEND_MESSAGES: false,
          ADD_REACTIONS: false
        });
      });
    }catch(e){
      console.log(e.stack);
    }
  }
  //end of create role
  let mutetime = args[1];
  let reason = args.slice(2).join(" ");
  if(!mutetime) return message.channel.send("Usage: #cmute [User] [Time] [Reason].");
  if(!reason) return message.channel.send("Usage: #cmute [User] [Time] [Reason].");
  if(tomute.roles.has(muterole.id)) return message.channel.send("That person is already muted.");
  await(tomute.addRole(muterole.id));
  let mutedEmbed = new Discord.RichEmbed()
.setDescription("» New Chat-Muted User «")
.setColor("#bc0000")
.addField("Muted User", `${tomute} with ID ${tomute.id}`)
.addField("Muted By", `<@${message.member.id}> with ID ${message.member.id}`)
.addField("Muted In", message.channel)
.addField("Reason", `${reason}`)
.addField("Time", `${ms(ms(mutetime))}`)
let incidentchannel = message.guild.channels.find(`name`, "log");
if(!incidentchannel) return message.channel.send("Can't find log channel.");
    message.delete().catch(O_o=>{});
incidentchannel.send(mutedEmbed);

  setTimeout(function(){
      if(tomute.roles.has(muterole.id)){
    tomute.removeRole(muterole.id);
    let unMutedEmbed = new Discord.RichEmbed()
  .setDescription("» New Chat-UnMuted User «")
  .setColor("#bc0000")
  .addField("UnMuted User", `${tomute} with ID ${tomute.id}`)
  .addField("Muted By", `<@${message.member.id}> with ID ${message.member.id}`)
  .addField("Muted In", message.channel)
    incidentchannel.send(unMutedEmbed);
  }
  }, ms(mutetime));


//end of module
}

module.exports.help = {
  name: "mute"
}
