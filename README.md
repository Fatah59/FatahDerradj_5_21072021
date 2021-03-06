# FatahDerradj_5_21072021

# Projet 5 - Parcours Développeur Web Openclassrooms

# Construisez un site e-commerce


Compétences évaluées :

- Créer un plan de test pour une application
- Interagir avec un web service avec JavaScript
- Valider des données issues de sources externes
- Gérer des événements JavaScript


Prérequis : 

- Clonez le repository : https://github.com/OpenClassrooms-Student-Center/JWDP5 pour créer le dossier back-end
- Se placer dans le dossier back-end
- Installez Node.js en version LTS (taper "node -v" dans le terminal de l'éditeur de code pour connaître votre version de Node.js si vous l'avez
  installé dans le passé). Si Node.js n'est pas installé sur votre machine, téléchargez le ici : https://nodejs.org/en/
- Installez npm avec la commande "npm install". Cela installera les dépendances.
- Clonez mon repository pour la partie front-end : https://github.com/Fatah59/FatahDerradj_5_21072021.git
- Lancez le serveur avec la commande "node server.js" (attention, vous devez être placé dans le dossier back-end)
- Pour information, une fois le serveur lancé, il est possible de consulter la liste des produits sur l'API via la page 
  http://localhost:3000/api/cameras
- Ouvrez la page index.html du site en local avec la fonction Go Live de Virtual Studio Code


L’application web est composée de 4 pages :

- une page de vue sous forme de liste, montrant tous les articles disponibles à la vente ;
- une page “produit”, qui affiche de manière dynamique l'élément sélectionné par l'utilisateur et lui permet de personnaliser le produit et de
  l'ajouter à son panier ;
- une page “panier” contenant un résumé des produits dans le panier, le prix total et un formulaire permettant de passer une commande. Les données
  du formulaire doivent être correctes et bien formatées avant d'être renvoyées au back-end. Par exemple, pas de texte dans les champs date ;
- une page de confirmation de commande, remerciant l'utilisateur pour sa commande, et indiquant le prix total et l'identifiant de commande envoyé
  par le serveur.