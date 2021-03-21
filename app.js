//Cria a tabela; Espera um objeto para percorrer a rendereizar o conteúdo
function createTable(json) {
    let cols = Object.keys(json[0]);
    let headerRow = cols
        .map(col => `<th>${col}</th>`)
        .join("");

    let rows = json.map(row => {
        let tds = cols.map(col => `<td>${row[col]}</td>`).join("");
        return `<tr>${tds}</tr>`;
    })
        .join("");

    //Constrói a tabela
    const table = `
      <table class="table is-centered has-text-centered tableCep">
          <thead>
              <tr>${headerRow}</tr>
          <thead>
          <tbody>
              ${rows}
          <tbody>
      <table>`;
    return table;
}





//Função onlcick que faz a chamada a api passando o valor do input
function getResponse() {
    elInput = document.querySelector('#input').value;
    document.querySelector('#content').removeAttribute("style");
    elInput = elInput.split('-');//Divide o input para fazer a query na Api
    city = elInput[0]
    state = elInput[1]
    if (isNaN(elInput)) { //Verifica se o valor do input é um número
        axios.get(`https://viacep.com.br/ws/${state}/${city}/Rua/json/`)
            .then(function (res) {
                res = res.data;
                list = [];
                for (var i = 0; i < res.length; i++) {
                    data = {
                        Logradouro: res[i].logradouro,
                        Bairro: res[i].bairro,
                        Localidade: `${res[i].localidade}/${res[i].uf}`,
                        Cep: res[i].cep
                    }
                    list.push(data);

                }


                output = document.getElementById('output');
                output.innerHTML = createTable(list);
            })
            .catch(function (err) {
                getError()
            })
    }
    else {
        axios.get(`https://viacep.com.br/ws/${elInput}/json`)

            .then(function (res) {
                res = res.data;
                if (res.hasOwnProperty('erro')){
                    getError()
                }
                else{
                    list = [];
                    data = {
                        Logradouro: res.logradouro,
                        Bairro: res.bairro,
                        Localidade: `${res.localidade}/${res.uf}`,
                        Cep: res.cep
                    }
                    list.push(data)
                    output = document.getElementById('output');
                    output.innerHTML = createTable(list);
                }    

            })
            .catch(function (err) {
                getError()
            })
    }


}

//Renderiza erro
function getError() {
    output = document.querySelector('#output');
    output.innerHTML = '<p class="notification is-danger">Falha ao fazer a consulta, verifique se o campo está preenchido corretamente</p>';
}