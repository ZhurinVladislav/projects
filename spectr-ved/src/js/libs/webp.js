function testWebp(A){let e=new Image;e.onload=e.onerror=function(){A(2==e.height)},e.src="data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA"}testWebp(function(A){document.documentElement.classList.add(!0===A?"webp":"no-webp")});