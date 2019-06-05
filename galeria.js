$(evento);

function sendReqPost(obj) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 201) {
         alert("Animal cadastrado");
         window.location.reload();
      }
    };
  xhttp.open("POST", "https://yesod-tycosta.c9users.io/animal", true);
  xhttp.setRequestHeader("Content-Type","application/json");
  //necessario converter objeto para string
  xhttp.send(JSON.stringify(obj));
}



function evento(){
    $("btn-cadanimal").click(function(){
        var nome = $("#nome").val();
        var tipo = $("#tipo").val();
        var raca = $("#raca").val();
        var sexo = $("#sexo").val();
        var idade = parseInt($("#idade").val());
        
        sendReqPost({"nome":nome,"tipo":tipo,"raca":raca,"sexo":sexo,"idade":idade});
    });
    sendReq();
}

function montaPagina(obj){
    var tabela = "<table> <thead> <tr> <th> NOME </th> <th> ESPÉCIE </th> <th> RAÇA </th> <th> SEXO </th> <th> IDADE </th> </tr> </thead> <tbody>";
    obj.resp.forEach(function(reg){
        tabela = tabela + "<tr> <td> " + reg.nome + "</td> <td> " + reg.tipo +  "</td> <td> " + reg.raca + "</td> <td> " + reg.sexo + "</td> <td> " + reg.idade + "</td> </tr>";
    });
    tabela += "</tbody> </table>";
    $(".lista").append(tabela);
}

function sendReq() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
         var objResp = JSON.parse(this.responseText);
         montaPagina(objResp);
      }
    };
  xhttp.open("GET", "https://yesod-tycosta.c9users.io/animais", true);
  xhttp.setRequestHeader("Content-Type","application/json");
  xhttp.send();
}



