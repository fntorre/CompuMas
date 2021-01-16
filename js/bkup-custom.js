// WARNING: THE USAGE OF CUSTOM SCRIPTS IS NOT SUPPORTED. VTEX IS NOT LIABLE FOR ANY DAMAGES THIS MAY CAUSE. THIS MAY BREAK YOUR STORE AND STOP SALES. IN CASE OF ERRORS, PLEASE DELETE THE CONTENT OF THIS SCRIPT.

function ocultaDisclaimer() {
    $("#disclaimerCuotas").css("display", "none");
  }
  
  function locationHashChanged() {
    if (location.hash === "#/payment") {
      setTimeout(function () {
         verCompu();
         if ($(".shp-summary-group-title.vtex-omnishipping-1-x-SummaryItemTitle").html()
             == "Recoger en la tienda"){
             $("#payment-group-custom201PaymentGroupPaymentGroup").css("display","block");
           console.log("si");
         }else{
              $("#payment-group-custom201PaymentGroupPaymentGroup").css("display","none");
            console.log("no");
         }   	
      }, 2000);
      
      setTimeout(function () {
        if (
          $("#ship-city").val() == "Asunción___1119" ||
          $(".city").first().html() == "Asunción" ||
          $("#ship-city").val() == "San Lorenzo___2160" ||
          $(".city").first().html() == "San Lorenzo" ||
          $("#ship-city").val() == "Luque___2060" ||
          $(".city").first().html() == "Luque" ||
          $("#ship-city").val() == "Fernando De La Mora___2300" ||
          $(".city").first().html() == "Fernando De La Mora" ||
          $("#ship-city").val() == "Lambare___2420" ||
          $(".city").first().html() == "Lambare" ||
          $("#ship-city").val() == "Mariano Roque Alonso___2040" ||
          $(".city").first().html() == "Mariano Roque Alonso"
        ) {
          $("#payment-group-custom203PaymentGroupPaymentGroup").css(
            "display",
            "block"
          );
          console.log("Asuncion");
        } else {
          $("#payment-group-custom203PaymentGroupPaymentGroup").css(
            "display",
            "none"
          );
          console.log("Otra localidad");
        }
      }, 500);
  
      alert(
        "Para los pagos fraccionados (cuotas) con tarjetas de crédito, su banco hará el recargo financiero en su extracto, salvo promociones sin intereses vigente."
      );
  
      $("#payment-group-creditCardPaymentGroup > span").click(function () {
        console.log("Hola Luis");
        var lngDisclaimer = $("#disclaimerCuotas").length;
        console.log(lngDisclaimer);
        if (lngDisclaimer === 0) {
          var $newdiv1 = $(
            "<div id='disclaimerCuotas'><p>OBS: al seleccionar la cantidad de cuotas, el banco emisor de su tarjeta hará el recargo correspondiente por la financiación directamente en su extracto; los mismos no están reflejados en este cuotero.</p></div>"
          );
          $("#iframe-placeholder-creditCardPaymentGroup").before($newdiv1);
        }
  
        $("#disclaimerCuotas").css("display", "block");
      });
    } else {
      ocultaDisclaimer();
    }
  
    if (location.hash === "#/shipping") {
      cargar_mapi();
      console.log("cargo mapi");
      $("#ship-city").on("change", function () {
        alert("cambio la ciudad");
      });
    }
  
    if (location.hash === "#/profile") {
      //setTimeout(function(){
      // $("#is-corporate-client").trigger("click");
      //},1000);
      
      $(".box-client-info-pj").html("<p><label>Datos para la Factura</label></p><p class='client-razon input text'><label for='client-razon'>Razón Social</label><input type='text' id='client-razon' class='input-xlarge'></p><p class='client-ruc input text required mask'><label for='client-ruc'>RUC</label><input type='text' id='client-ruc' class='input-small'></p>");
      
      $(".orderform-template").on("click", "#go-to-shipping", function () {
    var razon = $("#client-razon").val();
    var ruc = $("#client-ruc").val();
    if (razon != "" && ruc != "") {
      setTimeout(function () {
        console.log("se ejecuto el setTimeout para razon y ruc");
        vtexjs.checkout
          .getOrderForm()
          .then(function (orderForm) {
            
            var clientProfileData = orderForm.clientProfileData;
            clientProfileData.isCorporate = 'true';
            clientProfileData.corporateName = razon;
            clientProfileData.corporateDocument = ruc;
            clientProfileData.tradeName = "Datos para la Factura";
            clientProfileData.stateInscription = "00";
            console.log("clientProfileData", clientProfileData);
  
            return vtexjs.checkout.sendAttachment(
              "clientProfileData",
              clientProfileData
            );
          })
          .done(function (orderForm) {
            console.log("orderForm", orderForm);
            console.log(orderForm.clientProfileData.corporateName);
            console.log(orderForm.clientProfileData.corporateDocument);
          });
      }, 700);
    }
  });
      
    }
  }
  
  $("#payment-group-custom203PaymentGroupPaymentGroup > span").on(
    "click",
    ocultaDisclaimer
  );
  
  $("#payment-group-custom204PaymentGroupPaymentGroup > span").on(
    "click",
    ocultaDisclaimer
  );
  
  $("#payment-group-custom205PaymentGroupPaymentGroup > span").on(
    "click",
    ocultaDisclaimer
  );
  
  $("#payment-group-custom201PaymentGroupPaymentGroup > span").on(
    "click",
    ocultaDisclaimer
  );
  
  window.onhashchange = locationHashChanged;
  
  $("#payment-group-creditCardPaymentGroup > span").click(function () {
    alert(
      "Los pagos con tarjetas de crédito tienen el cobro de interés de cada banco, salvo las promociones vigentes."
    );
  });
  
  //mapas y geolocalizacion
  
  function cargar_mapi() {
    let headID = document.getElementsByTagName("head")[0];
    let mapapi = document.createElement("script");
    mapapi.type = "text/javascript";
    mapapi.async = true;
    mapapi.src =
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyAaoMPEOC4x7YqIVFmnoR9R6vqJIkYXhH4&libraries=places";
    headID.appendChild(mapapi);
  }
  
  var position = [0, 0];
  function onError(error) {
    var txt;
    switch (error.code) {
      case error.PERMISSION_DENIED:
        txt = "Permisos de localizacion negados";
        break;
      case error.POSITION_UNAVAILABLE:
        txt = "Posición de ubicación no disponible";
        break;
      case error.TIMEOUT:
        txt = "Se agotó el tiempo de espera de búsqueda de posición";
        break;
      default:
        txt = "Posicion desconocida";
    }
  
    //alert(txt);
  
    latitude = -25.2968361;
    longitude = -57.6681294;
  
    spanlat = document.getElementById("latitud");
    spanlong = document.getElementById("longitud");
  
    spanlat.innerHTML = latitude;
    spanlong.innerHTML = longitude;
  
    mostrarMapa(latitude, longitude);
  }
  
  function onSuccess(position) {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
  
    spanlat = document.getElementById("latitud");
    spanlong = document.getElementById("longitud");
  
    spanlat.innerHTML = latitude;
    spanlong.innerHTML = longitude;
  
    mostrarMapa(latitude, longitude);
  }
  
  function mostrarMapa(lat, long) {
    var latlng = new google.maps.LatLng(lat, long);
    var myOptions = {
      zoom: 16,
      center: latlng,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      draggable: true,
    };
  
    map = new google.maps.Map(document.getElementById("mapCanvas"), myOptions);
  
    marker = new google.maps.Marker({
      position: latlng,
      map: map,
      title: "Latitude:" + position[0] + " | Longitude:" + position[1],
    });
  
    google.maps.event.addListener(map, "click", function (event) {
      var result = [event.latLng.lat(), event.latLng.lng()];
      transition(result);
    });
  }
  
  function get_gps() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }
  }
  
  var numDeltas = 100;
  var delay = 5; //milliseconds
  var i = 0;
  var deltaLat;
  var deltaLng;
  
  function transition(result) {
    i = 0;
    deltaLat = (result[0] - parseFloat($("#latitud").html())) / numDeltas;
    deltaLng = (result[1] - parseFloat($("#longitud").html())) / numDeltas;
    moveMarker();
  }
  
  function moveMarker() {
    $("#latitud").html(parseFloat($("#latitud").html()) + deltaLat);
    $("#longitud").html(parseFloat($("#longitud").html()) + deltaLng);
  
    var latlng = new google.maps.LatLng(
      parseFloat($("#latitud").html()),
      parseFloat($("#longitud").html())
    );
    marker.setTitle(
      "Latitude:" + $("#latitud").html() + " | Longitude:" + $("#longitud").html()
    );
    marker.setPosition(latlng);
    if (i != numDeltas) {
      i++;
      setTimeout(moveMarker, delay);
    }
  }
  
  function ubicarme() {
    get_gps();
    $("#modalMapa").modal("show");
  }
  
  function fijar() {
    var coordenadas = $("#latitud").html() + ", " + $("#longitud").html();
    //$("#ship-neighborhood").val(coordenadas);
  }
  
  function autocompletador() {
    var autocomplete;
    autocomplete = new google.maps.places.Autocomplete(
      document.getElementById("search_input"),
      {
        types: ["geocode"],
      }
    );
  
    google.maps.event.addListener(autocomplete, "place_changed", function () {
      var place = autocomplete.getPlace();
      console.log(place);
      $("#ship-number").val(place.address_components[0].long_name);
      $("#ship-street").val(place.address_components[1].long_name);
      $("#ship-number").attr("value", place.address_components[0].long_name);
      $("#ship-street").attr("value", place.address_components[1].long_name);
      $("#latitud").html(place.geometry["location"].lat());
      $("#longitud").html(place.geometry["location"].lng());
      //$("#ship-neighborhood").val(place.geometry['location'].lat()+","+place.geometry['location'].lng());
      mostrarMapa(
        place.geometry["location"].lat(),
        place.geometry["location"].lng()
      );
    });
  }
  
  function sendCoor() {
    $(".orderform-template").on("click", "#btn-go-to-payment", function () {
      var coord = $("#latitud").html() + ", " + $("#longitud").html();
      console.log("Coordenadas: ", coord);
      if (coord) {
        setTimeout(function () {
          console.log("se ejecuto el setTimeout");
          vtexjs.checkout
            .getOrderForm()
            .then(function (orderForm) {
              var shippingData = orderForm.shippingData;
              shippingData.address.neighborhood = coord;
  
              shippingData.selectedAddresses[0].neighborhood = coord;
              console.log("shippingData", shippingData);
  
              return vtexjs.checkout.sendAttachment("shippingData", shippingData);
            })
            .done(function (orderForm) {
              console.log("orderForm", orderForm);
              console.log(orderForm.shippingData.address.neighborhood);
            });
        }, 700);
      }
    });
  }
  
  $("body").one("click", "#ship-street", function () {
    $(".vtex-omnishipping-1-x-submitPaymentButton").prepend(
      "<button class='btn-mapa' onclick='ubicarme()' style='margin-bottom: 25px;'><i class='glyphicon glyphicon-map-marker'></i> Ubicarme en el mapa</button>"
    );
    get_gps();
    autocompletador();
    sendCoor();
    $("#ship-number").focusout(function () {
      $("#modalMapa").modal("show");
      $("#search_input").val(
        $("#ship-street").val() + " " + $("#ship-number").val()
      );
    });
  });
  
  //function adjuntar(){
  // $("#modalDoc").modal("show");
  //}
  
  function verCompu(){
      vtexjs.checkout.getOrderForm().then(function (orderForm) {
          console.log(orderForm);
          let marketingData = orderForm.marketingData;
          console.log(marketingData);
          if (marketingData == null) {
              console.log("no hay utm");
          } else {
              var cond = marketingData.utmSource;
              if (cond == "compumas") {
                  $("#payment-group-custom202PaymentGroupPaymentGroup").css("display", "block")
              } else {
                  console.log("no tiene la utm compumas")
              }
          }
      });
  }
  
  $(document).ready(function () {
    
        
    
    if (location.hash === "#/payment") {
      setTimeout(function(){
        if (
          $("#payment-group-custom204PaymentGroupPaymentGroup").hasClass("active") &&
          $("#cart-note").val() == ""
        ) {
          $("#modalDoc").modal("show");
          $(".payment-submit-wrap").css("display", "none");
        } else {
          $(".payment-submit-wrap").css("display", "block");
        }
        
        verCompu();
      }, 4000);  
    }else{
        verCompu();
    }
    
    var copyTextareaBtn = document.querySelector('.js-textareacopybtn');
  
      copyTextareaBtn.addEventListener('click', function (event) {
          var copyTextarea = document.querySelector('.js-copytextarea');
          copyTextarea.select();
  
          try {
              var successful = document.execCommand('copy');
              var msg = successful ? 'successful' : 'unsuccessful';
              console.log('Copying text command was ' + msg);
          } catch (err) {
              console.log('Oops, unable to copy');
          }
      });
  
      var copyTextareaBtn2 = document.querySelector('.js-textareacopybtn-2');
  
      copyTextareaBtn2.addEventListener('click', function (event) {
          var copyTextarea = document.querySelector('.js-copytextarea-2');
          copyTextarea.select();
  
          try {
              var successful = document.execCommand('copy');
              var msg = successful ? 'successful' : 'unsuccessful';
              console.log('Copying text command was ' + msg);
          } catch (err) {
              console.log('Oops, unable to copy');
          }
      });
    
    
    $("#btn-upload").on("change", function () {
      if (
        this.files &&
        this.files[0] &&
        this.files[0].name.match(/\.(jpg|jpeg|png)$/)
      ) {
        $("#preview-pict").attr("src", window.URL.createObjectURL(this.files[0]));
  
        $("#preview-pict").on("load", function () {
          var image = document.getElementById("preview-pict");
  
          $("#canvas-area").css("border", "none");
          $("#canvas-area").attr("width", image.width);
          $("#canvas-area").attr("height", image.height);
  
          var canvas = document.getElementById("canvas-area");
          var ctx = canvas.getContext("2d");
  
          ctx.drawImage(image, 0, 0, image.width, image.height);
  
          var canvas = document.getElementById("canvas-area");
          var dataURL = canvas.toDataURL();
          $("#textarea").val(dataURL);
        });
      }
    });
  
    $("#form_id").on("submit", function (e) {
    e.preventDefault();
    var f = $(this);
    var formData = new FormData(document.getElementById("form_id"));
    var foto = $("#textarea").val();
    formData.append("textarea", foto);
  
    $.ajax({
      type: "POST",
      url: "https://compu.innew.com.ar/save.php",
      dataType: "html",
      data: formData,
      cache: false,
      contentType: false,
      processData: false,
      success: function (data) {
        console.log(data);
        $("#comprobante").html(data);
        if (data != "error al subir un pdf") {
          alert(
            "El comprobante se envió con éxito! Apretá el botón 'Comprar ahora' para finalizar tu compra"
          );
          $("#modalDoc").modal("hide");
  
          var comp = $("#comprobante").html();
          console.log("Comprobante: ", comp);
          if (comp) {
            setTimeout(function () {
              console.log("se ejecuto el setTimeout");
              vtexjs.checkout
                .getOrderForm()
                .then(function (orderForm) {
                  var obs = "Comprobante: " + comp;
                  return vtexjs.checkout.sendAttachment("openTextField", {
                    value: obs,
                  });
                })
                .done(function (orderForm) {
                  console.log("Comprobante: ", orderForm.openTextField);
                });
            }, 700);
            
            setTimeout(function () {
                $(".payment-submit-wrap").css("display", "block");  
            }, 2500);
            
          }
        } else {
          alert("Se debe subir archivos de tipo png, jpg o pdf menores a 1Mb!");
        }
      },
    });
  });
  });
  
  
  
  
  
  $("body").on(
    "click",
    ".payment-group-item",
    function () {
     if (
        $("#payment-group-custom204PaymentGroupPaymentGroup").hasClass("active") &&
        $("#cart-note").val() == ""
      ) {
        $("#modalDoc").modal("show");
        $(".payment-submit-wrap").css("display", "none");
      } else {
        $(".payment-submit-wrap").css("display", "block");
      }
    }
  );
  
  
  
  