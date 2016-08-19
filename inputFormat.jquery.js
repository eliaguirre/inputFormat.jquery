(function ($) {
    'use strict'
    $.fn.inputFormat = function (opt) {
        if (typeof opt == "string") {
            switch (opt) {
                case "value":
                    var val;
                    this.each(function () {
                        val = parseFloat(this.value.replace(new RegExp(this.ifconfig.miles, 'g'), ""));
                    });
                    return val;
                    break;
                case "format":
                    this.each(function () {
                        var val = parseFloat(this.value) + "";
                        if (val != undefined && val != null && val != "") {
                            var sep = val.split(this.ifconfig.decimales);
                            var enteros = sep[0].replace(new RegExp(this.ifconfig.miles, 'g'), "");
                            var decimales = "00";
                            if (sep[1]) {
                                decimales = sep[1].length == 1 ? sep[1] + "0" : sep[1];
                            }
                            var formateado = "";
                            var count = 0;
                            for (var i = enteros.length - 1; i >= 0; i--) {
                                if (count === 3) {
                                    formateado = enteros[i] + this.ifconfig.miles + formateado;
                                    count = 1;
                                } else {
                                    count++;
                                    formateado = enteros[i] + formateado;
                                }
                            }
                            if (val.indexOf(this.ifconfig.decimales) !== -1) {
                                formateado = formateado + this.ifconfig.decimales + decimales;
                            }
                        }
                        this.value = formateado;
                    });
                    break;
            }
            return this;
        } else {
            return this.each(function () {
                this.ifconfig = methods.extend(opt, optDefault);
                $(this).css({
                    "text-align": "right",
                });
                $(this).on("keypress", methods.format);
            });
        }
    };
    var methods = {
        format: function (e) {
            var key = e.keyCode || e.which;
            var tecla = String.fromCharCode(key).toLowerCase();
//            console.log(this.ifconfig);
            var letras = "0123456789" + this.ifconfig.decimales;
            var especiales = [8, 37, 39, 46];
            var cursor = this.selectionStart;
            var tecla_especial = false
            for (var i in especiales) {
                if (key == especiales[i]) {
                    tecla_especial = true;
                    break;
                }
            }
            if (this.selectionStart !== this.selectionEnd) {
                var numero = this.value.slice(0, this.selectionStart) + tecla + this.value.slice(this.selectionEnd);
            } else if (this.selectionStart === 0 && this.selectionEnd === this.value.length - 1) {
                this.value = "";
                var numero = tecla;
            } else {
                var numero = this.value.slice(0, cursor) + tecla + this.value.slice(cursor);
            }
            var sep = numero.split(this.ifconfig.decimales);
            var comas = methods.countComas(this.value, cursor, this.ifconfig.miles);
            var enteros = sep[0].replace(new RegExp(this.ifconfig.miles, 'g'), "");
            var decimales;
            if (numero.indexOf(this.ifconfig.decimales) !== -1) {
                var decimales = sep[1];
            }
            if (decimales) {
                if (decimales.length >= this.ifconfig.num_decimales + 1
                        && (this.selectionStart === this.selectionEnd && this.selectionStart >= this.value.length - decimales)) {
                    return false;
                }
            }
            if (letras.indexOf(tecla) === -1 && !tecla_especial || (this.value.indexOf(this.ifconfig.decimales) !== -1 && tecla == this.ifconfig.decimales))
                return false;
            var formateado = "";
            var count = 0;
            for (var i = enteros.length - 1; i >= 0; i--) {
                if (count === 3) {
                    formateado = enteros[i] + this.ifconfig.miles + formateado;
                    count = 1;
                } else {
                    count++;
                    formateado = enteros[i] + formateado;
                }
            }
            if (numero.indexOf(this.ifconfig.decimales) !== -1) {
                formateado = formateado + this.ifconfig.decimales + decimales;
            }
            comas = comas - methods.countComas(formateado, cursor, this.ifconfig.miles);
            cursor = cursor - comas;
            formateado = formateado.slice(0, cursor) + formateado.slice(cursor + 1);
            this.value = formateado;
            this.selectionEnd = cursor;
            this.selectionStart = cursor;
        },
        countComas: function (string, cursor, separador) {
            var c = 0;
            for (var i = 0; i <= cursor && i < string.length; i++) {
                if (separador == string[i]) {
                    c++;
                }
            }
            return c;
        },
        extend: function (toObj, fromObj) {
            toObj = toObj || {};
            Object.keys(fromObj).forEach(function (key) {
                if (!(key in toObj)) {
                    toObj[key] = fromObj[key];
                }
            });
            return toObj;
        }
    };
    var optDefault = {
        miles: ",",
        decimales: ".",
        num_decimales: 2
    };
})(jQuery);