"use strict"
var Icebox = (function() {
	var products =[{
	"name":"молоко",
	"imgSrc":"url('img/milk.png')",
	"possibleRec":['омлет','блины','сырники']
},
{
	"name":"мука",
	"imgSrc":"url('img/flour.png')",
	"possibleRec":['пироги','блины','пирожки','сырники']
},
{
	"name":"яйца",
	"imgSrc":"url('img/egg.png')",
	"possibleRec":['омлет','сырники','блины','пирожки','печеньки']
},
{
	"name":"блины",
	"imgSrc":"url('img/pancakes.png')"
},
{
	"name":"сырники",
	"imgSrc":"url('img/cheescakes.png')"
},
{
	"name":"сыр",
	"imgSrc":"url('img/cheese.png')",
	"possibleRec":['омлет','бутерброд','пицца']
},
{
	"name":"сахар",
	"imgSrc":"url('img/sugar.png')",
	"possibleRec":['сырники']
},
{
	"name":"творог",
	"imgSrc":"url('img/cottage_cheese.png')",
	"possibleRec":['сырники']
},
{
	"name":"омлет",
	"imgSrc":"url('img/omelet.png')",
}];

function getProducts(){
	var masProducts = [];
	for(var i = 0; i < products.length; i++){
		masProducts.push(products[i].name);
	}
	return masProducts;
}
function outImgSrc(prodName){
	var images = '';
	for(var i = 0; i < products.length; i++){	
		if(products[i].name == prodName.toLowerCase()){
			images += products[i].imgSrc;
			break;
		}
		
	}
	return images;
}
function outRecipes(arrProd){
		var regularRec = [],
		result = '',
		maxPut = 0;
		for(var key in products){
			for (var i = 0; i < arrProd.length; i++) {
				if(arrProd[i].toLowerCase() === products[key].name){
				regularRec.push(''+products[key].possibleRec);
				regularRec = regularRec.toString().split(',');
				break;
				}
			}
		}
		for (var i = 0; i < regularRec.length; i++) {
			var maxPutCount = 0;
			for(var j = 0; j < regularRec.length; j++) {
				if(regularRec[i] === regularRec[j]) {
					maxPutCount +=1;
				}
			}
			if(maxPutCount > maxPut){
				result = regularRec[i];
				maxPut = maxPutCount;	
			} 
		}
		return result;
}
	return {
		getProducts : getProducts,
		outImgSrc : outImgSrc,
		outRecipes: outRecipes
	};
})();


