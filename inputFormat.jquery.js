
(function($) {
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
            var letras = "0123456789" + this.ifconfig.decimales;
            var especiales = [8, 37, 39, 46];
            var tecla_especial = false
            for (var i in especiales) {
                if (key == especiales[i]) {
                    tecla_especial = true;
                    break;
                }
            }
            var sep = this.value.split(this.ifconfig.decimales);
            var enteros = sep[0].replace(new RegExp(this.ifconfig.miles, 'g'), "");
            var decimales;
            if (this.value.indexOf(this.ifconfig.decimales) != -1) {
                var decimales = sep[1];
            }
            if (decimales) {
                if (decimales.length >= this.ifconfig.num_decimales)
                    return false;
            }
            if (letras.indexOf(tecla) == -1 && !tecla_especial || (this.value.indexOf(this.ifconfig.decimales) != -1 && tecla == this.ifconfig.decimales))
                return false;
            var formateado = "";
            var count = (tecla == this.ifconfig.decimales || this.value.indexOf(this.ifconfig.decimales) != -1 ? 0 : 1);
            for (var i = enteros.length - 1; i >= 0; i--) {
                if (count == 3) {
                    formateado = enteros[i] + this.ifconfig.miles + formateado;
                    count = 1;
                } else {
                    count++;
                    formateado = enteros[i] + formateado;
                }
            }
            if (this.value.indexOf(this.ifconfig.decimales) != -1) {
                this.value = formateado + this.ifconfig.decimales + decimales;

            } else {
                this.value = formateado;
            }
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
