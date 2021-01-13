function initPayPalButton() {
    paypal.Buttons({
        style: {
        shape: 'pill',
        color: 'white',
        layout: 'vertical',
        label: 'pay',
        
        },

        createOrder: function(data, actions) {
            return actions.order.create({
                purchase_units: [{"description":"Subskrypcja roczna","amount":{"currency_code":"PLN","value":1}}]
            });
        },

        onApprove: function(data, actions) {
            return actions.order.capture().then(function(details) {
                alert('Transaction completed by ' + details.payer.name.given_name + '!');
                
            });
        },

        onError: function(err) {
            console.log(err);
        }
    }).render('#paypal-button-container');
    }
initPayPalButton();