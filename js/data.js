"use strict"
var Icebox = (function() {
	var products = [{
	"name":"молоко",
	"imgSrc":"url('img/milk.png')"
},
{
	"name":"мука",
	"imgSrc":"url('img/flour.png')"
},
{
	"name":"яйца",
	"imgSrc":"url('img/egg.png')"
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
	"imgSrc":"url('img/cheese.png')"
},
{
	"name":"сахар",
	"imgSrc":"url('img/sugar.png')"
},
{
	"name":"творог",
	"imgSrc":"url('img/cottage_cheese.png')"
},
{
	"name":"омлет",
	"imgSrc":"url('img/omelet.png')"
}];

var recipes = [{
	"name":"блины",
	"rec":['молоко','яйца','мука']

},
{
	"name":"сырники",
	"rec":['яйца','мука','молоко','сахар','творог']
},
{
	"name":"омлет",
	"rec":['яйца','молоко','сыр']

},
{
	"name":"пицца",
	"rec":['основа пиццы','кетчуп','помидоры','колбаса']

}];

function getProducts(){
	var masProducts = [];
	for(var i = 0; i < products.length; i++){
		masProducts.push(products[i].name);
	}
	return masProducts;
}

function altOutRec(arrProd){
	var result = '';

	var obj = {};
	for (var i = 0; i < arrProd.length; i++) {
		var str = arrProd[i];
	    obj[str] = true;
		}
	for(var key in recipes){
		var count = 0;
		var strRec = recipes[key].rec;
		for (var i = 0; i < strRec.length; i++) {
			if(obj[strRec[i]]){
				count++;
			}
		if(count == arrProd.length){
	    	result += recipes[key].name;
		}
		}
		count = 0;
	}
	return result;
}

function possibleRecReturner(productList){
	var regularRec = [];
		for(var key in recipes){
			for (var i = 0; i < productList.length; i++) {
				if((recipes[key].rec.toString().split(',')).indexOf(productList[i].toLowerCase()) != -1){
				regularRec.push(''+recipes[key].name);
				regularRec = regularRec.toString().split(',');
				break;
				}
			}
		}
	  var obj = {};

	for (var i = 0; i < regularRec.length; i++) {
		var str = regularRec[i];
	    obj[str] = true;
		}
	  regularRec = [];
	return(Object.keys(obj).toString().split(','));

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


/*function outRecipes(arrProd){ // Старый способ поиска рецепта. Искал выходной продукт по наибольшему совпадению продуктов для него на столе. Более гибкий но не 
								// всегда точный.
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
}*/
	return {
		getProducts : getProducts,
		outImgSrc : outImgSrc,
		/*outRecipes: outRecipes,*/
		possibleRecReturner: possibleRecReturner,
		altOutRec: altOutRec
	};
})();


