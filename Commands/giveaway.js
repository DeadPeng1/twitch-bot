const { writeFile } = require("fs");

exports.run = (client, target, ctx, message, self, args, channel) => {
    var now = Date().slice(0, 10)
    var give = true
    const giveawayMsg = ``
    switch (giveaway) {
        case give === false:
            client.say(target, `There is currently no ongoing giveaway`)
            break;

        case give === true && args[0] != 'enter':
            client.say(target, giveawayMsg)
            break;

        case give === true && args[0] === 'enter':
            client.say(target, `You have been entered into the giveaway`)

            writeFile('../giveaway/giveaway.txt', `${ctx.username} ${now}`, (error) => {
                if (error) throw err;
            })
            break;
    }
}