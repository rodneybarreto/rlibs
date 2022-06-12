/**
 * Framework: RLIBS
 *
 *     Namespace criado para padronizar as chamadas de funcoes utilitarias comuns.
 *     A padronizacao evita a criacao de codigos duplicados na aplicacao e possibilita a
 *     reutilizacao de codigos estaveis.
 *
 * Inclua a tag script abaixo no arquivo '.html' desejado.
 *
 *     <script type="text/javascript" src="rlibs.js"></script>
 *
 * Entenda a nomenclatura de divisao dos modulos e funcoes do namespace.
 *
 *     RLIBS.validate.validarData('29/02/2011');
 *
 *     |RLIBS.
 *     |----|validate.
 *     |----|--------|validarData
 *
 *     Namespace: RLIBS
 *     Modulo...: validate
 *     Funcao...: validarData
 *
 * Utilizando este namespace, as funcoes nao ficarao soltas no contexto javascript
 * conflitando com outras funcoes de outras aplicacoes.
 *
 * Algumas regras:
 *
 *     - Ao escrever neste arquivo use apenas javascript puro;
 *     - Use o modo estrito para comparacoes em vez de '==' use '===' ou '!=' use '!==', isso
 *       garente a comparacao do tipo e do valor da variavel.
 *     - Finalize as linhas com ponto e virgula;
 *
 * Sinta-se a vontade para contribuir, mas caso queira fazer isso, atente para a padronizacao
 * de identacao e comentarios. Lembre-se, um codigo legivel sera mais facilmente entendido.
 *
 * @author Rodney Barreto
 * @version v1.0.0 (25/06/2015)
 */
var RLIBS = RLIBS || {};

/**
 * Funcao namespace para habilitar modulos especificos.
 *
 * Descricao:
 *
 *     Caso existam muitas chamadas a um determinado modulo do namespace RLIBS
 *     dentro do codigo, e possivel substitui-las por uma chamada unica
 *     retornando o modulo especificado para uma variavel local. A partir dessa
 *     chamada, todos as funcoes daquele modulo estarao disponiveis na variavel
 *     especificada.
 *
 * Exemplo:
 *
 *     Em vez de utilizar muitas chamadas como esta no codigo
 *
 *         RLIBS.validate.validarData('29/02/2011');
 *
 *     Subistitua por uma variavel local
 *
 *         var local = RLIBS.namespace('RLIBS.validate');
 *         local.validarData('29/02/2011');
 *
 *     ou utilize uma variacao menor, passando apenas o nome do modulo
 *     como argumento da funcao
 *
 *         var local = RLIBS.namespace('validate');
 *         local.validarData('29/02/2011');
 *
 *     ou ainda
 *
 *         var local = RLIBS.validate;
 *         local.validarData('29/02/2011');
 *
 *
 * @param  {String} String contendo o nome do modulo que sera chamado.
 * @return {Object} Objeto contendo todas as funcoes do modulo chamado.
 */
RLIBS.namespace = function (ns) {
  var parts = ns.split('.'),
    parent = RLIBS;
  if (parts[0] === 'RLIBS') {
    parts = parts.slice(1);
  }
  for (var i = 0, ii = parts.length; i < ii; i += 1) {
    if (typeof parent[parts[i]] === 'undefined') {
      parent[parts[i]] = {};
    }
    parent = parent[parts[i]];
  }
  return parent;
};

/**
 * Funcao para carregar modulos dinamicamente.
 *
 * Exemplo:
 *
 *     Insira no seu codigo a chamada da funcao abaixo especificando o arquivo js
 *     desejado.
 *
 *     RLIBS.require('rlibs.validate.js');
 *
 *     Esta funcao tambem suporta a execucao de uma funcao de callback apos o
 *     carregamento do script.
 *
 *     RLIBS.require(
 *         'rlibs.validate.js',
 *         function(){
 *             minhaFuncaoQualquer();
 *             var teste = RLIBS.validate.validarData('29/02/2011');
 *             console.log(teste);
 *         }
 *     );
 *
 * @param  {String} nome do script que sera carregado.
 * @return {Function} funcao de callback que sera executada a pos o carregamento. A funcao
 *         poderar conter chamadas de funcoes do modulo ou do seu proprio codigo.
 */
RLIBS.require = function (file, callback) {
  var script = document.getElementsByTagName('script')[0],
    newjs = document.createElement('script');
  // IE
  newjs.onreadystatechange = function () {
    if (newjs.readyState === 'loaded' || newjs.readyState === 'complete') {
      newjs.onreadystatechange = null;
      if (typeof callback !== 'undefined') {
        if (typeof callback === 'function') {
          callback();
        }
      }
    }
  };
  // Outros browsers
  newjs.onload = function () {
    if (typeof callback !== 'undefined') {
      if (typeof callback === 'function') {
        callback();
      }
    }
  };
  newjs.src = file;
  script.parentNode.insertBefore(newjs, script);
};
