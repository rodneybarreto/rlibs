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
    var horaFim = new Date(),
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
  
  // Interface publica
  return {
    mesclarObjetos: _objectsMerge,
    horaIntervalo: _hoursInterval,
  };
})(RLIBS, this);
