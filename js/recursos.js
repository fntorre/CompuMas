// RECUPERAR DATOS DE LOCALSTORAGE

let fecha = localStorage.getItem("_uetsid_exp")
alert("hoy es" + fecha)


// INSERTAR MI CONTENIDO EN EL DOM
const subs = document.querySelector(".suscribirse_form h4");
subs.textContent = "Hola a todos";


// METODO .appendChild
const div = document.createElement("div");
div.textContent = "Esto es un div insertado con JS.";

const app = document.createElement("div"); // <div></div>
app.id = "app"; // <div id="app"></div>
app.appendChild(div); // <div id="app"><div>Esto es un div insertado con JS</div></div>



// METODO .insertAdjacentElement
const div = document.createElement("div");  // <div></div>
div.textContent = "Ejemplo";                // <div>Ejemplo</div>

const app = document.querySelector("#app"); // <div id="app">App</div>

app.insertAdjacentElement("beforebegin", div);
// Opción 1: <div>Ejemplo</div> <div id="app">App</div>

app.insertAdjacentElement("afterbegin", div);
// Opción 2: <div id="app"> <div>Ejemplo</div> App</div>

app.insertAdjacentElement("beforeend", div);
// Opción 3: <div id="app">App <div>Ejemplo</div> </div>

app.insertAdjacentElement("afterend", div);
// Opción 4: <div id="app">App</div> <div>Ejemplo</div>


// ELIMINAR ELEMENTOS HTML
const div = document.querySelector(".deleteme");

div.isConnected;    // true
div.remove();
div.isConnected;    // false


// CUOTAS

$("#selectorcuota").change(function () {
    var pasar = $("#selectorcuota option:selected").attr("monto");
    $("#val-imp").html(pasar)
});


// SELECCIONO EL TEXTO A EDITAR EN EL CARRITO - METODOS DE PAGO

const compuCuotas = document.querySelector(".box-payment-group2.box-payment-option.custom202PaymentGroupPaymentGroup .installments");
compuCuotas.textContent = "Hola a todos";


const numCuotas = document.createElement("div");  // <div></div>
numCuotas.textContent = "Ejemplo"; 

const compuCuotas = document.querySelector(".box-payment-group2.box-payment-option.custom202PaymentGroupPaymentGroup .installments");
compuCuotas.insertAdjacentElement("afterend", $("#val-imp"));


let stone = localStorage.getItem('select')
console.log(stone)


const compuCuotas = document.querySelector(".box-payment-group2.box-payment-option.custom202PaymentGroupPaymentGroup .installments");
compuCuotas.textContent = "Usted a seleccionado pagar en " + stone + " cuotas";




function muestraCuotas (){
    
    $("#selectorcuota").change(function () {
        let pasar = $("#selectorcuota option:selected").attr("monto");
        $("#val-imp").html(pasar)
    });

    const compuCuotas = document.querySelector(".box-payment-group2.box-payment-option.custom202PaymentGroupPaymentGroup .installments");
    compuCuotas.textContent = pasar;
}


/*Guardando los datos en el LocalStorage*/
localStorage.setItem("Nombre", nom);
localStorage.setItem("Apellido", apel);


$(function() {
    $('#selectorcuota').change(function() {
        localStorage.setItem('cuota', this.value);
    });
    if(localStorage.getItem('cuota')){
        $('#mi-selectorcuota').val(localStorage.getItem('cuota'));
    }
});
