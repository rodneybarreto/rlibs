/**
 * Framework: RLIBS
 * Modulo...: util
 *
 * Parte integrante do framework RLIBS. Modulo com funcoes utilitarias.
 *
 * Requerido:
 *
 *     <script type="text/javascript" src="rlibs.js"></script>
 *
 * Inclua a tag script abaixo no arquivo '.html' desejado.
 *
 *     <script type="text/javascript" src="rlibs.util.js"></script>
 *
 * @author Rodney Barreto
 * @version v1.0.0 (25/06/2015)
 */
var RLIBS = RLIBS || {};

RLIBS.util = (function (app, global) {
  /**
   * Funcao para retorna um objeto mesclado a partir
   * de varios objetos.
   *
   * Exemplo:
   *
   *     RLIBS.util.mesclarObjetos(disciplina, turma);
   *
   * @param  {Object} Um ou mais objetos que serao mesclados.
   * @return {Object} Objeto mesclado contendo os atributos
   * 		   dos objetos passados como argumentos da funcao.
   */
  _objectsMerge = function () {
    var prop,
      child = {};
    try {
      for (var i = 0, ii = arguments.length; i < ii; i += 1) {
        for (prop in arguments[i]) {
          if (arguments[i].hasOwnProperty(prop)) {
            child[prop] = arguments[i][prop];
          }
        }
      }
      return child;
    } catch (e) {
      console.log('Erro: ' + e);
    }
  };

  /**
   * Funcao para retornar o intervalo de tempo entre
   * duas horas. Recebe, como parametros, duas strings
   * formatadas contendo a hora inicial e a hora final.
   *
   * Exemplo:
   *
   *   RLIBS.util.horaIntervalo('7:30', '11:30');
   *
   * @param  {String} String formatada 'HH:MM' contendo a hora inicial.
   * @param  {String} String formatada 'HH:MM' contendo a hora final.
   * @return {String} String formatada 'HH:MM' contendo o intervalo.
   */
  _hoursInterval = function (hmIni, hmFim) {
    let horaFim = new Date(),
      horaIni = new Date(),
      milsec = 0,
      interv = 0,
      hh = 0,
      mm = 0,
      hFim = 0,
      mFim = 0,
      hIni = 0,
      mIni = 0,
      hora = '',
      minu = '';

    try {
      hIni = parseInt(hmIni.split(':')[0], 10);
      if (hIni < 0 || hIni > 23)
        throw 'Hora inválida. Valores permitidos: 0 a 23';

      mIni = parseInt(hmIni.split(':')[1], 10);
      if (mIni < 0 || mIni > 59)
        throw 'Minuto inválido. Valores permitidos: 0 a 59';

      hFim = parseInt(hmFim.split(':')[0], 10);
      if (hFim < 0 || hFim > 23)
        throw 'Hora inválida. Valores permitidos: 0 a 23';

      mFim = parseInt(hmFim.split(':')[1], 10);
      if (mFim < 0 || hFim > 59)
        throw 'Minuto inválido. Valores permitidos: 0 a 59';

      horaIni.setHours(hIni, mIni);
      horaFim.setHours(hFim, mFim);

      milsec = horaFim.getTime();
      interv = milsec - horaIni.getTime();
      hh = Math.floor(interv / (1000 * 60 * 60));
      interv = interv - hh * (1000 * 60 * 60);
      mm = Math.floor(interv / (1000 * 60));

      hora = hh.toString().length < 2 ? '0' + hh.toString() : hh.toString();
      minu = mm.toString().length < 2 ? '0' + mm.toString() : mm.toString();

      return hora + ':' + minu;
    } catch (e) {
      console.log(e);
    }
  };

  /**
   * Funcao para inserir option em uma drop-dwon lists.
   * Recebe, como parametros, o elemento html drop-dwon,
   * o nome do atributo referente ao valor e o nome do
   * atributo referente ao texto exibido ao usuario.
   *
   * Exemplo:
   *
   *   RLIBS.util.inserirOpcaoDropDown(element, value, label);
   *
   * @param {Object} element Html que sera alterado.
   * @param {String} value Nome da propriedade que sera substituida por seu valor.
   * @param {String} label Nome da propriedade que sera substituida por seu valor.
   */
  _insertDropDownListOption = function (element, value, label) {
    let opt = document.createElement('option');
    opt.value = value;
    opt.text = label;
    try {
      element.add(opt, null);
    } catch (e) {
      // IE
      element.add(opt);
    }
    return this;
  };

  /**
   * Funcao para inserir options em uma drop-dwon lists.
   * Recebe, como parametros, o elemento html drop-dwon,
   * a lista de objetos contendo os dados que seram inseridos,
   * o nome do atributo referente ao valor, o nome do
   * atributo referente ao texto exibido ao usuario e,
   * por ultimo, um booleano opcional que indicara se o
   * valor e o texto seram concatenados para exibicao ao usuario.
   *
   * Exemplo:
   *
   *   RLIBS.util.inserirOpcoesDropDown(element, data, value, label, concat, extraLabel);
   *
   * @param {Object} element Html que sera alterado.
   * @param {Object} data Array de objetos contendo os valores.
   * @param {String} value Nome da propriedade que ficara dentro do atributo "value" da tag [option].
   * @param {String} label Nome da propriedade que sera exibida para o usuario.
   * @param {Boolean} concat Booleano para concatenar a exibicao do value com label separado por um traço (-).
   * @param {String} extraLabel Nome da propriedade que sera concatenada na exibicao do label ao usuario.
   */
  _insertDropDownListOptions = function (
    element,
    data,
    value,
    label,
    concat = false,
    extraLabel = ''
  ) {
    let property = null;

    try {
      if (typeof element === 'undefined' || typeof element === null)
        throw { message: 'Parâmetro [element] ausente.' };

      if (typeof data === 'undefined' || typeof data === null)
        throw { message: 'Parâmetro [data] ausente.' };

      if (typeof value === 'undefined' || typeof data === null)
        throw { message: 'Parâmetro [value] ausente.' };

      if (typeof label === 'undefined' || typeof data === null)
        throw { message: 'Parâmetro [label] ausente.' };

      for (let i = 0, ii = data.length; i < ii; i += 1) {
        property = data[i];
        if (concat) {
          if (extraLabel === '') {
            _insertDropDownListOption(
              element,
              property[value],
              property[value] + ' - ' + property[label]
            );
          } else {
            _insertDropDownListOption(
              element,
              property[value],
              property[value] +
                ' - ' +
                property[label] +
                ' - ' +
                property[extraLabel]
            );
          }
        } else {
          _insertDropDownListOption(element, property[value], property[label]);
        }
      }
    } catch (e) {
      console.log(e.message);
    }
    return this;
  };

  /**
   * Funcao para remover options em uma drop-dwon lists.
   * Recebe, como parametro, o elemento html drop-dwon
   * que sera alterado.
   *
   * Exemplo:
   *
   *   RLIBS.util.removerOpcoesDropDown(element);
   *
   * @param {Object} element Html que sera alterado.
   */
  _removeDropDownListOptions = function (element) {
    try {
      if (typeof element === 'undefined' || typeof element === null)
        throw { message: 'Parâmetro [element] ausente.' };

      for (let i = element.options.length - 1, ii = 0; i >= ii; i -= 1) {
        element.remove(i);
      }
    } catch (e) {
      console.log(e.message);
    }
    return this;
  };

  // Interface publica
  return {
    mesclarObjetos: _objectsMerge,
    horaIntervalo: _hoursInterval,
    insertDropDownListOption: _insertDropDownListOption,
    insertDropDownListOptions: _insertDropDownListOptions,
    removeDropDownListOptions: _removeDropDownListOptions
  };
})(RLIBS, this);
