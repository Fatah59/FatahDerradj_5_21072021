function counter(){
// Initialisation de la varaible count et récupération du contenu de la clé panier 
let count = 0;
let panier = localStorage.getItem('panier');

// Si la clé panier existe count = sa longueur
if(panier) {
    count = JSON.parse(panier).length;
}

// Affichage du nombre d'article 
let countSpan = document.querySelector('.fa-layers-counter');

countSpan.innerHTML = count;
}
counter();


