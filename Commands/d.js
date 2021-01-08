const random = require('random')
exports.run = (client, target, ctx, message, self, args, channel) => {
    try {
        var dice = parseInt(args[0])
        client.say(target, `You rolled a ${random.int(1, dice)}`)

    } catch (error) {
        client.say(target, `"${args[0]}" is not an integer above 0. Please try again.`)
    }
}