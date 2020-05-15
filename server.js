const http = require('http');
const express = require('express');
const app = express();
app.get("/", (request, response) => {
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://me-premium.glitch.me/`);
}, 280000);

// كل البكجات الي ممكن تحتجها في اي بوت
const { Client, RichEmbed } = require("discord.js");
var { Util } = require('discord.js');
//const {TOKEN, YT_API_KEY, prefix, devs} = require('./config.js')
const client = new Client({ disableEveryone: false})
const ytdl = require("ytdl-core");
const canvas = require("canvas");
const Canvas = require("canvas");
const convert = require("hh-mm-ss")
const fetchVideoInfo = require("youtube-info");
const botversion = require('./package.json').version;
const simpleytapi = require('simple-youtube-api')
const moment = require("moment");
const fs = require('fs');
const util = require("util")
const gif = require("gif-search");
const opus = require("node-opus");
const ms = require("ms");
const jimp = require("jimp");
const { get } = require('snekfetch');
const guild = require('guild');
const dateFormat = require('dateformat');//npm i dateformat
const YouTube = require('simple-youtube-api');
const hastebins = require('hastebin-gen');
const getYoutubeID = require('get-youtube-id');
const yt_api_key = "AIzaSyDeoIH0u1e72AtfpwSKKOSy3IPp2UHzqi4";
const pretty = require("pretty-ms");
const queue = new Map();
var table = require('table').table
const Discord = require('discord.js');
const prefix = '#'
const devs = ['541532350719459348']
client.login(process.env.BOT_TOKEN);
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
})

const buy = JSON.parse(fs.readFileSync('./buy.json' , 'utf8'));
client.on('message',message =>{
  if(message.content.startsWith(prefix + 'buy rol')) {
  if(!buy[message.guild.id]) buy[message.guild.id] = {
  role:'null',
  price:'null',
  transfer:'null',
  onoff:'Off'
  };fs.writeFile("./buy.json",JSON.stringify(buy),(err)=>{if(err)console.error(err)})
  if(!message.member.hasPermission('MANAGE_GUILD')) return;
  let args = message.content.split(" ").slice(2).join(" ");
  if(!args) return message.channel.send(`🙄 Please Type the role Name/ID`);
  let role = message.guild.roles.find('name',args)||message.guild.roles.find('id',args);
  if(!role) return message.channel.send(`🙄 I Can't find this role`);
  buy[message.guild.id].role = role.id
  fs.writeFile("./buy.json", JSON.stringify(buy), (err) => {if (err) console.error(err)})
  message.channel.send(new Discord.RichEmbed()
  .setColor('#35393e').setFooter(message.author.tag,message.author.avatarURL).setTimestamp()
  .setAuthor('Change settings',message.guild.iconURL)
  .addField(`**Role Now**`,`**\`\`\`${role.name}\`\`\`**`,true)
  )
  }
  if(message.content.startsWith(prefix+'buy price3')) {
  if(!message.member.hasPermission('MANAGE_GUILD')) return;
  if(!buy[message.guild.id]) buy[message.guild.id] = {
  role:'null',
  price:'null',
  transfer:'null',
  onoff:'Off'
  };fs.writeFile("./buy.json",JSON.stringify(buy),(err)=>{if(err)console.error(err)})
  let args = message.content.split(" ").slice(2).join(" ");
  if(!args) return message.channel.send(`🙄 Please Type the role Price`)
  if(isNaN(parseInt(args))) return message.channel.send(`🙄 The price is wrong!`)
  if(parseInt(args)<0) return message.channel.send(`🙄 The price is wrong!`)
  buy[message.guild.id].price = args
  fs.writeFile("./buy.json", JSON.stringify(buy),(err)=>{if(err)console.error(err)})
  message.channel.send(new Discord.RichEmbed()
  .setColor('#36393e').setFooter(message.author.tag,message.author.avatarURL).setTimestamp()
  .setAuthor('Change settings',message.guild.iconURL)
  .addField(`**Role Price Now**`,`**\`\`\`${args}$\`\`\`**`,true)
  )
  }
  if(message.content.startsWith(prefix+'buy tran3')) {
  if(!message.member.hasPermission('MANAGE_GUILD')) return;
  if(!buy[message.guild.id]) buy[message.guild.id] = {
  role:'null',
  price:'null',
  transfer:'null',
  onoff:'Off'
  };fs.writeFile("./buy.json",JSON.stringify(buy),(err)=>{if(err)console.error(err)})
  let user = message.mentions.members.first() || message.guild.members.get(message.content.split(" ")[2])
  buy[message.guild.id].transfer = user.id
  fs.writeFile("./buy.json", JSON.stringify(buy), (err) => {if (err) console.error(err)})
  message.channel.send(new Discord.RichEmbed()
  .setColor('#36393e').setFooter(message.author.tag,message.author.avatarURL).setTimestamp()
  .setAuthor('Change settings',message.guild.iconURL)
  .addField(`**Trans To**`,`**${user}**`,true)
  )
  }
  if(message.content.startsWith(prefix+'buy on3')) {
  if(!message.member.hasPermission('MANAGE_GUILD')) return;
  if(!buy[message.guild.id]) buy[message.guild.id] = {
  role:'null',
  price:'null',
  transfer:'null',
  onoff:'Off'
  };fs.writeFile("./buy.json",JSON.stringify(buy),(err)=>{if(err)console.error(err)})
  buy[message.guild.id].onoff = 'On'
  fs.writeFile("./buy.json", JSON.stringify(buy), (err) => {if (err) console.error(err)})
  let on1 = new Discord.RichEmbed()
  .setColor('#36393e')
  .setDescription(`**\`\`\`The BuyRole Has Been Enabled\`\`\`**`)
  message.channel.send(on1)
  }
  if(message.content.startsWith(prefix+'buy of')) {
  if(!message.member.hasPermission('MANAGE_GUILD')) return;
  if(!buy[message.guild.id]) buy[message.guild.id] = {
  role:'null',
  price:'null',
  transfer:'null',
  onoff:'Off'
  };fs.writeFile("./buy.json",JSON.stringify(buy),(err)=>{if(err)console.error(err)})
  buy[message.guild.id].onoff = 'Off'
  fs.writeFile("./buy.json", JSON.stringify(buy), (err) => {if (err) console.error(err)})
  let off1 = new Discord.RichEmbed()
  .setColor('#36393e')
  .setDescription(`**\`\`\`The BuyRole has been disabled\`\`\`**`)
  message.channel.send(off1)
  }
  if(message == prefix + 'buy premium') {
  if(!buy[message.guild.id]) buy[message.guild.id] = {
  role:'null',
  price:'null',
  transfer:'null',
  onoff:'Off'
  };fs.writeFile("./buy.json",JSON.stringify(buy),(err)=>{if(err)console.error(err)})
  let pp = buy[message.guild.id].price
  let brole = message.guild.roles.find('id',buy[message.guild.id].role)
  let btrans = buy[message.guild.id].transfer
  if(!brole) return message.channel.send(`🙁 Please setup the command again`)
  if(!message.guild.members.find('id',buy[message.guild.id].transfer))return message.channel.send(`🙁 Please setup the command again`)
  if(buy[message.guild.id].onoff === 'Off') return message.channel.send(`🙁 - the command has been disabled\nplease type __${prefix}buy on__ to turn it on`)
  if(message.author.id === buy[message.guild.id].transfer) return message.channel.send(`you can't buy a rank because you can't transfer credits to your self 🤗`)
  if(message.member.roles.find(r=>r.id == buy[message.guild.id].role)) return message.reply(`**You already have the rank \`${brole.name}\` ✅**`);
  message.channel.send(new Discord.RichEmbed()
  .setColor('#36393e')
  .addField(`**Command:**`, `**\`#credits ${message.guild.members.get(buy[message.guild.id].transfer)} ${buy[message.guild.id].price}\`**`)).then(msgs=>{
  let lPrice = Math.floor(pp-(pp*(5/100)));
  let filter = response => response.author.id == "282859044593598464" && response.mentions._content.includes(`:moneybag: | ${message.author.username}, has transferred \`$${lPrice}\` to <@${buy[message.guild.id].transfer}>`);
  message.channel.awaitMessages(filter, { maxMatches: 1, time: 240000, errors: ['time'] })
  .then( collected =>{
  let log = message.guild.channels.find("name", `❖・log・premium`);
  let gg = new Discord.RichEmbed()
  .setColor('#36393e')
  .setThumbnail(`https://cdn.discordapp.com/attachments/584630360017469461/588151955063570433/582096911448801288.png`)
  .setAuthor(`New purchase`,`https://cdn.discordapp.com/attachments/584630360017469461/584687464334098432/581239984376381455.gif`)
  .addField(`**User :**`,`\`\`\`${message.author.username}\`\`\``,true)
  .addField(`**Role :**`,`\`\`\`${brole.name}\`\`\``,true)
  .addField(`**💰 Rank Price :**`,`\`\`\`${buy[message.guild.id].price}$\`\`\``,true)
  .addField(`**💳 Transferd To :**`,`<@${buy[message.guild.id].transfer}>`,true)
  .setTimestamp();
  if(log) log.send(gg)
  const done = new Discord.RichEmbed()
  .setColor('#36393e')
  .setDescription(`**\`\`\`Done Buy Role ${brole.name}\`\`\`**`)
  .setTimestamp();
  message.member.addRole(brole)
  message.channel.send(done);
 var mmm = setTimeout(() => {
message.member.removeRole(brole)
}, 2592000000)
  message.author.send(new Discord.RichEmbed()
  .setColor("#36393e")
  .setTitle('Role VIP')
  .setDescription(`\`\`\`RANK NAME: ${brole.name} RANK PRICE: ${buy[message.guild.id].price}$ \`\`\``)
  .setFooter(message.guild.name,message.guild.iconURL))
})
})
}
});


client.on('message', message => {
 if (message.content === (prefix + 'help-me-pro')) { 
 if (message.channel.id !== '706410190810906685') return message.reply(`<:694579706842054737:697941194017210398> | ** Cannot write except in chat ( <#706410190810906685> ) **`)
message.react('✅');
    let pages = [`** 
	<:694579669265285180:697941169912545290> | ~~#~~ 1  \` ${prefix}help-me-pro-1 \` <a:525837021558865961:677203465646243844> \` عداد الدعوت \` 
	
	<:694579669265285180:697941169912545290> | ~~#~~ 2  \` ${prefix}help-me-pro-2 \` <a:525837021558865961:677203465646243844> \` رد بصور \`
	
	<:694579669265285180:697941169912545290> | ~~#~~ 3  \` ${prefix}help-me-pro-3 \` <a:525837021558865961:677203465646243844> \` شراء رتب \`
	
	<:694579669265285180:697941169912545290> | ~~#~~ 4  \` ${prefix}help-me-pro-4 \` <a:525837021558865961:677203465646243844> \` صنع رد تلقائى \`
	
	<:694579669265285180:697941169912545290> | ~~#~~ 5  \` ${prefix}help-me-pro-5 \` <a:525837021558865961:677203465646243844> \`  لم تبعت رسائل فى خاص بوت تواصلك فى شات \`
	
	<:694579669265285180:697941169912545290> | ~~#~~ 6  \` ${prefix}help-me-pro-6 \` <a:525837021558865961:677203465646243844> \` عداد لاعضاء فى سيرفر \`
	
	<:694579669265285180:697941169912545290> | ~~#~~ 7  \` ${prefix}help-me-pro-7 \` <a:525837021558865961:677203465646243844> \` اذا منشن بوت يعمل نفس كان برد عليلك \`
	
	<:694579669265285180:697941169912545290> | ~~#~~ 8  \` ${prefix}help-me-pro-8 \` <a:525837021558865961:677203465646243844> \` نشاء 140 لون \`
	
	<:694579669265285180:697941169912545290> | ~~#~~ 9  \` ${prefix}help-me-pro-9 \` <a:525837021558865961:677203465646243844> \` كود اعلانات  مع تحديد الوقت \`
	
	<:694579669265285180:697941169912545290> | ~~#~~ 10  \` ${prefix}help-me-pro-10 \` <a:525837021558865961:677203465646243844> \` Codes kick مطور \`
	** `
    ,
    `** 
	<:694579669265285180:697941169912545290> | ~~#~~ 11  \` ${prefix}help-me-pro-11 \` <a:525837021558865961:677203465646243844> \` كود معلومات البوت \`
	
	<:694579669265285180:697941169912545290> | ~~#~~ 12  \` ${prefix}help-me-pro-12 \` <a:525837021558865961:677203465646243844> \` كود بان + بسبيب + مطور \`
	
	<:694579669265285180:697941169912545290> | ~~#~~ 13  \` ${prefix}help-me-pro-13 \` <a:525837021558865961:677203465646243844> \` كود انشاء ايموجي للشخص التمنشلو \`
	
	<:694579669265285180:697941169912545290> | ~~#~~ 14  \` ${prefix}help-me-pro-14 \` <a:525837021558865961:677203465646243844> \` كواد هلب مثل برو بوت \`
	
	<:694579669265285180:697941169912545290> | ~~#~~ 15 \` ${prefix}help-me-pro-15 \` <a:525837021558865961:677203465646243844> \` كواد القرعه \`
	
	<:694579669265285180:697941169912545290> | ~~#~~ 16  \` ${prefix}help-me-pro-16 \` <a:525837021558865961:677203465646243844> \` كواد رول مثل برو بوت \`
	
	<:694579669265285180:697941169912545290> | ~~#~~ 17  \` ${prefix}help-me-pro-17 \` <a:525837021558865961:677203465646243844> \` كود باند بل ايدي و المنشن \`
	
	<:694579669265285180:697941169912545290> | ~~#~~ 18  \` ${prefix}help-me-pro-18 \` <a:525837021558865961:677203465646243844> \` شراء رول \`
	
	<:694579669265285180:697941169912545290> | ~~#~~ 19  \` ${prefix}help-me-pro-19 \` <a:525837021558865961:677203465646243844> \` كواد عطاء رولات مطور \`
	
	<:694579669265285180:697941169912545290> | ~~#~~ 20  \` ${prefix}help-me-pro-20 \` <a:525837021558865961:677203465646243844> \` انفو اتفايت وتوب انفايت \`
	**`
    ,
    `** 
	<:694579669265285180:697941169912545290> | ~~#~~ 21  \` ${prefix}help-me-pro-21 \` <a:525837021558865961:677203465646243844> \` معلومات سيرفر مطور \`
	
	<:694579669265285180:697941169912545290> | ~~#~~ 22  \` ${prefix}help-me-pro-22 \` <a:525837021558865961:677203465646243844> \` كود التقديم مع الرفض بجيسون \`
	
	<:694579669265285180:697941169912545290> | ~~#~~ 23  \` ${prefix}help-me-pro-23 \` <a:525837021558865961:677203465646243844> \` كواد top مثل برو بوت \`
	
	<:694579669265285180:697941169912545290> | ~~#~~ 24  \` ${prefix}help-me-pro-24 \` <a:525837021558865961:677203465646243844> \` كواد ربط دعوه بوت \`
	
	<:694579669265285180:697941169912545290> | ~~#~~ 25  \` ${prefix}help-me-pro-25 \` <a:525837021558865961:677203465646243844> \` كواد يقال بوت دخل و خارج من سيرفر مطور \`
	
	<:694579669265285180:697941169912545290> | ~~#~~ 26  \` ${prefix}help-me-pro-26 \` <a:525837021558865961:677203465646243844> \` كواد لوق مثل برو بوت \`
	
	<:694579669265285180:697941169912545290> | ~~#~~ 27  \` ${prefix}help-me-pro-27 \` <a:525837021558865961:677203465646243844> \` كواد قائمه الوان \`
	
	<:694579669265285180:697941169912545290> | ~~#~~ 28  \` ${prefix}help-me-pro-28 \` <a:525837021558865961:677203465646243844> \` رول ركشن \`
	
	<:694579669265285180:697941169912545290> | ~~#~~ 29  \` ${prefix}help-me-pro-29 \` <a:525837021558865961:677203465646243844> \` كواد قيف اوى \`
	
	<:694579669265285180:697941169912545290> | ~~#~~ 30  \` ${prefix}help-me-pro-30 \` <a:525837021558865961:677203465646243844> \` كواد تكيت مع سجل \`
	**`]
    let page = 1;
 
    let embed = new Discord.RichEmbed()
    .setColor('RANDOM')
    .setFooter(`Page ${page} of ${pages.length}`)
    .setDescription(pages[page-1])
 
    message.channel.sendEmbed(embed).then(msg => {
 
        msg.react('◀').then( r => {
            msg.react('▶')
 
 
        const backwardsFilter = (reaction, user) => reaction.emoji.name === '◀' && user.id === message.author.id;
        const forwardsFilter = (reaction, user) => reaction.emoji.name === '▶' && user.id === message.author.id;
 
 
        const backwards = msg.createReactionCollector(backwardsFilter, { time: 2000000});
        const forwards = msg.createReactionCollector(forwardsFilter, { time: 2000000});
 
 
 
        backwards.on('collect', r => {
            if (page === 1) return;
            page--;
            embed.setDescription(pages[page-1]);
            embed.setFooter(`Page ${page} of ${pages.length}`);
            msg.edit(embed)
        })
        forwards.on('collect', r => {
            if (page === pages.length) return;
     
      page++;
            embed.setDescription(pages[page-1]);
            embed.setFooter(`Page ${page} of ${pages.length}`);
            msg.edit(embed)
        })
        })
    })
    }
	
	

});


////////////////////////////////////

 /* ,
    `** 
<:694579669265285180:697941169912545290> | ~~#~~ 31  \` ${prefix}help-me-pro-31 \` <a:525837021558865961:677203465646243844> \`  \`

<:694579669265285180:697941169912545290> | ~~#~~ 32  \` ${prefix}help-me-pro-32 \` <a:525837021558865961:677203465646243844> \`  \`

<:694579669265285180:697941169912545290> | ~~#~~ 33  \` ${prefix}help-me-pro-33 \` <a:525837021558865961:677203465646243844> \`  \`

<:694579669265285180:697941169912545290> | ~~#~~ 34  \` ${prefix}help-me-pro-34 \` <a:525837021558865961:677203465646243844> \`  \`

<:694579669265285180:697941169912545290> | ~~#~~ 35  \` ${prefix}help-me-pro-35 \` <a:525837021558865961:677203465646243844> \`  \`

<:694579669265285180:697941169912545290> | ~~#~~ 36  \` ${prefix}help-me-pro-36 \` <a:525837021558865961:677203465646243844> \`  \`

<:694579669265285180:697941169912545290> | ~~#~~ 37  \` ${prefix}help-me-pro-37 \` <a:525837021558865961:677203465646243844> \`  \`

<:694579669265285180:697941169912545290> | ~~#~~ 38  \` ${prefix}help-me-pro-38 \` <a:525837021558865961:677203465646243844> \`  \`

<:694579669265285180:697941169912545290> | ~~#~~ 39  \` ${prefix}help-me-pro-39 \` <a:525837021558865961:677203465646243844> \`  \`

<:694579669265285180:697941169912545290> | ~~#~~ 40  \` ${prefix}help-me-pro-40 \` <a:525837021558865961:677203465646243844> \`  \`
** */

//////////////////////////////////








  client.on('message', message => {
    if (message.author.bot) return;
     if (message.content === prefix + "help-me-pro-1") {
         if (message.channel.id !== '706410190810906685') return message.reply(`<:694579706842054737:697941194017210398> | ** Cannot write except in chat ( <#706410190810906685> ) **`)
 message.author.send(`**
<a:33:674311916776194084> | __D__escribe : عداد الدعوت 

<a:28:674311913576071179> | __C__ode : https://4cash.me/Invitation-counter

<a:27:674311912917303296> | __T__ype __o__f __c__ode : __M__e __C__odes __P__remium

**`).then(m => {
message.react('✅');
}).catch(() => {
message.react('❌')
})
}
});

  client.on('message', message => {
    if (message.author.bot) return;
     if (message.content === prefix + "help-me-pro-2") {
         if (message.channel.id !== '706410190810906685') return message.reply(`<:694579706842054737:697941194017210398> | ** Cannot write except in chat ( <#706410190810906685> ) **`)
 message.author.send(`**
<a:33:674311916776194084> | __D__escribe : رد بصور

<a:28:674311913576071179> | __C__ode : https://4cash.me/Reply-with-pictures

<a:27:674311912917303296> | __T__ype __o__f __c__ode : __M__e __C__odes __P__remium

**`).then(m => {
message.react('✅');
}).catch(() => {
message.react('❌')
})
}
});

  client.on('message', message => {
    if (message.author.bot) return;
     if (message.content === prefix + "help-me-pro-3") {
         if (message.channel.id !== '706410190810906685') return message.reply(`<:694579706842054737:697941194017210398> | ** Cannot write except in chat ( <#706410190810906685> ) **`)
 message.author.send(`**
<a:33:674311916776194084> | __D__escribe : شراء رتب

<a:28:674311913576071179> | __C__ode : https://4cash.me/purchase-ranks

<a:27:674311912917303296> | __T__ype __o__f __c__ode : __M__e __C__odes __P__remium

**`).then(m => {
message.react('✅');
}).catch(() => {
message.react('❌')
})
}
});

  client.on('message', message => {
    if (message.author.bot) return;
     if (message.content === prefix + "help-me-pro-4") {
         if (message.channel.id !== '706410190810906685') return message.reply(`<:694579706842054737:697941194017210398> | ** Cannot write except in chat ( <#706410190810906685> ) **`)
 message.author.send(`**
<a:33:674311916776194084> | __D__escribe : صنع رد تلقائى

<a:28:674311913576071179> | __C__ode : https://4cash.me/Create-an-automatic-response

<a:27:674311912917303296> | __T__ype __o__f __c__ode : __M__e __C__odes __P__remium

**`).then(m => {
message.react('✅');
}).catch(() => {
message.react('❌')
})
}
});

  client.on('message', message => {
    if (message.author.bot) return;
     if (message.content === prefix + "help-me-pro-5") {
         if (message.channel.id !== '706410190810906685') return message.reply(`<:694579706842054737:697941194017210398> | ** Cannot write except in chat ( <#706410190810906685> ) **`)
 message.author.send(`**
<a:33:674311916776194084> | __D__escribe :  لم تبعت رسائل فى خاص بوت تواصلك فى شات

<a:28:674311913576071179> | __C__ode : https://4cash.me/Special-bot

<a:27:674311912917303296> | __T__ype __o__f __c__ode : __M__e __C__odes __P__remium

**`).then(m => {
message.react('✅');
}).catch(() => {
message.react('❌')
})
}
});

  client.on('message', message => {
    if (message.author.bot) return;
     if (message.content === prefix + "help-me-pro-6") {
         if (message.channel.id !== '706410190810906685') return message.reply(`<:694579706842054737:697941194017210398> | ** Cannot write except in chat ( <#706410190810906685> ) **`)
 message.author.send(`**
<a:33:674311916776194084> | __D__escribe : عداد لاعضاء فى سيرفر

<a:28:674311913576071179> | __C__ode : https://4cash.me/Number-of-members

<a:27:674311912917303296> | __T__ype __o__f __c__ode : __M__e __C__odes __P__remium

**`).then(m => {
message.react('✅');
}).catch(() => {
message.react('❌')
})
}
});

  client.on('message', message => {
    if (message.author.bot) return;
     if (message.content === prefix + "help-me-pro-7") {
         if (message.channel.id !== '706410190810906685') return message.reply(`<:694579706842054737:697941194017210398> | ** Cannot write except in chat ( <#706410190810906685> ) **`)
 message.author.send(`**
<a:33:674311916776194084> | __D__escribe : اذا منشن بوت يعمل نفس كان برد عليلك

<a:28:674311913576071179> | __C__ode : https://4cash.me/Munch-Pot

<a:27:674311912917303296> | __T__ype __o__f __c__ode : __M__e __C__odes __P__remium

**`).then(m => {
message.react('✅');
}).catch(() => {
message.react('❌')
})
}
});

  client.on('message', message => {
    if (message.author.bot) return;
     if (message.content === prefix + "help-me-pro-8") {
         if (message.channel.id !== '706410190810906685') return message.reply(`<:694579706842054737:697941194017210398> | ** Cannot write except in chat ( <#706410190810906685> ) **`)
 message.author.send(`**
<a:33:674311916776194084> | __D__escribe : نشاء 140 لون

<a:28:674311913576071179> | __C__ode : https://4cash.me/140-colors

<a:27:674311912917303296> | __T__ype __o__f __c__ode : __M__e __C__odes __P__remium

**`).then(m => {
message.react('✅');
}).catch(() => {
message.react('❌')
})
}
});

  client.on('message', message => {
    if (message.author.bot) return;
     if (message.content === prefix + "help-me-pro-9") {
         if (message.channel.id !== '706410190810906685') return message.reply(`<:694579706842054737:697941194017210398> | ** Cannot write except in chat ( <#706410190810906685> ) **`)
 message.author.send(`**
<a:33:674311916776194084> | __D__escribe : كود اعلانات  مع تحديد الوقت

<a:28:674311913576071179> | __C__ode : https://4cash.me/advertisement-codes

<a:27:674311912917303296> | __T__ype __o__f __c__ode : __M__e __C__odes __P__remium

**`).then(m => {
message.react('✅');
}).catch(() => {
message.react('❌')
})
}
});

  client.on('message', message => {
    if (message.author.bot) return;
     if (message.content === prefix + "help-me-pro-10") {
         if (message.channel.id !== '706410190810906685') return message.reply(`<:694579706842054737:697941194017210398> | ** Cannot write except in chat ( <#706410190810906685> ) **`)
 message.author.send(`**
<a:33:674311916776194084> | __D__escribe : Codes kick مطور

<a:28:674311913576071179> | __C__ode : https://4cash.me/code-kick-invite-manger

<a:27:674311912917303296> | __T__ype __o__f __c__ode : __M__e __C__odes __P__remium

**`).then(m => {
message.react('✅');
}).catch(() => {
message.react('❌')
})
}
});

  client.on('message', message => {
    if (message.author.bot) return;
     if (message.content === prefix + "help-me-pro-11") {
         if (message.channel.id !== '706410190810906685') return message.reply(`<:694579706842054737:697941194017210398> | ** Cannot write except in chat ( <#706410190810906685> ) **`)
 message.author.send(`**
<a:33:674311916776194084> | __D__escribe : كود معلومات البوت

<a:28:674311913576071179> | __C__ode : https://4cash.me/Bot-information-code

<a:27:674311912917303296> | __T__ype __o__f __c__ode : __M__e __C__odes __P__remium

**`).then(m => {
message.react('✅');
}).catch(() => {
message.react('❌')
})
}
});

  client.on('message', message => {
    if (message.author.bot) return;
     if (message.content === prefix + "help-me-pro-12") {
         if (message.channel.id !== '706410190810906685') return message.reply(`<:694579706842054737:697941194017210398> | ** Cannot write except in chat ( <#706410190810906685> ) **`)
 message.author.send(`**
<a:33:674311916776194084> | __D__escribe : كود بان + بسبيب + مطور

<a:28:674311913576071179> | __C__ode : https://4cash.me/code-kick-id-mention

<a:27:674311912917303296> | __T__ype __o__f __c__ode : __M__e __C__odes __P__remium

**`).then(m => {
message.react('✅');
}).catch(() => {
message.react('❌')
})
}
});

  client.on('message', message => {
    if (message.author.bot) return;
     if (message.content === prefix + "help-me-pro-13") {
         if (message.channel.id !== '706410190810906685') return message.reply(`<:694579706842054737:697941194017210398> | ** Cannot write except in chat ( <#706410190810906685> ) **`)
 message.author.send(`**
<a:33:674311916776194084> | __D__escribe : كود انشاء ايموجي للشخص التمنشلو

<a:28:674311913576071179> | __C__ode : https://4cash.me/Emoji-Munchen

<a:27:674311912917303296> | __T__ype __o__f __c__ode : __M__e __C__odes __P__remium

**`).then(m => {
message.react('✅');
}).catch(() => {
message.react('❌')
})
}
});

  client.on('message', message => {
    if (message.author.bot) return;
     if (message.content === prefix + "help-me-pro-14") {
         if (message.channel.id !== '706410190810906685') return message.reply(`<:694579706842054737:697941194017210398> | ** Cannot write except in chat ( <#706410190810906685> ) **`)
 message.author.send(`**
<a:33:674311916776194084> | __D__escribe : كواد هلب مثل برو بوت

<a:28:674311913576071179> | __C__ode : https://4cash.me/hrelp-ProBot

<a:27:674311912917303296> | __T__ype __o__f __c__ode : __M__e __C__odes __P__remium

**`).then(m => {
message.react('✅');
}).catch(() => {
message.react('❌')
})
}
});


  client.on('message', message => {
    if (message.author.bot) return;
     if (message.content === prefix + "help-me-pro-15") {
         if (message.channel.id !== '706410190810906685') return message.reply(`<:694579706842054737:697941194017210398> | ** Cannot write except in chat ( <#706410190810906685> ) **`)
 message.author.send(`**
<a:33:674311916776194084> | __D__escribe : كواد القرعه

<a:28:674311913576071179> | __C__ode : https://4cash.me/lottery-code

<a:27:674311912917303296> | __T__ype __o__f __c__ode : __M__e __C__odes __P__remium

**`).then(m => {
message.react('✅');
}).catch(() => {
message.react('❌')
})
}
});


  client.on('message', message => {
    if (message.author.bot) return;
     if (message.content === prefix + "help-me-pro-16") {
         if (message.channel.id !== '706410190810906685') return message.reply(`<:694579706842054737:697941194017210398> | ** Cannot write except in chat ( <#706410190810906685> ) **`)
 message.author.send(`**
<a:33:674311916776194084> | __D__escribe : كواد رول مثل برو بوت

<a:28:674311913576071179> | __C__ode : https://4cash.me/Role-ProBot

<a:27:674311912917303296> | __T__ype __o__f __c__ode : __M__e __C__odes __P__remium

**`).then(m => {
message.react('✅');
}).catch(() => {
message.react('❌')
})
}
});


  client.on('message', message => {
    if (message.author.bot) return;
     if (message.content === prefix + "help-me-pro-17") {
         if (message.channel.id !== '706410190810906685') return message.reply(`<:694579706842054737:697941194017210398> | ** Cannot write except in chat ( <#706410190810906685> ) **`)
 message.author.send(`**
<a:33:674311916776194084> | __D__escribe : كود باند بل ايدي و المنشن 

<a:28:674311913576071179> | __C__ode : https://4cash.me/Apple-Band-Code-and-Creator

<a:27:674311912917303296> | __T__ype __o__f __c__ode : __M__e __C__odes __P__remium

**`).then(m => {
message.react('✅');
}).catch(() => {
message.react('❌')
})
}
});

  client.on('message', message => {
    if (message.author.bot) return;
     if (message.content === prefix + "help-me-pro-18") {
         if (message.channel.id !== '706410190810906685') return message.reply(`<:694579706842054737:697941194017210398> | ** Cannot write except in chat ( <#706410190810906685> ) **`)
 message.author.send(`**
<a:33:674311916776194084> | __D__escribe : شراء رول

<a:28:674311913576071179> | __C__ode : https://4cash.me/Buy-role

<a:27:674311912917303296> | __T__ype __o__f __c__ode : __M__e __C__odes __P__remium

**`).then(m => {
message.react('✅');
}).catch(() => {
message.react('❌')
})
}
});

  client.on('message', message => {
    if (message.author.bot) return;
     if (message.content === prefix + "help-me-pro-19") {
         if (message.channel.id !== '706410190810906685') return message.reply(`<:694579706842054737:697941194017210398> | ** Cannot write except in chat ( <#706410190810906685> ) **`)
 message.author.send(`**
<a:33:674311916776194084> | __D__escribe : كواد عطاء رولات مطور

<a:28:674311913576071179> | __C__ode : https://4cash.me/Role-ProBot-2

<a:27:674311912917303296> | __T__ype __o__f __c__ode : __M__e __C__odes __P__remium

**`).then(m => {
message.react('✅');
}).catch(() => {
message.react('❌')
})
}
});

  client.on('message', message => {
    if (message.author.bot) return;
     if (message.content === prefix + "help-me-pro-20") {
         if (message.channel.id !== '706410190810906685') return message.reply(`<:694579706842054737:697941194017210398> | ** Cannot write except in chat ( <#706410190810906685> ) **`)
 message.author.send(`**
<a:33:674311916776194084> | __D__escribe : انفو اتفايت وتوب انفايت

<a:28:674311913576071179> | __C__ode : https://4cash.me/Top-Infinite

<a:27:674311912917303296> | __T__ype __o__f __c__ode : __M__e __C__odes __P__remium

**`).then(m => {
message.react('✅');
}).catch(() => {
message.react('❌')
})
}
});


  client.on('message', message => {
    if (message.author.bot) return;
     if (message.content === prefix + "help-me-pro-21") {
         if (message.channel.id !== '706410190810906685') return message.reply(`<:694579706842054737:697941194017210398> | ** Cannot write except in chat ( <#706410190810906685> ) **`)
 message.author.send(`**
<a:33:674311916776194084> | __D__escribe : معلومات سيرفر مطور

<a:28:674311913576071179> | __C__ode : https://4cash.me/Code-Server

<a:27:674311912917303296> | __T__ype __o__f __c__ode : __M__e __C__odes __P__remium

**`).then(m => {
message.react('✅');
}).catch(() => {
message.react('❌')
})
}
});

  client.on('message', message => {
    if (message.author.bot) return;
     if (message.content === prefix + "help-me-pro-22") {
         if (message.channel.id !== '706410190810906685') return message.reply(`<:694579706842054737:697941194017210398> | ** Cannot write except in chat ( <#706410190810906685> ) **`)
 message.author.send(`**
<a:33:674311916776194084> | __D__escribe : كود التقديم مع الرفض بجيسون

<a:28:674311913576071179> | __C__ode : https://4cash.me/Developer-submission-code

<a:27:674311912917303296> | __T__ype __o__f __c__ode : __M__e __C__odes __P__remium

**`).then(m => {
message.react('✅');
}).catch(() => {
message.react('❌')
})
}
});

  client.on('message', message => {
    if (message.author.bot) return;
     if (message.content === prefix + "help-me-pro-23") {
         if (message.channel.id !== '706410190810906685') return message.reply(`<:694579706842054737:697941194017210398> | ** Cannot write except in chat ( <#706410190810906685> ) **`)
 message.author.send(`**
<a:33:674311916776194084> | __D__escribe : كواد top مثل برو بوت

<a:28:674311913576071179> | __C__ode : https://4cash.me/Top-members

<a:27:674311912917303296> | __T__ype __o__f __c__ode : __M__e __C__odes __P__remium

**`).then(m => {
message.react('✅');
}).catch(() => {
message.react('❌')
})
}
});

  client.on('message', message => {
    if (message.author.bot) return;
     if (message.content === prefix + "help-me-pro-24") {
         if (message.channel.id !== '706410190810906685') return message.reply(`<:694579706842054737:697941194017210398> | ** Cannot write except in chat ( <#706410190810906685> ) **`)
 message.author.send(`**
<a:33:674311916776194084> | __D__escribe : كواد ربط دعوه بوت

<a:28:674311913576071179> | __C__ode : https://4cash.me/Quad-bind-invite-call

<a:27:674311912917303296> | __T__ype __o__f __c__ode : __M__e __C__odes __P__remium

**`).then(m => {
message.react('✅');
}).catch(() => {
message.react('❌')
})
}
});

  client.on('message', message => {
    if (message.author.bot) return;
     if (message.content === prefix + "help-me-pro-25") {
         if (message.channel.id !== '706410190810906685') return message.reply(`<:694579706842054737:697941194017210398> | ** Cannot write except in chat ( <#706410190810906685> ) **`)
 message.author.send(`**
<a:33:674311916776194084> | __D__escribe : كواد يقال بوت دخل و خارج من سيرفر مطور

<a:28:674311913576071179> | __C__ode : https://4cash.me/Entry-and-Exit

<a:27:674311912917303296> | __T__ype __o__f __c__ode : __M__e __C__odes __P__remium

**`).then(m => {
message.react('✅');
}).catch(() => {
message.react('❌')
})
}
});

  client.on('message', message => {
    if (message.author.bot) return;
     if (message.content === prefix + "help-me-pro-26") {
         if (message.channel.id !== '706410190810906685') return message.reply(`<:694579706842054737:697941194017210398> | ** Cannot write except in chat ( <#706410190810906685> ) **`)
 message.author.send(`**
<a:33:674311916776194084> | __D__escribe : كواد لوق مثل برو بوت

<a:28:674311913576071179> | __C__ode : https://4cash.me/log-ProBot

<a:27:674311912917303296> | __T__ype __o__f __c__ode : __M__e __C__odes __P__remium

**`).then(m => {
message.react('✅');
}).catch(() => {
message.react('❌')
})
}
});

  client.on('message', message => {
    if (message.author.bot) return;
     if (message.content === prefix + "help-me-pro-27") {
         if (message.channel.id !== '706410190810906685') return message.reply(`<:694579706842054737:697941194017210398> | ** Cannot write except in chat ( <#706410190810906685> ) **`)
 message.author.send(`**
<a:33:674311916776194084> | __D__escribe : كواد قائمه الوان مثل برو بوت

<a:28:674311913576071179> | __C__ode : https://4cash.me/Colors-list

<a:27:674311912917303296> | __T__ype __o__f __c__ode : __M__e __C__odes __P__remium

**`).then(m => {
message.react('✅');
}).catch(() => {
message.react('❌')
})
}
});

  client.on('message', message => {
    if (message.author.bot) return;
     if (message.content === prefix + "help-me-pro-28") {
         if (message.channel.id !== '706410190810906685') return message.reply(`<:694579706842054737:697941194017210398> | ** Cannot write except in chat ( <#706410190810906685> ) **`)
 message.author.send(`**
<a:33:674311916776194084> | __D__escribe : رول ركشن

<a:28:674311913576071179> | __C__ode : https://4cash.me/Recruitment-roll

<a:27:674311912917303296> | __T__ype __o__f __c__ode : __M__e __C__odes __P__remium

**`).then(m => {
message.react('✅');
}).catch(() => {
message.react('❌')
})
}
});

  client.on('message', message => {
    if (message.author.bot) return;
     if (message.content === prefix + "help-me-pro-29") {
         if (message.channel.id !== '706410190810906685') return message.reply(`<:694579706842054737:697941194017210398> | ** Cannot write except in chat ( <#706410190810906685> ) **`)
 message.author.send(`**
<a:33:674311916776194084> | __D__escribe : كواد قيف اوى

<a:28:674311913576071179> | __C__ode : https://4cash.me/GiveawayBot

<a:27:674311912917303296> | __T__ype __o__f __c__ode : __M__e __C__odes __P__remium

**`).then(m => {
message.react('✅');
}).catch(() => {
message.react('❌')
})
}
});

  client.on('message', message => {
    if (message.author.bot) return;
     if (message.content === prefix + "help-me-pro-30") {
         if (message.channel.id !== '706410190810906685') return message.reply(`<:694579706842054737:697941194017210398> | ** Cannot write except in chat ( <#706410190810906685> ) **`)
 message.author.send(`**
<a:33:674311916776194084> | __D__escribe : كواد تكيت مع سجل

<a:28:674311913576071179> | __C__ode : https://4cash.me/Tickets-log

<a:27:674311912917303296> | __T__ype __o__f __c__ode : __M__e __C__odes __P__remium

**`).then(m => {
message.react('✅');
}).catch(() => {
message.react('❌')
})
}
});