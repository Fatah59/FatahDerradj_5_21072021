// Récupération de l'id dans l'url //
const params = new URLSearchParams(window.location.search);
const cameraId = params.get('id');

// Modification de l'adresse d'appel à l'API
const cameraUrl = `http://localhost:3000/api/cameras/${cameraId}`;

function fetchDetail() {
  return fetch(cameraUrl).then((response) => response.json());
}

// Récupération des détails du produit //
fetchDetail().then((cameraDetail) => {
  let lensesSelect = `<label for="lense-select">Taile de l'objectif:</label>
  <select name="lense" id="lense-select">`;
  for (let lense of cameraDetail.lenses) {
    lensesSelect += `<option value="lense">${lense}</option>`;
  }
  lensesSelect += `</select>`;

  let affichage = '<div class="row">';
  affichage += `<div class="col-12 col-md-12 col-lg-12">
  <div class="product-detail">
  <div class="product-detail-card">
  <img class="product-detail-image" src="${cameraDetail.imageUrl}" alt="image de l'appareil photo ${cameraDetail.name}">
  <div class="product-detail-content">
  <h3>${cameraDetail.name}</h3>
  <p class="product-detail-description">${cameraDetail.description}</p>
  <p class="product-detail-price">${cameraDetail.price / 100} €</p>
  <form class="product-form">
  ${lensesSelect}
  <div class="product-form-buttons">
  <button class="btn btn-cart" type="submit">Ajouter au panier</button>
  <a class="btn btn-back" href="../index.html">Retour à l'accueil</a>
  </div>
  </form>
  </div>
  </div>
  </div>
  </div>`;

  affichage += '</div>';
  document.querySelector('#product').innerHTML = affichage;

  // Gestion du panier //
  // Sélectionner le bouton ajouter au panier
  const btn_addCart = document.querySelector('.btn-cart');

  // Écouter le bouton et ajouter le panier
  btn_addCart.addEventListener('click', (event) => {
    event.preventDefault();

    // récupération de la commande
    let product = {
      ...cameraDetail,
    };

    // Local storage
    // Déclaration de la variable contenant les key et les values du local storage
    let productCart = JSON.parse(localStorage.getItem('panier'));

    // Ajouter un produit au local storage
    const addProduct = () => {
      // Ajout du produit dans le tableau
      productCart.push(product);
      // Transformation en format JSON pour envoyer le tableau dans la key "panier" du local storage
      localStorage.setItem('panier', JSON.stringify(productCart));
    };

    // S'il y a des produits enregistré dans le local storage
    if (productCart) {
      addProduct();
      window.location.reload();
    }
    // S'il n'y a pas de produits enregistré dans le local storage
    else {
      productCart = [];
      addProduct();
      window.location.reload();
    }
  });
});
