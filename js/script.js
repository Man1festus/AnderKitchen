	var fridgeProducts = [];
	var productList = [];
	var resultProducts = [];

	function allowDrop(event){
		event.preventDefault();
	}

	function drag(event) {
    	event.dataTransfer.setData("text", event.target.id);
	}


	function drop(event){
		event.preventDefault();
    	var data = event.dataTransfer.getData("text");
    	var dragElement = document.getElementById(data);
    	if(productList.indexOf(dragElement.textContent.toLowerCase()) === (-1) && event.target.id === 'wrapprod' ){
    		fridgeProducts.splice(dragElement.textContent.toLowerCase(), 1);
    		productList.push(dragElement.textContent.toLowerCase());
    		event.target.appendChild(dragElement);
    		document.querySelector('#fridge>p>span').textContent = ''+fridgeProducts.length;
    	}
    		/*if(fridgeProducts.indexOf(dragProduct) == (-1)){
  				productList.splice(dragProduct,1);
       			event.target.appendChild(document.getElementById(data));
    			alert('Fridge: ' + fridgeProducts + 'Kitchen: '+productList);	
    		}
    		else if(productList.indexOf(dragProduct) == (-1) && fridgeProducts.length > 0){
    			fridgeProducts.splice(dragProduct,1);
    			productList.push(dragProduct);
    			alert('FRIDGE: ' + fridgeProducts + 'Kitchen: ' + productList);
    			event.target.appendChild(document.getElementById(data));
    		}
    		else if(fridgeProducts.indexOf(dragProduct) != (-1)){
    			alert('FRIDGE: ' + fridgeProducts + 'Kitchen: ' + productList);
    		}*/
  
	}

window.onload = function() {
	var fridge = document.getElementById('fridge');
	var products = Icebox.getProducts();
	var butShow = document.querySelectorAll('#recShowBut');
	document.getElementById('addProducts').addEventListener('click', addProd); 
	document.getElementById('cookingProducts').addEventListener('click', pushResult);
	for(var i = 0; i<butShow.length; i++){
			butShow[i].addEventListener('click', idReturner);
	}

	function idReturner () {
			clickRecipes(this.parentNode.id);
 	}
	
	function addProd() {
			var nameProd = document.getElementById('name');
			var inputProdName = nameProd.value.toLowerCase();
			if(inputProdName.length == 0){
				nameProd.setAttribute('placeholder','Введите название продукта...');
				nameProd.classList.add('alert-danger');
			}
			else if(fridgeProducts.indexOf(inputProdName) != (-1)){
				nameProd.value = '';
				nameProd.setAttribute('placeholder','Данный продукт уже есть в холодильнике...');
				nameProd.classList.add('alert-danger');
			}
			else{
				if(products.indexOf(inputProdName) != (-1)){
					var img = Icebox.outImgSrc(inputProdName);
				}
				fridgeProducts.push(inputProdName);
				var dragElem = document.createElement('div');
				dragElem.className = 'dragElements';
				dragElem.setAttribute('draggable', true);
				dragElem.setAttribute('ondragstart','drag(event)');
				dragElem.id = 'pr' + fridgeProducts.length;
				dragElem.textContent = inputProdName.charAt(0).toUpperCase() + inputProdName.substr(1);
				fridge.appendChild(dragElem);
				document.getElementById(dragElem.id).style.backgroundImage = img;
				nameProd.value = '';
				nameProd.setAttribute('placeholder','Имя продукта...');
				nameProd.classList.remove('alert-danger');
				document.querySelector('#fridge>p>span').textContent = ''+fridgeProducts.length;
			}
	}
	function pushResult(){
			var cook = Icebox.outRecipes(productList);
			if(cook == '' || productList.length < 3){
				productList = [];
				alert('На столе нет необходимых продуктов, либо из них ничего не приготовить.');
				var elems = document.getElementById('wrapprod');
				while(elems.firstChild){
					elems.removeChild(elems.firstChild);
					}
				}
			else{
				resultProducts.push(cook);
				var resProd = document.createElement('div');
				resProd.className = 'dragElements';
				resProd.id = 'resProd' + resultProducts.length;
				resProd.textContent = cook.charAt(0).toUpperCase() + cook.substr(1);
				if(products.indexOf(cook)!= (-1)){
					var img = Icebox.outImgSrc(cook);
					}
				document.getElementById('outProducts').appendChild(resProd);
				document.getElementById(resProd.id).style.backgroundImage = img;
				var elems = document.getElementById('wrapprod');
				while(elems.firstChild){
					elems.removeChild(elems.firstChild);
					}
				document.querySelector('#outProducts>p>span').textContent = ''+resultProducts.length;
				productList = [];
				}
			}

	function clickRecipes(idParentList){
				var menuItem = document.querySelectorAll('#' + idParentList + '>.ingredient');
				if(+getComputedStyle(menuItem[0],null).opacity === 0){
					for(var i = 0; i < menuItem.length; i++){
						menuItem[i].style.cssText = "opacity: 1; display: block;";	
					}
				}
				else{
					for(var i = 0; i < menuItem.length; i++){
						menuItem[i].style.cssText = "opacity: 0; display: none;";
					}
				}
			}
}
	

		
//JQ fail... >,<
/*	$(".kitchen").droppable({
		accept: ".drag",
		drop: function(ev,ui){
			var dropProduct = $(ui.draggable).clone();
			if(productList.indexOf(dropProduct.text()) != (-1)) {
				alert("Здесь уже есть " + dropProduct.text());
			}
			else {
				productList.push(dropProduct.text());
				$(".kitchen>#wrapprod").append(dropProduct.draggable());
			}			
		}
	});

	$("#cookingProducts").on('click', function() {
		var cook = Icebox.outRecipes(productList);
		if(cook === '' || productList.length < 2) {
			alert('На столе нет необходимых продуктов продуктов, либо из них ничего не приготовить.');
			$("#wrapprod>div").remove();
			productList
		}
		else{
		alert('Результатом будет: ' + cook);
		resultProducts.push(cook);
		$("#outProducts>p>span").text(resultProducts.length);
		$("#wrapprod>div").remove();
		$("#outProducts").append('<div class="drag" id="' + 'rp' + resultProducts.length +'">' + cook.charAt(0).toUpperCase() + cook.substr(1) + '</div>');
		$("#rp"+resultProducts.length).css({
			"background-image": Icebox.outImgSrc(cook)
		});
		productList = [];
		}
	});*/