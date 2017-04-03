var loading = false;
var selectedItem; 
var SearchResultScreen_JSFlag;
var itemId;
 

function editItem(id){ 
    itemId=id;
    mainView.router.load({url: "editScreen.html" ,reload:false,ignoreCache:true});  
}

 




 