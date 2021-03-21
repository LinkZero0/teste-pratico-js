Como utilizar:
    Execute o arquivo index.html

Observações:
Como citado no item 5 na seção de Requisitos obrigatórios:
>"A aplicação deve permitir a consulta de CEP pela sigla do estado e cidade, exemplo MT Cáceres"

   Porém é dito na documentação da API ViaCep:
>[...]Para consultar um CEP na base de dados são necessários três parâmetros obrigatórios (UF, Cidade e Logradouro)

Sendo assim, a requisição adiciona um novo parâmetro (logradouro), que utiliza o nome "Rua", que está presente em todos os logradouros