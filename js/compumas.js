function showRegisterForm() {
    $(".preguntaBox").fadeOut();
    $('.loginBox').fadeOut('fast', function () {
        $('.registerBox').fadeIn('fast');
        $('.login-footer').fadeOut('fast', function () {
            $('.register-footer').fadeIn('fast');
            $('.login-pregunta').fadeOut('fast');
        });
        $('.modal-title').html('SUMATE YA A COMPUMAS');
    });
}

function showLoginForm() {
    $(".preguntaBox").fadeOut();
    $('#compumasModal .registerBox').fadeOut('fast', function () {
        $('.loginBox').fadeIn('fast');
        $('.register-footer').fadeOut('fast', function () {
            $('.login-footer').fadeIn('fast');
            $('.login-pregunta').fadeOut('fast');
        });

        $('.modal-title').html('Pagar con Compumas');
    });
}


var modal = document.getElementById("compumasModal");
var btn = document.getElementById("btnModal");
var span = document.getElementsByClassName("close-modal")[0];
var body = document.getElementsByTagName("body")[0];

$("#btnModal").on("click", function(){
	modal.style.display = "block";
    body.style.position = "static";
    body.style.height = "100%";
    body.style.overflow = "hidden";
});


$(".close-modal").on("click", function(){
	modal.style.display = "none";
    body.style.position = "inherit";
    body.style.height = "auto";
    body.style.overflow = "visible";
});


window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";

        body.style.position = "inherit";
        body.style.height = "auto";
        body.style.overflow = "visible";
    }
}

function abrirModal() {
    modal.style.display = "block";

    body.style.position = "static";
    body.style.height = "100%";
    body.style.overflow = "hidden";
}

function cerrarModal() {
    modal.style.display = "none";

    body.style.position = "inherit";
    body.style.height = "auto";
    body.style.overflow = "visible";
}


$("#btn-upload-1").on("change", function () {
    if (
        this.files &&
        this.files[0] &&
        this.files[0].name.match(/\.(jpg|jpeg|png)$/)
    ) {
        $("#preview-pict-1").attr("src", window.URL.createObjectURL(this.files[0]));

        $("#preview-pict-1").on("load", function () {
            var image = document.getElementById("preview-pict-1");

            $("#canvas-area-1").css("border", "none");
            $("#canvas-area-1").attr("width", image.width);
            $("#canvas-area-1").attr("height", image.height);

            var canvas = document.getElementById("canvas-area-1");
            var ctx = canvas.getContext("2d");

            ctx.drawImage(image, 0, 0, image.width, image.height);

            var canvas = document.getElementById("canvas-area-1");
            var dataURL = canvas.toDataURL();
            $("#textarea-1").val(dataURL);
        });
    }
});

$("#btn-upload-2").on("change", function () {
    if (
        this.files &&
        this.files[0] &&
        this.files[0].name.match(/\.(jpg|jpeg|png)$/)
    ) {
        $("#preview-pict-2").attr("src", window.URL.createObjectURL(this.files[0]));

        $("#preview-pict-2").on("load", function () {
            var image = document.getElementById("preview-pict-2");

            $("#canvas-area-2").css("border", "none");
            $("#canvas-area-2").attr("width", image.width);
            $("#canvas-area-2").attr("height", image.height);

            var canvas = document.getElementById("canvas-area-2");
            var ctx = canvas.getContext("2d");

            ctx.drawImage(image, 0, 0, image.width, image.height);

            var canvas = document.getElementById("canvas-area-2");
            var dataURL = canvas.toDataURL();
            $("#textarea-2").val(dataURL);
        });
    }
});


$("#btn-upload-3").on("change", function () {
    if (
        this.files &&
        this.files[0] &&
        this.files[0].name.match(/\.(jpg|jpeg|png)$/)
    ) {
        $("#preview-pict-3").attr("src", window.URL.createObjectURL(this.files[0]));

        $("#preview-pict-3").on("load", function () {
            var image = document.getElementById("preview-pict-3");

            $("#canvas-area-3").css("border", "none");
            $("#canvas-area-3").attr("width", image.width);
            $("#canvas-area-3").attr("height", image.height);

            var canvas = document.getElementById("canvas-area-3");
            var ctx = canvas.getContext("2d");

            ctx.drawImage(image, 0, 0, image.width, image.height);

            var canvas = document.getElementById("canvas-area-3");
            var dataURL = canvas.toDataURL();
            $("#textarea-3").val(dataURL);
        });
    }
});

$("#form_id").on("submit", function (e) {
    e.preventDefault();
    var foto1 = $("#textarea-1").val();
  
    if (foto1==""){
      $('#btn-upload-1').parent().append("<span id='error-falta' class='name-file' style='color: red;'>* Debes adjuntar tu cedula (imagen JPG o PNG)</span>");
      setTimeout(function(){ $("#error-falta").remove(); }, 4000);
    }else{
      //var f = $(this);
      //var formData = new FormData(document.getElementById("form_id"));
      
      //var foto2 = $("#textarea-2").val();
      //var foto3 = $("#textarea-3").val();
  
      //formData.append("textarea-1", foto1);
      //formData.append("textarea-2", foto2);
      //formData.append("textarea-3", foto3);
      parametro = {"textarea-1": foto1};
      console.log(parametro);
  
      $.ajax({
          headers: {
            "Accept": "*",
            "Content-Type": "application/json"
          }, 	
          type: "POST",
          url: "https://compu.innew.com.ar/save-fotos.php",
          dataType: "html",
          //data: formData,
          data: parametro,
          cache: false,
          //contentType: false,
          processData: false,
          success: function (data) {
              console.log(data);
              $("#salida").val(data);
              if (data != "error al subir un pdf") {
                  console.log("Comprobantes enviados con exito!");
  
                  var salida = $("#salida").val();
                  console.log("Salida: ", salida);
                
                  registro_compumas();
  
              } else {
                  alert("Se debe subir archivos de tipo png, jpg o pdf menores a 1Mb!");
              }
          },
      });
    }
});


function registro_compumas() {
    console.log("entro en la funcion registro compumas");

    const dataCM = {
        "nombre": $("#nombre").val(),
        "apellido": $("#apellido").val(),
        "email": $("#correo").val(),
        "telefono": $("#telefono").val(),
        "comprobantes": $("#salida").val()
    }
    console.log(dataCM)

    createCompumas(dataCM)
        .then(async function (response) {
            console.log(response)
            clearForm()
			goCheckout()
        })
        .catch(e => {
            console.error(e)
            alert("ERROR. ALGO SALIO MAL")
            clearForm()
        })
}


function createCompumas(dataCM) {
    return new Promise((res, rej) => {
        $.ajax({
            headers: {
                "Accept": "application/vnd.vtex.ds.v10+json",
                "Content-Type": "application/json"
            },
            data: JSON.stringify(dataCM),
            type: 'PATCH',
            url: "/api/dataentities/CM/documents/",
            success: function (data) {
                console.log("COMPUMAS correcta", data);
                res(data)
            },
            error: function (e) {
                console.error(e);
                rej(e)
            }
        });
    })
}

function clearForm() {
    $("#nombre").val("")
    $("#apellido").val("")
    $("#telefono").val("")
    $("#correo").val("")
    $("#btn-upload-1").val("")
    $("#btn-upload-2").val("")
    $("#btn-upload-3").val("")
}

$("#ir-compumas-old").on("click", function (e) {
    e.preventDefault();
    var url = $(".buy-button-ref").attr("href") + "&compumas=true";
    var utm = "compumas";
    return new Promise((res, rej) => {
        vtexjs.checkout.getOrderForm()
            .then(function (orderForm) {
                let marketingData = orderForm.marketingData;
                console.log("marketingData antes del cambio", marketingData)
                if (marketingData == null) {
                    marketingData = {
                        "utmSource": utm,
                        "utmMedium": null,
                        "utmCampaign": null,
                        "utmipage": "",
                        "utmiPart": "",
                        "utmiCampaign": "",
                        "coupon": null,
                        "marketingTags": []
                    }
                } else {
                    marketingData.utmSource = utm;
                }
                console.log("marketingData despeus del cambio", marketingData)
                return vtexjs.checkout.sendAttachment('marketingData', marketingData)
            }).done(function (orderForm) {
                console.log("termino de enviar los datos")
                res(orderForm)
                window.location = url
            })
    })
})

function selector() {
    var total = parseInt($(".skuBestPrice").html().replace("Gs", "").replace(".", "").replace(".", "").trim());
  	
  	console.log("Numero antes de formateo: " + total);
  	
    var cuota6 = formateo((total * 1.13) / 6);
    var cuota12 = formateo((total * 1.73) / 12);
    var cuota15 = formateo((total * 1.75) / 15);
    var cuota18 = formateo((total * 1.91) / 18);

    $("#cseis").attr("monto", cuota6);
    $("#cdoce").attr("monto", cuota12);
    $("#cquince").attr("monto", cuota15);
    $("#cdocho").attr("monto", cuota18);
    $("#val-imp").html(cuota6);
}

function formateo(num) {
    if (!num || num == 'NaN') return '-';
    if (num == 'Infinity') return '&#x221e;';
  
    num = num.toString().replace(/\$|\,/g, '');
  
    if (isNaN(num)) num = "0";
  
    sign = (num == (num = Math.abs(num)));
    num = Math.floor(num * 100 + 0.50000000001);
    cents = num % 100;
    num = Math.floor(num / 100).toString();
   
    if (cents < 10) cents = "0" + cents;
  
    for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++)
        num = num.substring(0, num.length - (4 * i + 3)) + '.' + num.substring(num.length - (4 * i + 3));
  
    //return (((sign) ? '' : '-') + num + ',' + cents);
  	return (((sign) ? '' : '-') + num);
}

$("#selectorcuota").change(function () {
    var pasar = $("#selectorcuota option:selected").attr("monto");
    $("#val-imp").html(pasar)
});



function goCheckout() {
    var url = $(".buy-button-ref").attr("href");
    var utm = "compumas";
    return new Promise((res, rej) => {
        vtexjs.checkout.getOrderForm()
            .then(function (orderForm) {
                let marketingData = orderForm.marketingData;
                console.log("marketingData antes del cambio", marketingData)
                if (marketingData == null) {
                    marketingData = {
                        "utmSource": utm,
                        "utmMedium": null,
                        "utmCampaign": null,
                        "utmipage": "",
                        "utmiPart": "",
                        "utmiCampaign": "",
                        "coupon": null,
                        "marketingTags": []
                    }
                } else {
                    marketingData.utmSource = utm;
                }
                console.log("marketingData despeus del cambio", marketingData)
                return vtexjs.checkout.sendAttachment('marketingData', marketingData)
            }).done(function (orderForm) {
                console.log("termino de enviar los datos")
                res(orderForm)
       			alert("Continuar y finalizar mi compra pagando con CompuMAS")
                window.location = url
            })
    })
}

function cargarMensaje(mensaje) {
    setTimeout(function () {
        console.log("se ejecuto el setTimeout");
        vtexjs.checkout
            .getOrderForm()
            .then(function (orderForm) {
                return vtexjs.checkout.sendAttachment("openTextField", {
                    value: mensaje,
                });
            })
            .done(function (orderForm) {
                console.log("Opciones: ", orderForm.openTextField);
                goCheckout();
            });
    }, 700);
}



$("#soycompumas").on("submit", function (e) {
    e.preventDefault();
    var idcompu = $("#numci").val();
    var telcompu = $("#numtel").val();
    var cuocompu = $("#selectorcuota option:selected").html();
    var valorcuota = $("#val-imp").html();

    var mensaje = "id: " + idcompu + " | celular: " + telcompu + " | n° cuotas: " + cuocompu + " | valor cuota: Gs." + valorcuota;

    console.log(mensaje);

    cargarMensaje(mensaje);
});


$(window).on("load", function () {
	selector();
	$('input[type=file]').change(function(){
        var filename = $(this).val().split('\\').pop();
        var idname = $(this).attr('id');
        $('#'+idname).parent().append("<span class='name-file'>"+filename+"</span>");
    });
    $('.input-number').on('input', function () { 
   		 this.value = this.value.replace(/[^0-9]/g,'');
	});
  
});





