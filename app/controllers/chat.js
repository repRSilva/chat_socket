module.exports.IniciaChat = function(app, req, res) {
  const dadosForm = req.body;
  req.assert("apelido", "Nome e/ou apelido é obrigatório!").notEmpty();
  req
    .assert("apelido", "Nome e/ou apelido deve conter entre 3 e 15 caracteres!")
    .len(3, 15);

  var error = req.validationErrors();

  if (error) {
    res.render("../views/index/index", { validacao: error });
  } else {
    res.render("../views/chat/chat", { dadosForm: dadosForm });

    app.get("io").emit("msgParaCliente", {
      apelido: dadosForm.apelido,
      mensagem: "acabou de entrar no chat"
    });
  }
};
