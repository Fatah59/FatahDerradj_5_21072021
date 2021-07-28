function fetchCamera() {
    let url = 'http://localhost:3000/api/cameras'
    return fetch(url) 
            .then(response => response.json())
}

fetchCamera() .then((cameraList) => {
    console.log(cameraList);
    let affichage = '<div class="row">';
    for(let id of cameraList){
        affichage += `<div class="col-12 col-md-6 col-lg-6"><div class="products-list"><a href="./product.html?${id._id}" class="products-list-card">
        <img class="products-list-image" src="${id.imageUrl}" alt="image de l'appareil photo ${id.name}">
        <div class="products-list-content">
        <h3>${id.name}</h3>
        <p class="products-list-price">${id.price / 100} €</p>
        <p class="products-list-link">Voir le produit</p>
        </div>
        </a></div></div>`   
    }
    affichage += '</div>';
    document.querySelector("#products").innerHTML = affichage;
}).catch(err => console.log('Erreur : ' + err));
