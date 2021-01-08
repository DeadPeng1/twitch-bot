exports.run = (client, target, ctx, message, self, args) =>{
    client.ping().then(function(data) {
        let ping = Math.floor(Math.round(data*1000))
    client.say(target, `@${ctx["display-name"]}, your ping is ${ping}ms`)
    })
}