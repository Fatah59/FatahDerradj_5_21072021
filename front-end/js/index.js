// Récupération de la liste des produits
function fetchCamera() {
  let url = 'http://localhost:3000/api/cameras';
  return fetch(url).then((response) => response.json());
}

fetchCamera()
  .then((cameraList) => {
    let affichage = '<div class="row">';
    // Affichage de la liste des produits
    for (let camera of cameraList) {
      affichage += `<div class="col-12 col-md-6 col-lg-6">
      <div class="products-list">
      <a href="./pages/produit.html?id=${camera._id}" class="products-list-card">
      <img class="products-list-image" src="${camera.imageUrl}" alt="image de l'appareil photo ${camera.name}">
      <div class="products-list-content">
      <h3>${camera.name}</h3>
      <p class="products-list-price">${camera.price / 100} €</p>
      <p class="products-list-link">Voir le produit</p>
      </div>
      </a>
      </div>
      </div>`;
    }
    affichage += '</div>';
    document.querySelector('#products').innerHTML = affichage;}).catch((err) => console.log('Erreur : ' + err));
