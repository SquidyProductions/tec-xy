
const Discord = require('discord.js');
const botconfig = require("./botconfig.json");
const fs = require("fs");
const editJsonFile = require("edit-json-file");
const bot = new Discord.Client();
bot.on("ready", async () => {
    bot.user.setActivity('Do .help for help | Made By PaperSquid');
    console.log("Paper Thin Bot Online...");
});
bot.on("message", async message => {

    let prefix = botconfig.prefix;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);
    file = editJsonFile(`./playerData.json`, {
        autosave: true
    });
    if (message.author.bot) return;
    if (message.channel.type === "dm") return;
    if (cmd.charAt(0) === prefix) {
        if(cmd === `${prefix}fc`){
            let AR = args[0];
            let ninConsole = args[1];
            let code = args[2];
            if(AR === "add"){
                if(ninConsole === "switch"){
                    message.delete();
                    return file.set(`${message.author.id}.codes.switch`, code);
                }
                if(ninConsole === "3ds"){
                    message.delete();
                    return file.set(`${message.author.id}.codes.3ds`, code);
                }
            }else if(AR === "remove"){
                if(ninConsole === "switch"){
                    return file.set(`${message.author.id}.codes.switch`, "undefined");
                }
                if(ninConsole === "3ds"){
                    message.delete();
                    return file.set(`${message.author.id}.codes.3ds`, "undefined");
                }
            }else{
                let switchFC = file.get(`${message.author.id}.codes.switch`)
                let threeDsFC = file.get(`${message.author.id}.codes.3ds`)
                let fcEmbed = new Discord.RichEmbed()
                .setTitle("`" + message.author.username + "'s Friendcodes`")
                .addField("**Switch Friendcode**", switchFC, true)
                .addField("**3DS Friendcode**", threeDsFC, true)
                .color("#F7E533")
                message.delete();                                
                return message.author.send(fcEmbed);
            }
        }
        if(cmd === `${prefix}ance`){
            let ance = args.join(" ");
            let anceChannel = message.guild.channels.find(`name`, "announcements")
            var today = new Date();
            var dd = today.getDate();
            var mm = today.getMonth()+1;
            var yyyy = today.getFullYear();
            var date = `${mm}-${dd}-${yyyy}`;
            let anceEmbed = new Discord.RichEmbed()
            .setTitle(`**Announcement ${date}**`)
            .addField(`**${ance}**`, " ")
            .addField(`- ${message.author.username}`, " ")
            .setColor("#F7E533")
            .setThumbnail(message.author.displayAvatarURL)
            anceChannel.send(anceEmbed);
        }
        if (cmd === `${prefix}help`) {
            let helpEmbed = new Discord.RichEmbed()
                .setColor("#FFA904")
                .setTitle("**`Commands`**")
                .addField(`${prefix}help (Usage: ${prefix}help)`, "Displays this Menu", true)
                .addField(`${prefix}report (Usage: ${prefix}report @user <reason>)`, "Reports a User for Violation of the Rules", true)
                .addField(`${prefix}papermeme (Usage: ${prefix}papermeme (<1-11>)`, "Sends a Dank Paper Meme to you. Put no number for a random meme.", true)
            let adminHelpEmbed = new Discord.RichEmbed()
                .setColor("#ff6004")
                .setTitle("**`Admin Commands`**")
                .addField(`${prefix}ance (Usage: ${prefix}ance <annoucement>)`, `Sends a message to the annoucements channel. Must be under 1042 characters in case you have to right your thesus.`, true)
            message.delete();
            message.author.send(helpEmbed);
            if (message.member.roles.find("name", "Manager")) {
                message.author.send(adminHelpEmbed);
            }

        }
        if (cmd === `${prefix}report`) {
            let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
            if (!rUser) return message.author.send("Couldn't Find User");
            let reason = args.join(" ").slice(22);
            let reportEmbed = new Discord.RichEmbed()
                .setTitle("Reports")
                .setColor("#F7E533")
                .addField("Reported User", `${rUser} with ID: ${rUser.id}`)
                .addField("Reported By", `${message.author} with ID: ${message.author.id}`)
                .addField("Channel", message.channel)
                .addField("Time", message.createdAt)
                .addField("Reason", reason)
            let reportschannel = message.guild.channels.find(`name`, "reports");
            if (!reportschannel) return message.channel.send("Couldn't find reports channel.");

            message.delete().catch(O_o => {});
            reportschannel.send(reportEmbed);
            message.delete();
            return;
        }
        if (cmd === `${prefix}papermeme`) {
            if (!args[0] >= 1 || args[0] <= 11) {
                message.delete();
                    let roll = Math.floor(Math.random() * 10) + 1;
                    return message.author.send(`Meme ${roll}:`, {
                        file: `/Users/colestowell 1/Desktop/PaperThinBot/images/Paper Mario Memes/meme${roll}.jpg`
                    });
                }else{
                return message.author.send("Invalid Arguments");
            }
        }
        message.delete();
    }
});
bot.login(botconfig.token);