require('dotenv/config')
require('./app')
console.log(`App Started`)

const tmi = require("tmi.js")
const channel = "deadpeng1"
const prefix = "!"

const config = {
    options: {
        debug: true
    },
    connection: {
        cluster: "aws",
        reconnect: true
    },
    identity: {
        username: "alivepeng1",
        password: "oauth:"+process.env.OAUTH
    },
    channels: [channel]
}

const client = new tmi.client(config)
client.connect()
    .then(() => {
        console.log("Connected to Chat")
    })
    .catch(() => {
        "Failed to connect to Twitch Chat"
    })

client.on("connected", (address, port) => {
    client.action(channel, `Connected to ${address}: ${port}`)
})

client.on("chat", (target, ctx, message, self) => {
    if (self) return;
    if (message === '-server stop' && ctx.username === channel){
        client.say(target, `Server Stopped by ${ctx['display-name']}`)
        throw new Error('Stopped by moderator.') 
    }
    console.log(target)
    console.log(ctx)

    // command handler
    const args = message.slice(prefix.length).trim().split(' ');
    const cmd = args.shift().toLowerCase();
    try {
        let commandFile = require(`./Commands/${cmd}.js`)
        commandFile.run(client, target, ctx, message, self, args, channel)
    } catch (error) {
        return
    }

});

client.on('cheer', (target, ctx, message) => {
    console.log(`${ctx.username} cheered ${ctx.bits} bits with message: "${message}"`)
    client.say(`${ctx['display-name']} cheered ${ctx.bits} bits with message: "${message}"`)
});

client.on('bits', (target, ctx, message) => {
    console.log(`${ctx.username} cheered ${ctx.bits} bits with message: "${message}"`)
    client.say(`${ctx.username} cheered ${ctx.bits} bits with message: "${message}"`)
});


