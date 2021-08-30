// Déclaration de la variable contenant les key et les values du local storage
let productCart = JSON.parse(localStorage.getItem('panier'));

function fetchCart() {
  return fetch(productCart).then((response) => response.json());
}

// Fonction de suppression de produit
function suppressionProduct(i) {
  productCart.splice(i, 1);
  // Vider le local storage
  localStorage.clear();
  // Mettre à jour le local storage
  localStorage.setItem('panier', JSON.stringify(productCart));
  window.location.reload();
}

// Déclaration de la variable qui contiendra les prix du panier
let totalPriceCalcul = [];

if (productCart !== null)
  // Récupération des prix dans le panier
  for (let j = 0; j < productCart.length; j++) {
    let priceProductCart = productCart[j].price;
    // Stocker les prix du panier dans la variable "totalPriceCalcul"
    totalPriceCalcul.push(priceProductCart);
  }

// Additionner les prix se trouvant dans le tableau de la variable "totalPriceCalcul" avec la méthode .reduce
const reducer = (accumulator, currentValue) => accumulator + currentValue;
const totalPrice = totalPriceCalcul.reduce(reducer, 0);

// Si le panier est vide : afficher le message panier vide
if (productCart === null || productCart.length == 0) {
  let emptyCart = '<div class="row">';
  emptyCart += `<div class="col-12 col-md-12 col-lg-12">
  <div class="cart-empty">
  <h2>Vous n'avez aucun article dans votre panier.</h2>
  </div>
  </div>`;
  emptyCart += `</div>`;
  document.querySelector('#cart').innerHTML = emptyCart;
} else {
  // Si le panier n'est pas vide : récupération du contenu du local storage //
  let listCart = '';
  for (let i = 0; i < productCart.length; i++) {
    let product = productCart[i];
    listCart += `
    <tr>
       <th scope="row">${i + 1}</th>
       <td><img id="cartProductImage" src="${product.imageUrl}"> ${
      product.name
    }</td>
       <td>${product.price / 100} €</td>
       <td> <i class="fas fa-trash" onclick="suppressionProduct(${i})"></i></td>
     </tr>`;
  }

  let affichage = '<table class="table table-hover">';

  affichage += `<thead>
     <tr>
       <th scope="col">#</th>
       <th scope="col">Appareil photo</th>
       <th scope="col">prix</th>
       <th scope="col"></th>
     </tr>
   </thead>
   <tbody>
     ${listCart}
   </tbody>
   <tfoot>
   <tr>
       <td colspan="2"><strong>Total de la commande</strong></td>
       <td><strong>${totalPrice / 100} €</strong></td>
   </tr>
</tfoot>`;

  affichage += '</table>';
  document.querySelector('#cart').innerHTML = affichage;
}

// Affichage du formulaire
let formAffichage = '<form>';

formAffichage += `
  <div class="row">
    <div class="form-group col-md-6">
      <label for="name">Nom</label>
      <input type="text" class="form-control" id="inputName" pattern="[A-Za-z]{2,20}" required>
    </div>
    <div class="form-group col-md-6">
      <label for="firstName">Prénom</label>
      <input type="text" class="form-control" id="inputFirstName" pattern="[A-Za-z]{2,20}" required>
    </div>
  </div>
  <div class="row">
  <div class="form-group col-md-6">
    <label for="address">Adresse</label>
    <input type="text" class="form-control" id="inputAddress" pattern="[A-Za-z0-9-éàè]{1,50}" required>
  </div>
  <div class="form-group col-md-6">
      <label for="zip">Code Postal</label>
      <input type="text" class="form-control" id="inputZip" pattern="[0-9]{,5}" required>
    </div>
  </div>
  <div class="row">
    <div class="form-group col-md-6">
      <label for="city">Ville</label>
      <input type="text" class="form-control" id="inputCity" pattern="[A-Za-z]{2,20}" required>
    </div>
    <div class="form-group col-md-6">
      <label for="email">Adresse email</label>
      <input type="text" class="form-control" id="inputEmail" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" required>
    </div>
  </div>
  
  <div class="form-form-buttons">
  <button type="submit" class="btn btn-order">Valider la commande</button>`;
formAffichage += '</form>';
document.querySelector('#form').innerHTML = formAffichage;

// Validation de la commande

// Sélectionner le bouton valider la commande
const btn_order = document.querySelector('.btn-order');

// Écouter le bouton et ajouter le panier
btn_order.addEventListener('click', (event) => {
  event.preventDefault();

  //  récupération du formulaire de coordonnées
  let customerOrder = {
    contact: {
      firstName: document.getElementById('inputFirstName').value,
      lastName: document.getElementById('inputName').value,
      address: document.getElementById('inputAddress').value,
      city: document.getElementById('inputCity').value,
      email: document.getElementById('inputEmail').value,
    },
    products: [],
  };

  // Récupération des _id des articles du panier dans le local storage
  let panier = JSON.parse(localStorage.getItem('panier'));
  for (let item of panier) {
    // Mettre les -id récupéré dans le tableau products
    customerOrder.products.push(item._id);
  }

  // Envoi de a commande au "backend" via la méthode POST
  const options = {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify(customerOrder),
  };

  // Redirecion vers la page de confirmation
  fetch('http://localhost:3000/api/cameras/order', options).then(function (
    response
  ) {
    response.json().then(function (confirmOrder) {
      localStorage.setItem('confirmOrder', JSON.stringify(confirmOrder));
      window.location = './confirmation.html';
    });
  });

  localStorage.clear();
});
