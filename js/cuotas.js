muestraCuota()

function muestraCuota() {

    // aca guardo la cantidad de cuotas en localStorage    

    $(function () {
        $('#selectorcuota').change(function () {
            localStorage.setItem('select', this.value);
        });

    });


    // aca tomo la cantidad de cuotas y lo agrego a los datos del pago CON ESTO SE AGREGA AL RESTO DEL TEXTO

    let stone = localStorage.getItem('select')
    console.log(stone)

    const div = document.createElement("div");
    div.textContent = "Usted a elegido abonar su compra con CompuMas en " + stone + " cuotas.";

    const compuCuotas = document.querySelector(".box-payment-group2.box-payment-option.custom202PaymentGroupPaymentGroup .installments");

    compuCuotas.insertAdjacentElement("afterend", div);



    // con esto reemplazamos todo el texto y agregamos los legales


    let stone = localStorage.getItem('select')
    console.log(stone)

    const compuCuotas = document.querySelector(".box-payment-group2.box-payment-option.custom202PaymentGroupPaymentGroup");
    compuCuotas.textContent = "Usted a elegido abonar su compra con CompuMas en " + stone + " cuotas.";

    const div = document.createElement("div");
    div.textContent = "Su compra con crédito CompuMAS esta siendo procesada por el departamento Financiero. Nos podremos en contacto a la brevedad.";

    const compuCuotasInfo = document.querySelector(".box-payment-group2.box-payment-option.custom202PaymentGroupPaymentGroup");

    compuCuotasInfo.insertAdjacentElement("beforeend", div);


}



$(window).on("load", function () {
    muestraCuota()
    function muestraCuota() {

        // aca guardo la cantidad de cuotas en localStorage
        $(function () {
            $('#selectorcuota').change(function () {
                localStorage.setItem('select', this.value);
            });

        });

        // con esto reemplazamos todo el texto y agregamos los legales
        let stone = localStorage.getItem('select')
        console.log(stone)

        const compuCuotas = document.querySelector(".box-payment-group2.box-payment-option.custom202PaymentGroupPaymentGroup");
        compuCuotas.textContent = "Usted a elegido abonar su compra con CompuMas en " + stone + " cuotas.";

        const div = document.createElement("div");
        div.textContent = "Su compra con crédito CompuMAS esta siendo procesada por el departamento Financiero. Nos podremos en contacto a la brevedad.";

        const compuCuotasInfo = document.querySelector(".box-payment-group2.box-payment-option.custom202PaymentGroupPaymentGroup");

        compuCuotasInfo.insertAdjacentElement("beforeend", div);

        div.classList.add("legal");
    }
});

