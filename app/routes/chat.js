module.exports = function (app) {
    app.post('/chat', function (req, res) {
        app.app.controllers.chat.IniciaChat(app, req, res);
    });

    app.get('/chat', function (req, res) {
        app.app.controllers.chat.IniciaChat(app, req, res);
    });
}