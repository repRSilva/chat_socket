//Importar confs do server
const app = require("./config/server");
//Parametrizar porta para receber requisições
const server = app.listen(80, function() {
  console.log("Servidor On");
});
//Parametrizar porta/server para receber requisições via socket
const io = require("socket.io").listen(server);

//Criar variável global para o socket
app.set("io", io);

//Criando conexão com o socket
io.on("connection", function(socket) {
  //Método connection indica que um usuário se conectou no socket
  console.log("User connect");
  //Método disconnect indica que um usuário se conectou no socket
  socket.on("disconnect", function() {
    console.log("User disconnect");
  });

  //Método que que recebe uma mensagem de
  socket.on("msgParaServidor", function(data) {
    //Envio de mensagem para o cliente que enviou a mensagem
    socket.emit("msgParaCliente", {
      apelido: data.apelido,
      mensagem: data.mensagem
    });
    //Envio de mensagem para todos os usuários conectados no socket
    socket.broadcast.emit("msgParaCliente", {
      apelido: data.apelido,
      mensagem: data.mensagem
    });

    if (parseInt(data.apelidoAtualizado) == 0) {
      //Atualizando os participantes do chat
      socket.emit("AtualizaParticipantes", {
        apelido: data.apelido
      });
      //Envio de mensagem para todos os usuários conectados no socket
      socket.broadcast.emit("AtualizaParticipantes", {
        apelido: data.apelido
      });
    }
  });
});
