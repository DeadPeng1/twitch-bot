exports.run = (client, target, ctx, message, self, args, channel) => {
    client.say(target, `Hello, ${ctx['display-name']}!`)
}