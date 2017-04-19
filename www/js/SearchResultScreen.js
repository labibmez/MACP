var loading = false;
var selectedItem; 
var SearchResultScreen_JSFlag;
var itemRef;
function editItem(id,reference){ 
    itemId=id;
    itemRef=reference;
    mainView.router.load({url: "editScreen.html" ,reload:false,ignoreCache:true});  
}   