var loading = false;
var selectedItem; 
var SearchResultScreen_JSFlag;

function editItem(id,reference,targettab){ 
    itemId=id;
    itemRef=reference;
    targetTab=targettab;
    mainView.router.load({url: "editScreen.html" ,reload:false,ignoreCache:true});  
}    