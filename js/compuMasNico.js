// con esto reemplazamos todo el texto - SUMANDO CANTIDAD Y MONTO DE CUOTAS y agregamos los legales 


window.onload=function()  {

    let cuotas = localStorage.getItem('cuotas');
    let valor = localStorage.getItem('valor')

    const compuCuotas = document.querySelector(".box-payment-group2.box-payment-option.custom202PaymentGroupPaymentGroup");
    compuCuotas.textContent = "Usted a elegido abonar su compra con CompuMas en " + cuotas + " de GS " + valor ;

    const div = document.createElement("div");
    div.textContent = "Su compra con crédito CompuMAS esta siendo procesada por el departamento Financiero. Nos podremos en contacto a la brevedad.";

    const compuCuotasInfo = document.querySelector(".box-payment-group2.box-payment-option.custom202PaymentGroupPaymentGroup");

    compuCuotasInfo.insertAdjacentElement("beforeend", div);

    div.classList.add("legal");

}

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

    let cuotas = localStorage.getItem('cuotas');
    let valor = localStorage.getItem('valor')

    const compuCuotas = document.querySelector(".box-payment-group2.box-payment-option.custom202PaymentGroupPaymentGroup");
    compuCuotas.textContent = "Usted a elegido abonar su compra con CompuMas en " + cuotas + " de GS " + valor ;

    const div = document.createElement("div");
    div.textContent = "Su compra con crédito CompuMAS esta siendo procesada por el departamento Financiero. Nos podremos en contacto a la brevedad.";

    const compuCuotasInfo = document.querySelector(".box-payment-group2.box-payment-option.custom202PaymentGroupPaymentGroup");

    compuCuotasInfo.insertAdjacentElement("beforeend", div);

    div.classList.add("legal");
}

