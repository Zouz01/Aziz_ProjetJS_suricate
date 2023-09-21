

                  //RESUMER DES TACHES A EFFECTUER

//1. La définition de la variable 'catalogue' qui contient le catalogue de produits
//2. La gestion de la mise en panier, qui consiste en la mise à jour du panier et de la variable totale lorsque l'utilisateur ajoute un produit au panier.
//3. La gestion de l'affichage du coût total dans la zone '#total span'
//4. La gestion du filtre de recherche, qui permet à l'utilisateur de filtrer les produits en saisissant un texte dans le champ '#filter'
//5. Les fonctionnalités de validation pour s'assurer que les quantités saisies dans les champs d'entrée sont valides (entre 1 et 9).	


			// === constantes ===
const MAX_QTY = 9;
const productIdKey = "product";
const orderIdKey = "order";
const inputIdKey = "qte";
const panier = document.getElementById("panier");


				// === variables globales ===
// le coût total des produits sélectionnés
var totalCost = 0;



					// ===fonctions===
//appelée au chargement de la page, elle effectue les initialisations
function init() {
	createShop();
	initCart();
}
window.addEventListener("load", init);




/***************  Initialisation du panier **********************/
 // récupère un élément HTML avec l'ID "boutique"
var initCart = function() {
	const boutique = document.getElementById("boutique");
	// Ajout d'un écouteur d'événement pour tous les boutons de mise en panier
	boutique.addEventListener("click", function(e) { 
		if(e.target && e .target.nodeName === "BUTTON")
		{ const productBlock = e.target.parentNode.parentNode ;
			const productId = productBlock.id.split("-")[0] ;
			const qteInput = productBlock.querySelector("input" ); // représente la quantité requise par l'utilisateur pour ce produit.
		//appelle la fonction "validateQte" pour valider la quantité entrée
			if(validateQte(qteInput.value)) { 
			addToCart (productIdKey, qteInput.value); }
		 }
	});
} ;


// Fonction pour mettre à jour le coût total en fonction des articles ajoutés au panier
function updateTotalCost(cost) {
	totalCost += cost;
	totalSpan.innerHTML = totalCost;
  }

// Validation de la quantité entrée 
var validateQte = function(qte) {
	 return qte > 0 && qte <= MAX_QTY;
	 } ;

// Ajout d'un produit au panier
var addToCart = function(productId, qte) { 
	const newLocal = (productId);
	const product = catalogue.filter(product => product.id === productId)[0];
	const order = { [productIdKey]: productId, [inputIdKey]: qte };

} ;
// Mise à jour du panier ici

let productPrices = {
  };

  function getProductPrice(productId) {
	return productPrices[productId];
  }



function updateCart(productId, qte) {
	// Obtenir la référence au produit dans le panier à partir de son ID
	let productInCart = document.getElementById(`${productId}-cart`);

	// Si le produit n'est pas encore dans le panier, l'ajouter
	if (!productInCart) {
	  // Code pour ajouter un nouveau produit au panier
	  // ...
	}
	// Sinon, mettre à jour la quantité pour ce produit
	else {
	  let quantitySpan = productInCart.querySelector(".quantite");
	  quantitySpan.innerHTML = `${qte}`;

	  // Mettre à jour le prix total pour ce produit en multipliant le prix unitaire par la quantité sélectionnée
	  let productPrice = getProductPrice(productId);
	  let priceSpan = productInCart.querySelector(".price");
	  priceSpan.innerHTML = `${productPrice * qte}`;
	}

	// Mettre à jour le prix total du panier
	updateTotal();
  }

  function updateTotal() {
	// Obtenir la référence à la section qui affiche le prix total
	let totalSection = document.querySelector(".total");

	// Initialiser le prix total à 0
	let total = 0;

	// Pour chaque produit dans le panier, ajouter son prix total à la somme totale
	let productsInCart = document.querySelectorAll(".product-in-cart");
	productsInCart.forEach(product => {
	  let priceSpan = product.querySelector(".price");
	  total += parseInt(priceSpan.innerHTML);
	});

	// Mettre à jour le prix total affiché dans la section
	totalSection.innerHTML = `${total}`;
  }

// usefull functions
/*
* créer et ajouter tous les éléments div.produit à l'élément div#boutique
* selon les objets produits qui existent dans la variable 'catalogue'
*/
function createShop() {
	var shop = document.getElementById("boutique");
	for (var i = 0; i < catalog.length; i++) {
		shop.appendChild(createProduct(catalog[i], i));
	}
}

/*
* créer l'élément div.produit correspondant au produit donné
* L'élément créé reçoit l'id "index-product" où index est remplacé par la valeur de param
* @param product (objet produit) = le produit pour lequel l'élément est créé
* @param index (int) = l'index du produit dans le catalogue, utilisé pour définir l'id de l'élément créé
*/

// construit l'élément div pour le produit
var createProduct = function (product, index) {	
	var block = document.createElement("div");
	block.className = "produit";
	

	// définit l'identifiant de ce produit
	block.id = index + "-" + productIdKey;

// construit la partie h4 de 'block'
	block.appendChild(createBlock("h4", product.name));
	
	// /!\ devrait ajouter le chiffre du produit... ne fonctionne pas encore... /!\
	block.appendChild(createFigureBlock(product));

	// construit et ajoute la partie div.description de 'block' 
	block.appendChild(createBlock("div", product.description, "description"));

	// construit et ajoute la partie div.price de 'block'
	block.appendChild(createBlock("div", product.price, "prix"));

	// construit et ajoute un bloc div de contrôle à l'élément produit
	block.appendChild(createOrderControlBlock(index,product));



	
/************************* recherche des produits*******************/

// Initialisation du filtre de recherche 

	
	 const bar2recherche = document.querySelector("#filter")
	 bar2recherche.addEventListener("keyup", (e) => {
		const rechercheLettre = e.target.value;
		
		filterElement(rechercheLettre, block, product);
	});
	return block;
	
}
// Filtrage des produits 


function filterElement (rechercheLettre,elements, product ) { 
	if(rechercheLettre.length >2) { //recherche à partir de 2 lettres
		 
			if(product.name.toLowerCase().includes(rechercheLettre)){
				elements.style.display = "inline-block"; // si recherche ok alors afficher le bloc ( tolowerCase permet les recherches en Maj ou Min)
			} else {
				elements.style.display = "none" ; // sinon rien ne s'affiche
			}	
		}
	}
	 
		
/* renvoie un nouvel élément de la balise 'tag' avec le contenu 'content' et la classe 'cssClass'
 * @param tag (string) = le type de l'élément créé (exemple : "p")
 * @param content (string) = le contenu html de l'élément créé (exemple : "bla bla")
 * @param cssClass (string) (facultatif) = la valeur de l'attribut 'class' pour l'élément créé
 */



// crée un élément HTML et le renvoie.
var createBlock = function (tag, content, cssClass) {
	var element = document.createElement(tag);
	if (cssClass != undefined) {
		element.className =  cssClass;
	}
	element.innerHTML = content;
	return element;
}

/*
* construit l'élément de contrôle (div.controle) d'un produit
* @param index = l'index du produit considéré
*
* TODO : ajouter la gestion des événements,
* /!\ dans cette version le bouton et l'entrée ne font rien /!\
*/
var createOrderControlBlock = function (index, product) {
	var control = document.createElement("div");
	control.className = "controle";




// crée un élément de quantité d'entrée
	var input = document.createElement("input");
	input.id = index + '-' + inputIdKey;
	input.type = "number";
	input.value = "0";
	input.max = MAX_QTY; // valeur max à 9 modifier dans le html
	input.min = "0" // Valeur min à 0 modifier dans le html

// ajoute une entrée au contrôle en tant qu'enfant
	control.appendChild(input);

// créer un bouton de commande
	var button = document.createElement("button");
	button.className = 'commander';
	button.id = index + "-" + orderIdKey;


//Ajouter un écouteur d'événement au bouton 
	button.addEventListener("click", function () { // Vérifier si l'article existe déjà dans le panier 
		if (input.value>= 1) {

			// récupérer l'index et orderIdKey à partir de l'id du bouton
			let [index, orderIdKey] = this.id.split("-");
			// 
			/*addItemToCart(index, orderIdKey);*/
			afficherPanier(index, product, input);}
			input.value = "0"; // remet à zero le compteur de validation d'article
		});

//avec la fonction ternaire pour mettre le chariot en apparence 
input.addEventListener('input', () => {
input.value > 0 ? button.style.opacity = 1 : button.style.opacity = 0.25
 
	if (input.value > 9) {
	  alert("La quantité d'article maximum est atteinte");
	  input.value = 9;
	}
	if (input.value < 0){
		alert("La quantité d'article minimun est atteinte");
		input.value = 0;
	  }
  });
// ajoute le contrôle au contrôle en tant qu'enfant
	control.appendChild(button);


// le nœud div de contrôle construit est retourné
	return control;
}


/*
* créer et renvoyer le bloc de figurines pour ce produit
* voir la version statique du projet pour savoir ce que doit être la <figure>
* @param product (objet produit) = le produit pour lequel le bloc figure est créé
*
* À FAIRE : écrivez le bon code
*/

/* ******************************* Bloc Image* **********************/
var createFigureBlock = function (product) {
	return createBlock("figure",`<img src="${product.image}">`); };// insère une image dans le bloc figure, la source "image" est récuperée en ouvrant le catalogu1.js
	


	/* ************************** Afficher Panier * ******************/
function afficherPanier(index, product, input) {
  let totalSpan = document.querySelector("#montant");      	// sélectionne l'élément HTML avec l'ID montant et l'affecte à la variable totalSpan.

  const achatsDiv = document.querySelector(".achats");		// sélectionne le premier élément HTML avec la classe achats et l'affecte à la variable achatsDiv.

  let conteneur = createBlock("div", "", "achat");			// donne un identifiant unique achat-${index}.
  conteneur.id = `achat-${index}`;

  let button = createBlock("button","", "retirer");			// crée un nouveau bouton button avec la classe retirer
  button.addEventListener("click", function() {				//ajoute un écouteur d'événement qui décrémentera le total affiché lorsqu'il est cliqué.

    totalSpan.innerHTML = parseInt(totalSpan.innerHTML) - +product.price * +qteId.innerHTML;
    conteneur.remove();
	console.log (qteId)
  });

  let qte = createBlock("p", "","quantite");					//  crée un nouveau bloc de contenu "p" avec la classe "quantité"
  let description = createBlock("h4", product.description, "description"); // crée un nouveau bloc de contenu "h4"avec la "description du produit"
  let image = createBlock("figure",`<img src="${product.image}">`);			// crée un nouveau bloc de contenu figure avec une image du produit
  qte.id = `quantite'-${index}`;								// lui donne un identifiant unique "quantité-${index}"
  var qteId = document.getElementById(qte.id)					// creation d'une "id" "qte"
  conteneur.appendChild(image);									// ajoute les blocs de contenu à conteneur
  conteneur.appendChild(description);
  conteneur.appendChild(qte);
  conteneur.appendChild(createBlock("div",product.price, "prix")); // ajoute le prix du produit en utilisant la fonction createBlock et la classe prix.
  conteneur.appendChild(button);								  // ajoute le bouton conteneur.


  	if (document.getElementById(conteneur.id)) {					// nécessite un produit avec le même identifiant existant déjà dans le panier d'achat.

		if (qteId.innerHTML >= 9) {
			alert("La quantité maximum par article est atteinte");		// si >= 9, alors quantité bloqué à 9 et on arrete là avec le return
				qteId.innerHTML = MAX_QTY  
				return;
		}

		if (qteId.innerHTML <= 9) {
    		qteId.innerHTML = +input.value+ +qteId.innerHTML ;			// Si qte <=9, met à jour la quantité du produit existant
			totalSpan.innerHTML=  parseInt(totalSpan.innerHTML) + (product.price * input.value)}// utilise la valeur de l'objet saisi et met à jour le total affiché
		}


   else {
    achatsDiv.appendChild(conteneur);							// Si non, elle ajoute le conteneur au panier d'achat
	var qteId = document.getElementById (qte.id)
    qteId.innerHTML += input.value;								// met à jour la quantité du produit en utilisant la valeur de l'objet input
    totalSpan.innerHTML = parseInt(totalSpan.innerHTML) + (product.price * input.value); // met à jour le total affiché.
   }
}






