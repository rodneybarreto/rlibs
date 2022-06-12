/**
 * Framework: RLIBS
 * Modulo...: validate
 *
 * Parte integrante do framework RLIBS. Modulo para validacao de campos de formulario.
 *
 * Requerido:
 *
 *     <script type="text/javascript" src="rlibs.js"></script>
 *
 * Inclua a tag script abaixo no arquivo '.html' desejado.
 *
 *     <script type="text/javascript" src="rlibs.validate.js"></script>
 *
 * @author Rodney Barreto
 * @version v1.0 (25/06/2015)
 */
var RLIBS = RLIBS || {};

RLIBS.validate = (function (app, global) {
  /**
   * Funcao para verificar se uma determinada data e valida.
   *
   * Exemplo:
   *
   *     RLIBS.validate.validarData('29/02/2011');
   *
   * @param  {String} data no formato 'DD/MM/AAAA'.
   * @return {Boolean} true ou false.
   */
  _validateDate = function (data) {
    var regex =
        /((0[1-9])|(1[0-9])|(2[0-9])|(3[01])){1}\/((0[1-9])|(1[012])){1}\/((19[0-9]{2})|(2[0-9]{3})){1}/g,
      isValida = true,
      dia = 0,
      mes = 0,
      ano = 0;
    try {
      if (typeof data === 'undefined')
        throw {
          message: 'Parâmetro ausente.',
          example: '',
        };
      if (regex.test(data)) {
        dia = parseInt(data.substring(0, 2), 10);
        mes = parseInt(data.substring(3, 5), 10);
        ano = parseInt(data.substring(6, 10), 10);
        // Meses com 30 dias
        if ((mes === 4 || mes === 6 || mes === 9 || mes === 11) && dia > 30) {
          isValida = false;
        } else {
          // Ano nao bissexto
          if (ano % 4 !== 0 && mes === 2 && dia > 28) {
            isValida = false;
          } else {
            // Ano bissexto
            if (ano % 4 === 0 && mes === 2 && dia > 29) {
              isValida = false;
            }
          }
        }
      } else {
        isValida = false;
      }
      return isValida;
    } catch (e) {
      console.log('Erro: ' + e.message + '\n' + e.example);
    }
  };

  /**
   * Funcao para verificar se uma data e maior que outra.
   *
   * Exemplo:
   *
   *     RLIBS.validate.validarDataMaior('01/04/2015', '30/03/2015');
   *
   * @param  {String} Data no formato 'DD/MM/AAAA'.
   * @param  {String} Data no formato 'DD/MM/AAAA'.
   * @return {Boolean} true ou false.
   */
  _validateDateGreaterThan = function (dataA, dataB) {
    try {
      if (arguments.length < 2)
        throw {
          message: 'Forneça duas datas para a função.',
          example:
            'Exemplo de uso -> validarDataMaior("01/04/2015", "30/03/2015");',
        };
      if (!app.validate.validarData(dataA))
        throw {
          message: 'A data passada como primeiro parâmetro não é válida.',
          example:
            'Exemplo de uso -> validarDataMaior("01/04/2015", "30/03/2015");',
        };
      if (!app.validate.validarData(dataB))
        throw {
          message: 'A data passada como segundo parâmetro não é válida.',
          example:
            'Exemplo de uso -> validarDataMaior("01/04/2015", "30/03/2015");',
        };

      var _dtA = new Date(),
        _dtB = new Date(),
        _dd_dtA = parseInt(dataA.split('/')[0], 10),
        _mm_dtA = parseInt(dataA.split('/')[1], 10) - 1,
        _aa_dtA = parseInt(dataA.split('/')[2], 10),
        _dd_dtB = parseInt(dataB.split('/')[0], 10),
        _mm_dtB = parseInt(dataB.split('/')[1], 10) - 1,
        _aa_dtB = parseInt(dataB.split('/')[2], 10),
        isMaior = false;

      _dtA.setFullYear(_aa_dtA, _mm_dtA, _dd_dtA);
      _dtB.setFullYear(_aa_dtB, _mm_dtB, _dd_dtB);

      if (_dtA > _dtB) {
        isMaior = true;
      }
      return isMaior;
    } catch (e) {
      console.log('Erro: ' + e.message + '\n' + e.example);
    }
  };

  /**
   * Funcao para validar o numero de CPF.
   *
   * Exemplo:
   *
   *     RLIBS.validate.validarCPF('12345678901');
   *
   * @param  {String} String numerica, nao formatada de tamanho 11.
   * @return {Boolean} true ou false.
   */
  _validateCPF = function (cpf) {
    var erEquals =
        /(^0+$)|(^1+$)|(^2+$)|(^3+$)|(^4+$)|(^5+$)|(^6+$)|(^7+$)|(^8+$)|(^9+$)/g,
      nonNumbers = /\D/,
      a = [],
      b = 0,
      c = 11,
      i,
      x,
      y;
    try {
      if (typeof cpf === 'undefined')
        throw {
          message: 'Par�metro ausente.',
          example: '',
        };
      if (typeof cpf !== 'string')
        throw {
          message: 'O CPF deve ser passado como uma string numérica.',
          example: 'Exemplo de uso -> validarCPF("12345678901");',
        };

      if (cpf.length > 11) return false;

      if (nonNumbers.test(cpf)) return false;

      // Elimina CPFs invalidos conhecidos
      // Exemplo: 00000000000, 11111111111, 22222222222, ...
      if (erEquals.test(cpf)) return false;

      for (i = 0; i < 11; i++) {
        a[i] = cpf.charAt(i);
        if (i < 9) {
          b += a[i] * --c;
        }
      }
      if ((x = b % 11) < 2) {
        a[9] = 0;
      } else {
        a[9] = 11 - x;
      }
      b = 0;
      c = 11;
      for (y = 0; y < 10; y++) {
        b += a[y] * c--;
      }
      if ((x = b % 11) < 2) {
        a[10] = 0;
      } else {
        a[10] = 11 - x;
      }
      if (
        cpf.charAt(9) !== a[9].toString() ||
        cpf.charAt(10) !== a[10].toString()
      ) {
        return false;
      }
      return true;
    } catch (e) {
      console.log('Erro: ' + e.message + '\n' + e.example);
    }
  };

  /**
   * Funcao para validar o numero de CNPJ
   *
   * Exemplo:
   *
   *     RLIBS.validate.validarCNPJ('12345678901234');
   *
   * @param  {String} String numerica, nao formatada de tamanho 14.
   * @return {Boolean} true ou false.
   */
  _validateCNPJ = function (cnpj) {
    var erEquals =
        /(^0+$)|(^1+$)|(^2+$)|(^3+$)|(^4+$)|(^5+$)|(^6+$)|(^7+$)|(^8+$)|(^9+$)/g,
      nonNumbers = /\D/,
      i = 0,
      tamanho = 0,
      numeros = 0,
      digitos = 0,
      soma = 0,
      pos = 0,
      resultado = 0;
    try {
      if (typeof cnpj === 'undefined')
        throw {
          message: 'Parâmetro ausente.',
          example: '',
        };
      if (typeof cnpj !== 'string')
        throw {
          message: 'O CNPJ deve ser passado como uma string numérica.',
          example: 'Exemplo de uso -> validarCNPJ("12345678901234");',
        };

      if (cnpj.length > 14) return false;

      if (nonNumbers.test(cnpj)) return false;

      // Elimina CNPJs invalidos conhecidos
      // Exemplo: 00000000000000, 11111111111111, 22222222222222, ...
      if (erEquals.test(cnpj)) return false;

      // Valida DVs
      tamanho = cnpj.length - 2;
      numeros = cnpj.substring(0, tamanho);
      digitos = cnpj.substring(tamanho);
      soma = 0;
      pos = tamanho - 7;
      for (i = tamanho; i >= 1; i--) {
        soma += numeros.charAt(tamanho - i) * pos--;
        if (pos < 2) {
          pos = 9;
        }
      }
      resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
      if (resultado.toString() !== digitos.charAt(0)) {
        return false;
      }
      tamanho = tamanho + 1;
      numeros = cnpj.substring(0, tamanho);
      soma = 0;
      pos = tamanho - 7;
      for (i = tamanho; i >= 1; i--) {
        soma += numeros.charAt(tamanho - i) * pos--;
        if (pos < 2) {
          pos = 9;
        }
      }
      resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
      if (resultado.toString() !== digitos.charAt(1)) {
        return false;
      }
      return true;
    } catch (e) {
      console.log('Erro: ' + e.message + '\n' + e.example);
    }
  };

  /**
   * Funcao para validar o numero de CNPJ/CPF
   *
   * Exemplo:
   *
   *     RLIBS.validate.validarCNPJCPF('12345678901234');
   *
   * @param  {String} String numerica, nao formatada de tamanho 11 ou 14.
   * @return {Boolean} true ou false.
   */
  _validateCNPJCPF = function (arg) {
    switch (arg.length) {
      case 14:
        return _validateCNPJ(arg);
      case 11:
        return _validateCPF(arg);
      default:
        return false;
    }
  };
  
  // Interface publica
  return {
    validarData: _validateDate,
    validarDataMaior: _validateDateGreaterThan,
    validarCPF: _validateCPF,
    validarCNPJ: _validateCNPJ,
    validarCNPJCPF: _validateCNPJCPF,
  };
})(RLIBS, this);
