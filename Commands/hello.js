exports.run = (client, target, ctx, message, self, args) =>{
    client.say(target, `Hello, ${ctx['display-name']}!`)
}