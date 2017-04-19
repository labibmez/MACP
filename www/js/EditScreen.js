var divId;
var EditScreen_JSFlag;
var engine="classicms";
var relatedItemId;
var fileUploadedName;
var fileData;
var fileUploadedData;
var isDuplicate;
function loadRelatedItemPopup(id,isDuplicateAction)
{ 
       relatedItemId=id;
       isDuplicate=isDuplicateAction;

       myApp.showPreloader();
            $.ajax({ 
                    type: "GET", 
                    dataType:"json",   
                    url: "http://"+sessionStorage.getItem('Ip_config')+":"+sessionStorage.getItem('Ip_port')+"/MobileAPI.svc/GetRelatedItemScreen/"+divId+"/"+itemId+"/"+id,
                    success: function(data) { 
                        myApp.popup('<div class="popup" style="width: 80% !important; top: 10% !important;left: 10% !important; margin-left: 0px !important; margin-top: 0px !important; position:absoloute !important background : #f1f1f1 !important;" >'+data.content+'</div>', true);
                        loadJSFile("js/EditScreen.js"); 
                        myApp.hidePreloader();
                    }, 
                    error: function(e) {
                       myApp.alert("error occured");       
                    }   
            });   
}


function manageAttechementElement()
{
    document.getElementById("uploadBtn").onchange = function () {
    document.getElementById("uploadFile").value = this.value;
   var file=this.files[0];
    fileUploadedName=file.name;
   var reader  = new FileReader();
     reader.onloadend = function(evt) {
        console.log("read success");
        console.log(evt.target.result);
        fileUploadedData= evt.target.result.split(',')[1];
    };
    reader.readAsDataURL(file);
} 
            
}   
    


function loadScreen(divID,screenEngine)     {
     var data="{"+             
        "\"screenName\":\""+divId+"\","+ 
        "\"mainItemId\":\""+itemId+"\"," +
        "\"screenEngine\":\""+screenEngine+"\","+
        "\"screenWidth\":\""+window.innerWidth+"\"," +
        "\"screenHeight\":\""+window.innerHeight+"\"}"; 
       myApp.showPreloader();
            $.ajax({    
                    type: "POST", 
                    url: "http://"+sessionStorage.getItem('Ip_config')+":"+sessionStorage.getItem('Ip_port')+"/MobileAPI.svc/GetLoadEditTabFrame",
                    contentType: "text/plain",                          
                    dataType: "json",                      
                    data: data, 
                    success: function(data) { 
                        document.getElementById(divID).innerHTML=data.content;                     
                        //loadJSFile("js/EditScreen.js");   
                        myApp.hidePreloader();
                        console.log(screenEngine);
                        if(screenEngine==="attachement")
                            {
                               
                                myApp.accordionOpen(".accordion-item");
                                manageAttechementElement();
                            }

                    },   
                    error: function(e) {
                       myApp.alert("error occured"+e);          
     
            myApp.hidePreloader();  
                    }   
            });           
}
           
function deleteRelatedItem(id, culture, confirmationMessage)
{
        myApp.confirm(confirmationMessage, function () { 
            deleteItem(id,culture);
    });
}

function deleteItem(id,culture){
         var data="{"+             
        "\"screenName\":\""+divId+"\","+
        "\"itemId\":\""+id+"\"," +
        "\"beforeCheck\":\"false\"," +
        "\"remoteAddress\":\"\","+
        "\"culture\":\""+sessionStorage.getItem("language")+"\"," +
        "\"userId\":\""+sessionStorage.getItem("userId")+"\"," +
        "\"spName\":\"\","+
        "\"groupingSetShortname\":\"\","+            
        "\"mcData\":\"\"}"; 
       myApp.showPreloader();
            $.ajax({  
                    type: "POST", 
                    url: "http://"+sessionStorage.getItem('Ip_config')+":"+sessionStorage.getItem('Ip_port')+"/MobileAPI.svc/DeleteItem",
                    contentType: "text/plain",                          
                    dataType: "json",                      
                    data: data, 
                    success: function(data) {                            
                        myApp.hidePreloader();
                        myApp.alert(data.status, function () {                        
                            loadScreen(divId,engine);      
                        });
                    },    
                    error: function(e) {
                       myApp.alert("error occured"+e);          
     
            myApp.hidePreloader();  
                    }   
            });     
}

function menuTabClick(divID,butDiv,screenEngine)
{         
    divId=divID;
    engine=screenEngine;
    $("button").siblings(".selectedTab").removeClass('selectedTab');                
    $('#'+butDiv).addClass('selectedTab');   
    if(!($('#'+butDiv).hasClass('loaded')))  
    {
        $('#'+butDiv).addClass('loaded');             
        loadScreen(divID,screenEngine);
        
    }
    $("div").siblings(".Active").removeClass('Active');
    $('#'+divID).addClass('Active');    
     
}
  

$$('.startWF-From-Edit-Screen-form-to-data').on('click', function(){
    
    startWorkflow_ButtonAction(itemId);
});

function generateDocumentMenu(){
   
myApp.popup('<div id="documentMenuPopup" class="popup" style="width: 60% !important; top: 10% !important;left: 20% !important; margin-left: 0px !important; margin-top: 0px !important; position:absoloute !important background : #f1f1f1 !important;" >'+docMenu+'</div>', true);
}

function generateDocument(documentName,item){
     var url="http://"+sessionStorage.getItem('Ip_config')+":"+sessionStorage.getItem('Ip_port')+"/MobileAPI.svc/ExportReport";
    
          var data="{"+  
        "\"entityType\":\""+item+"\"," +
        "\"fileName\":\""+documentName+"\"," +
        "\"format\":\"pdf\","+
        "\"itemID\":\""+itemId+"\","+
        "\"userId\":\""+sessionStorage.getItem("userId")+"\"}";
$.ajax({             
        type: 'POST',           
        url: url,                  
        contentType: "text/plain",                          
        dataType: "json",   
        data : data, 
        success: function(data) {     
    if(device.manufacturer.toLowerCase()==="apple")
        {        
        var ref = cordova.InAppBrowser.open("data:application/pdf;base64,"+data.content,'_blank', 'location=no,closebuttoncaption=X,toolbarposition=top');
        }
    else
        myApp.alert("android still to check with daly");
//        document.getElementById("device").innerHTML="<a href=' window.open(decodeURIComponent(window.atob("+streamPDF+")), '_system', 'toolbar=yes,scrollbars=yes,resizable=yes,left=500,width=400,height=400')'>azerty</a>">;
   //  window.open('http://192.168.1.47:92/ergon.pdf', '_system', 'toolbar=yes,scrollbars=yes,resizable=yes,left=500,width=400,height=400');

        },
        error: function(e) {
                myApp.alert("error "+e.message);

        }                
    }); 
    //myApp.alert(item+"labib "+documentName);
}
$$('.edit-mainData-form-to-data').on('click', function(){
    var i;
    var indexToSelect=1;
    var isValid = true;
    var textBox=$("form div.requiredItem.textbox input" )
    for (i = 0; i < textBox.length; i++) 
    {

        if($(textBox[i]).val().replace(/\s/g, '')==="")
        {
            $(textBox[i]).closest("div.item-inner").addClass("requiredIcon");
            isValid=false;            
        }
        else
        {
            $(textBox[i]).closest("div.item-inner").removeClass("requiredIcon");
        }
    }
    var dateOnly=$("form div.requiredItem.dateonly input" )
    for (i = 0; i < dateOnly.length; i++) 
    {
        if($(dateOnly[i]).val().replace(/\s/g, '')==="")
        {
            $(dateOnly[i]).closest("div.item-inner").addClass("requiredIcon");
            isValid=false;
        }
        else
        {
            $(dateOnly[i]).closest("div.item-inner").removeClass("requiredIcon");
        }
    }
    var comboBox=$("form div.requiredItem.combobox div.item-after" )
    for (i = 0; i < comboBox.length; i++)
    {
        if($(comboBox[i]).html().replace(/\s/g, '')==="")
        {
            $(comboBox[i]).closest("div.item-inner").addClass("requiredIcon");
            isValid=false;
        }
        else
        {
            $(comboBox[i]).closest("div.item-inner").removeClass("requiredIcon");
        }            
    }  
    var checkBox=$("form div.requiredItem.checkbox label.label-checkbox")
    for (i = 0; i < checkBox.length; i++)
    {
        if($(checkBox[i]).find("input").is(":checked")==false)
        {
            $(checkBox[i]).addClass("requiredIcon");
            isValid=false;
        }
        else
        {
            $(checkBox[i]).removeClass("requiredIcon");
        }
    }
    if(!isValid)
    {
       $(x[indexToSelect]).next().children().first().focus();
    }
    else
    {
        if(engine==="classicms")
            {
            mainData_SaveEvent();
            }
        else if(engine==="attachement")
            {
            attachement_SaveEvent();
            }
    }
});

function mainData_SaveEvent()
{
     var formData = myApp.formToData('#my-mainData-form');
        parameters=JSON.stringify(formData);   
        UpdateItem(parameters);
}

function attachement_SaveEvent()
{
    setTimeout( uploadAttachementFile(),1000);
}

function testclick(msg){
    var i;
    var indexToSelect=1;
    var isValid = true;
    var textBox=$("form div.requiredItem.textbox input" )
    
    for (i = 0; i < textBox.length; i++) 
    {
        if($(textBox[i]).val().replace(/\s/g, '')==="")
        {
            $(textBox[i]).closest("div.item-inner").addClass("requiredIcon");
            isValid=false;            
        }
        else
        {
            $(textBox[i]).closest("div.item-inner").removeClass("requiredIcon");
        }
    }
    var dateOnly=$("form div.requiredItem.dateonly input" )
    for (i = 0; i < dateOnly.length; i++) 
    {
        if($(dateOnly[i]).val().replace(/\s/g, '')==="")
        {
            $(dateOnly[i]).closest("div.item-inner").addClass("requiredIcon");
            isValid=false;
        }
        else
        {
            $(dateOnly[i]).closest("div.item-inner").removeClass("requiredIcon");
        }
    }
    var comboBox=$("form div.requiredItem.combobox div.item-after" )
    for (i = 0; i < comboBox.length; i++)
    {
        if($(comboBox[i]).html().replace(/\s/g, '')==="")
        {
            $(comboBox[i]).closest("div.item-inner").addClass("requiredIcon");
            isValid=false;
        }
        else
        {
            $(comboBox[i]).closest("div.item-inner").removeClass("requiredIcon");
        }            
    }  
    var checkBox=$("form div.requiredItem.checkbox label.label-checkbox")
    for (i = 0; i < checkBox.length; i++)
    {
        if($(checkBox[i]).find("input").is(":checked")==false)
        {
            $(checkBox[i]).addClass("requiredIcon");
            isValid=false;
        }
        else
        {
            $(checkBox[i]).removeClass("requiredIcon");
        }
    }
    if(!isValid)
    {
       $(x[indexToSelect]).next().children().first().focus();
    }else
    {
        var formData = myApp.formToData('#my-relatedItemPopup-form');
        parameters=JSON.stringify(formData);        
        setTimeout(function() { UpdateRelatedItem(parameters,msg); }, 1000) ;

       
    }
}

function UpdateRelatedItem(parameters,msg){
    var updateId = relatedItemId;    
    if(isDuplicate==="isDuplicate")
        updateId=0;
     var data="{"+  
        "\"mainItemId\":\""+itemId+"\","+
        "\"relatedItemId\":\""+updateId+"\","+
        "\"screenName\":\""+divId+"\","+ 
        "\"userId\":\""+sessionStorage.getItem("userId")+"\"," +
        "\"parameters\":"+parameters+"}";  
     myApp.showPreloader();
     var url='http://'+sessionStorage.getItem('Ip_config')+':'+sessionStorage.getItem('Ip_port')+'/MobileAPI.svc/SaveRelatedItem';

     $.ajax({             
        type: 'POST',           
        url: url,                  
        contentType: "text/plain",                           
        dataType: "json",                            
        data: data,             
        success: function(data) {     
            
            if(data.status==="ok")
                {
                    myApp.hidePreloader();
                        myApp.alert(msg, function () {
                        loadScreen(divId,engine);

                        });
 myApp.closeModal(".popup",true);
                                           
                }
            else 
                { 
                    myApp.hidePreloader();
                    myApp.alert("error saving");
                }
        },
        error: function(e) {         
             
            console.log(e.message);  
            verifconnexion = false;        
            myApp.hidePreloader(); 
      
                             
        }                           
    }); 
}

function uploadAttachementFile()
{
  var formData = myApp.formToData('#my-attachment-form');
        parameters=JSON.stringify(formData);
        myApp.showPreloader();
        var url='http://'+sessionStorage.getItem('Ip_config')+':'+sessionStorage.getItem('Ip_port')+'/MobileAPI.svc/AttachFile';
     var data="{"+  
        "\"mainItemId\":\""+itemId+"\","+
        "\"screenName\":\""+divId+"\","+ 
        "\"fileName\":\""+fileUploadedName+"\","+ 
        "\"fileData\":\""+fileUploadedData+"\","+ 
        "\"userId\":\""+sessionStorage.getItem("userId")+"\"," +
        "\"userShortName\":\""+setUser_ShortName(sessionStorage.getItem("userShortName"))+"\"," +
        "\"parameters\":"+parameters+"}";  
  $.ajax({             
        type: 'POST',           
        url: url,                  
        contentType: "text/plain",                           
        dataType: "json",                            
        data: data,             
        success: function(data) {       
            if(data.status==="ok")
                {
                    myApp.hidePreloader();
                    loadScreen(divId,engine);                      
                }
            else 
                { 
                    myApp.hidePreloader();
                    myApp.alert("error saving");
                }
        },
        error: function(e) {         
             
            console.log(e.message);  
            verifconnexion = false;        
            myApp.hidePreloader();                  
        }                           
    });   
     
}
function fileDetail()
{
    myApp.alert("clic");
}
function UpdateItem(parameters){

      var data="{"+  
        "\"mainItemId\":\""+itemId+"\","+
        "\"screenName\":\""+currentItem+"\","+
        "\"userId\":\""+sessionStorage.getItem("userId")+"\"," +
        "\"parameters\":"+parameters+"}";  
     myApp.showPreloader();
     var url='http://'+sessionStorage.getItem('Ip_config')+':'+sessionStorage.getItem('Ip_port')+'/MobileAPI.svc/UpdateItem';

     $.ajax({             
        type: 'POST',           
        url: url,                  
        contentType: "text/plain",                           
        dataType: "json",                            
        data: data,             
        success: function(data) {     
            myApp.hidePreloader();
            if(data.status==="ok")
                {
                    
                    myApp.alert("successful");
                }
            else
                {
                      myApp.alert("error saving");
                }
        },
        error: function(e) { 
            console.log(e.message);  
            verifconnexion = false;        
            myApp.hidePreloader(); 
   
                             
        }                           
    });    
} 





function downloadAsset(fileName) {
  var assetURL = "https://raw.githubusercontent.com/cfjedimaster/Cordova-Examples/master/readme.md";  
  var  store = cordova.file.dataDirectory;
    var fileTransfer = new FileTransfer();
    fileTransfer.download(assetURL, store + fileName, 
        function(entry) {
            console.log("Success!");  
        }, 
        function(err) {
            console.log("Error");
        });
}  

    /*
       window.requestFileSystem(  
                    LocalFileSystem.PERSISTENT, 0,  
                    function onFileSystemSuccess(fileSystem) {  
                    fileSystem.root.getFile(  
                                fileName, {create: true, exclusive: false},  
                                function gotFileEntry(fileEntry){  
                                var sPath = fileEntry.fullPath.replace(fileName,"");  
                                var fileTransfer = new FileTransfer();  
                                fileEntry.remove();  
                                fileTransfer.download(  
                                           "http://www.w3.org/2011/web-apps-ws/papers/Nitobi.pdf",  
                                           sPath + "theFile.pdf",  
                                           function(theFile) {  
                                           console.log("download complete: " + theFile.toURI());  
                                           showLink(theFile.toURI());  
                                           },  
                                           function(error) {  
                                           console.log("download error source " + error.source);  
                                           console.log("download error target " + error.target);  
                                           console.log("upload error code: " + error.code);  
                                           }  
                                           );  
                                },  
                                fail);  
                    },  
                    fail);  
     }  
       
     function fail(evt) {  
       console.log(evt.target.error.code);  
     }  
*/





 