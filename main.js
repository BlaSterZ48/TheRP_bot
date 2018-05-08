
const Discord = require('discord.js');

var bot = new Discord.Client();
var prefix = ("/");
var randnum = 0;
var randnumstry = 0;
var color = "#FF358B";
//Image de lauteur (commande help)
var authorimg = "https://cdn.pixabay.com/photo/2013/07/12/12/36/letter-145996_960_720.png";
//Lien de l'auteur (commande help)
var authorurl = "https://github.com/discordjs/discord.js/blob/stable/src/structures/RichEmbed.js#L38";
var Forum = "http://florian.mtxserv.fr/index.php"


bot.on('ready', () => {
    bot.user.setPresence({ game: { name: 'Je suis en test', type: 0}});
    console.log("Bot ready !");
});

bot.login(process.env.TOKEN);


bot.on('guildMemberAdd', member => {
  member.createDM().then(channel => {
    //return channel.send('Bienvenue sur [FR] TheRP @' + member.displayName)
    return channel.send("Nous espérons que tu passeras de bons momments sur notre serveur, n'hésites pas à aller t'inscrire sur le Forum : http://florian.mtxserv.fr/index.php, tu peux aussi aller sur notre TS : teamspeak5.mtxserv.fr:10211")
  }).catch(console.error)
  // On pourrait catch l'erreur autrement ici (l'utilisateur a peut être désactivé les MP)
})


bot.on("guildMemberAdd", member =>{
  const guild = member.guild;
  member.guild.channels.find("name", "arrivés").send(`Bienvenue sur [FR] TheRP @${member.user.username}, tu es le ${guild.memberCount}ème ! Bon jeu !`)
});

bot.on('message', message => {

    if (message.content === "Comment ça va ?"){
        //console.log("if")
        random();
        //console.log("random", randnum)

        if (randnum == 0){
            //console.log("0", randnum)
            message.reply("Bien, merci de le demander.");
            console.log("réponse", randnum);
        }

        if (randnum == 1){
            message.reply("C'est pas tes affaires !");
            console.log("réponse", randnum);
        }

        if (randnum == 2){
            message.reply("Je suis chaud de OUF !!");
            console.log("réponse", randnum);
        }

        if (randnum == 3){
            message.reply("Je n'ai aucun bug, merci ;).");
            console.log("réponse", randnum);
        }

        if (randnum == 4){
          message.reply("Ferme ta gueule !!");
          console.log("réponse", randnum);
      }

    }


    if (message.content === "ping"){
        message.reply("pong");
        console.log('ping pong');
    }

    //if (!message.content.startsWith(prefix)) return;
    //var args = message.content.substring(prefix.length).split(" ");

    //switch (args[0].toLowerCase())

        //case "setcolor":
        //var color = message.content.substr(10);
        //console.log(color)
        //message.channel.send("La couleur à bien été changée.")

        //break;

    

    if (message.content === prefix + "help"){
        var help_embed = new Discord.RichEmbed()
            //.addField("Commandes", "-Premiere commande : description.", '-Deuxieme commande : description.')
            .addBlankField()
            .addField("-/help", "Affiche les commandes du bot !")
            .addField("-ping", "Le bot répond pong !")
            .addField("-Comment ça va ?", "Le bot répond à la question.")
            .addField("-/newstory", "Ajoute l'histoire que vous écrivez à la base de donnée.")
            .addField("-/tellstory", "Raconte une histoire au hasard.")
            .addField("-/purge", "supprime les derniers messages.\nA utiliser avec précaution !")
            .addField("-/ping", "Calcule la latence.")
            .addField("-/advert", "fais dire quelque chose au bot")
            .addField("-/kick @Name Raison", "Kick la personne citée.")
            .addField("-/ban @Name Raison", "Bannis la personne citée.")
            .addField("-/forum", "Affiche le lien du Forum.")
            .setFooter("Bot en test ;)")
            .setAuthor("BotFlo", authorimg, authorurl)
            .setColor(color)
            .setTitle("HELP")
            .setDescription("Listage des commandes du bot et explication de leur utilité.")
        message.channel.sendEmbed(help_embed);
        //message.channel.send("Voicis les commandes du bot :\n -help pour afficher les commandes");
        console.log("Commande Help demandée !");
    }

    if (message.content === prefix + "caca"){
      message.channel.send("CACA !!! :poop:")
      console.log("CACA")
    }

});

function story_random(min, max) {
    min = Math.ceil(0);
    max = Math.floor(storynumber);
    randnum = Math.floor(Math.random() * (max - min +1) + min);
}

function random(min, max){
    min = Math.ceil(0);
    max = Math.floor(4);
    randnum = Math.floor(Math.random() * (max - min +1) + min);
}


 
const config = require("./config.json");

bot.on("ready", () => {
  console.log(`Le bot à démaré avec : ${bot.users.size} utilisateurs, dans ${bot.channels.size} channels de ${bot.guilds.size} serveurs.`);
  bot.user.setActivity(`${bot.guilds.size} serveurs`);
});

bot.on("guildCreate", guild => {
  console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
  bot.user.setActivity(`${bot.guilds.size} serveurs`);
});

bot.on("guildDelete", guild => {
  console.log(`J'ai été supprimé de : ${guild.name} (id: ${guild.id})`);
  bot.user.setActivity(`${bot.guilds.size} serveurs`);
});


bot.on("message", async message => {

  if(message.author.bot) return;

  if(message.content.indexOf(config.prefix) !== 0) return;

  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  
  if(command === "ping") {
    const m = await message.channel.send("Ping?");
    m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(bot.ping)}ms`);
    console.log("/ping")
  }

  //if(command === "setcolor") {
  	//var = message.content.
  //}
  
  if(command === "advert") {
    if(!message.member.roles.some(r=>["Admin", "Staff", "."].includes(r.name)) )
      return message.reply("Désolé mais vous n'avez pas les droits nécessaires pour utiliser cette commande.");

    const sayMessage = args.join(" ");
    message.delete().catch(O_o=>{});
    message.channel.send(sayMessage); 
    var auth = message.author
    console.log(`ADVERT : ${sayMessage} de ${auth}`)
    
  }



  if(command === "advertembed") {
    if(!message.member.roles.some(r=>["Staff", "."].includes(r.name)) )
      return message.reply("Désolé mais vous n'avez pas les droits nécessaires pour utiliser cette commande.");
  const sayMessage = args.join(" ");
  message.delete().catch(O_o=>{});
  var auth = message.author
  var advert_embed = new Discord.RichEmbed()
            .setColor('#00CE22')
            .setTitle("advert")
            .addField(`${sayMessage}`, ".")
            .setFooter(`De ${auth} `)
            .setThumbnail("https://cdn.discordapp.com/attachments/427148659675758601/442669553735041024/Blason_frp_original.png")
            message.channel.sendEmbed(advert_embed);

  }
  
  if(command === "kick") {
    if(!message.member.roles.some(r=>["Admin", "Staff", "."].includes(r.name)) )
      return message.reply("Désolé mais vous n'avez pas les droits nécessaires pour utiliser cette commande.");
      console.log("kick refusé.")
    
    let member = message.mentions.members.first();
    if(!member)
      return message.reply("Veuillez s'il vous plait mentionner le nom d'un membre notable du serveur.");
    if(!member.kickable) 
      return message.reply("Je n'ai pas pu kick cette personne ! Son rôle lui procure peut être une immunité. Ou bien, vérifiez que j'ai bien les autorisations nécessaires à cette acton.");
    
    let reason = args.slice(1).join(' ');
    if(!reason)
      return message.reply("Veulliez s'il vous plait indiquer une raison pour le kick !");
    
    await member.kick(reason)
      .catch(error => message.reply(`Désolé ${message.author} Je n'ai pas pu kick car : ${error}`));
    message.reply(`${member.user.tag} à été expulsé par ${message.author.tag} pour : ${reason}`);
    console.log(`${member.user.tag} à été expulsé par ${message.author.tag} pour : ${reason}`)

  }
  
  if(command === "ban") {
    if(!message.member.roles.some(r=>["Admin", "."].includes(r.name)) )
      return message.reply("Désolé mais vous n'avez pas les droits nécessaires pour utiliser cette commande.");
      console.log("!Droits")
    
    let member = message.mentions.members.first();
    if(!member)
      return message.reply("Veuillez s'il vous plait mentionner le nom d'un membre notable du serveur.");
      console.log("!member")
    if(!member.bannable) 
      return message.reply("Je n'ai pas pu bannir cette personne ! Son rôle lui procure peut être une immunité. Ou bien, vérifiez que j'ai bien les autorisations nécessaires à cette action.");
      console.log("!bannable")

    let reason = args.slice(1).join(' ');
    if(!reason)
      return message.reply("Veulliez s'il vous plait indiquer une raison pour le ban !");
    
    await member.ban(reason)
      .catch(error => message.reply(`Désolé ${message.author} Je n'ai pas pu ban car : ${error}`));
    message.reply(`${member.user.tag} à été banni par ${message.author.tag} pour : ${reason}`);
    console.log(`${member.user.tag} à été banni par ${message.author.tag} pour : ${reason}`)
  }



  if(command === "forum") {
    message.channel.send(`Voici le forum : ${Forum}`)
    console.log("Forum")
  }

  if(command === "NTM") {
  	message.channel.send("Ferme ta gueule, on parle pas sur les mères ici OK !!!!")
  	console.log("NTM")
  }
});
