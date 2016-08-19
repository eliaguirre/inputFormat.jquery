# inputFormat.jquery
un plugin sencillo y pequeño para darle formato de miles a los inputs en html
#Dependencias:
	+ jQuery

##Ejemplo:
en HTML
```
<input id="input-numero" type="text" >
<script>
        //init
	$("#input-numero").inputFormat();
        //get value
	$("#input-numero").inputFormat("value");
</script>
```
##opciones:
```javascript
$("#input-numero").inputFormat({
	miles:",",//caracter separador de miles
	decimales:".",//caracter separador de decimales
	num_decimales:2, //numero de decimales

});
```




