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

    console.log(target)
    console.log(ctx)

    // command handler
    const args = message.slice(prefix.length).trim().split(' ');
    const cmd = args.shift().toLowerCase();
    try {
        let commandFile = require(`./Commands/${cmd}.js`)
        commandFile.run(client, target, ctx, message, self, args)
        
    } catch (error) {
        return
    }

});

client.on('cheer', (target, userstate, message) => {
    console.log(`${userstate.username} cheered ${userstate.bits} bits with message: "${message}"`)
    client.say(`${userstate['display-name']} cheered ${userstate.bits} bits with message: "${message}"`)
});

client.on('bits', (target, userstate, message) => {
    console.log(`${userstate.username} cheered ${userstate.bits} bits with message: "${message}"`)
    client.say(`${userstate.username} cheered ${userstate.bits} bits with message: "${message}"`)
});


