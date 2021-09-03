// Déclaration de la variable contenant les key et les values du local storage
let orderValidation = JSON.parse(localStorage.getItem('confirmOrder'));

console.log(orderValidation);

// Déclaration de la variable qui contiendra le total des prix de la commande
let totalPrice = 0;

if (orderValidation !== null)
  // Récupération des prix dans le local storage
  for (let j = 0; j < orderValidation.products.length; j++) {
    let priceProductCart = orderValidation.products[j].price;
    // Calcul du total de la commande
    totalPrice = totalPrice + priceProductCart;
  }

let affichage = '<div class="row">';

  affichage += `<div class="col-12 col-md-12 col-lg-12">

  <div class="customer-message">
  <p>${orderValidation.contact.firstName} ${orderValidation.contact.lastName}</p> 
  <p>Oricam vous remercie pour votre commande de <strong>${totalPrice / 100} €</strong></p>
  <p>Voici l'identifiant de votre commande : <strong>${orderValidation.orderId}</strong></p>
  </div>
  </div>`;
  
  affichage += '</div>';
  document.querySelector('#confirmation').innerHTML = affichage;
