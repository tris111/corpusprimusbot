const botconfig = require("./botconfig.json");
const tokenfile = require("./token.json");
const Discord = require("discord.js");


const bot = new Discord.Client({disableEveryone: true});

bot.on("ready",async function() {
  console.log(`${bot.user.username} is online!`);
    bot.user.setActivity("Need help? | ?helpinfo", {type: "LISTENING"});

  //bot.user.setGame("on Fortnite!");
});



bot.on("message", async message =>{
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;

  if (message.author.bot) return undefined;

  let prefix = botconfig.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);
  let msg = message.content.toLowerCase();
    
  if(cmd === `${prefix}report`){

    //?report @ned this is the reason

    let rUser = message.guild.member(message.mentions.users.first().id || message.guild.members.get(args[0]));
      if(!rUser) return message.channel.send("couldn't find user.");
    let rreason = args.join(" ").slice(22);

    let reportembed = new Discord.RichEmbed()
    .setTitle("Report")
    .setColor("#42f4ce")
    .addField("Report User", `${rUser} with id: ${rUser.id}`)
    .addField("Reported by", `${message.author} with id: ${message.author.id}`)
    .addField("Channel Sent on", message.channel)
    .addField("Time Of Message", message.createdAt)
    .addField("Reason", rreason)
    .setFooter("© copyrighted by Zeuzz");


    let reportschannel = message.guild.channels.find(`name`, "reports");
      if(!reportschannel) return message.channel.send("Couldn't find reports channel.");


        message.delete().catch(O_o=>{});
        reportschannel.send(reportembed);

    return;
  }

  if(cmd === `${prefix}helpme`){

    //?report @ned this is the reason

    let hUser = message.guild.member(message.mentions.users.first().id || message.guild.members.get(args[0]));
      if(!hUser) return message.channel.send("couldn't find user.");
    let hreason = args.join(" ").slice(22);

    let helpembed = new Discord.RichEmbed()
    .setTitle("Help")
    .setColor("#42f4ce")
    .addField("Help User", `${hUser}`)
    .addField("Channel Sent on", message.channel)
    .addField("Time Of Message", message.createdAt)
    .addField("Reason For", hreason)
    .setFooter("© copyrighted by Zeuzz");


    let helpchannel = message.guild.channels.find(`name`, "help");
      if(!helpchannel) return message.channel.send("Couldn't find help channel.");


        message.delete().catch(O_o=>{});
        helpchannel.send(helpembed);

    return;
  }

  if(cmd === `${prefix}hello`){
    message.channel.send(`Hi user! Welcome to the community, please read the following above.`)
    message.delete().catch(O_o=>{}); 
  }

  if (msg === prefix +'media') {
    message.channel.send(`Hi user! We only have a Facebook group page which is called Corpus Primus.`)
    message.delete().catch(O_o=>{});
  }

  if(cmd === `${prefix}botinfo`){
    let bicon = bot.user.displayAvatarURL;
      let welembed = new Discord.RichEmbed()
      .setColor("#15f152")
      .setTitle("Discord Bot Info")
      .setThumbnail(bicon)
      .addField("Discord Bot Name", bot.user.username)
      .setFooter("© copyrighted by Zeuzz");


      message.delete().catch(O_o=>{});      
      return message.channel.send(welembed);
  }
  
  if(cmd === `${prefix}serverinfo`){
    let sicon = message.guild.iconURL;
      let serverembed = new Discord.RichEmbed()
      .setColor("#15f152")
      .setTitle("Server Info")
      .setThumbnail(sicon)
      .addField("Community:", message.guild.name)
      .addField("Community Owner", message.guild.owner)
      .addField("Member Count:", message.guild.memberCount)
      .addField("Role Count:", message.guild.roles.size)
      .setFooter("© copyrighted by Zeuzz");
      
      message.delete().catch(O_o=>{});
      return message.channel.send(serverembed);
      
  }

  if(cmd === `${prefix}helpinfo`){
    let sicon = message.guild.iconURL;
      let infoembed = new Discord.RichEmbed()
      .setColor("#15f152")
      .setTitle("Server Info")
      .setThumbnail(sicon)
      .addField("?helpinfo", "Gives you all of the commands listed.")
      .addField("?serverinfo", "Gives you the server information of the community, community owner, members count and roles.")
      .addField("?botinfo","Gives you the information about the bot being used for the server.")
      .addField("?hello", "The bot talks to you.")
      .addField("?report", "To report someone you will need to do `?report <@username> Reason`. You can not report the bots, admin, moderation teams.")
      .setFooter("© copyrighted by Zeuzz");
    

     

      message.delete().catch(O_o=>{});
      return message.channel.send(infoembed);
  }



});

bot.login(tokenfile.token);
