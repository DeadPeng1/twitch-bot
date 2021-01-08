exports.run = (client, target, ctx, message, self, args) => {
    if (ctx.mod === true || ctx.username === 'deadpeng1'){
        client.say(target, `/clear`)
    } else {
        return
    }
}