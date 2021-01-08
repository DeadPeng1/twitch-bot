exports.run = (client, target, ctx, message, self, args, channel) => {
    if (ctx.mod === true || ctx.username === channel){
        client.say(target, `/clear`)
    } else {
        return
    }
}