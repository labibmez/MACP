var divId;
function loadScreen(divID)
{
    divId=divID;
       myApp.showPreloader();
            $.ajax({ 
                    type: "GET", 
                    dataType:"json",   
                    url: "http://192.168.1.47:92/MobileAPI.svc/GetRelatedItemScreen/"+divID+"/"+itemId+"/244",
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
function menuTabClick(divID,butDiv)
{           
    $("button").siblings(".selectedTab").removeClass('selectedTab');
    $('#'+butDiv).addClass('selectedTab');   
    if(!($('#'+butDiv).hasClass('loaded')))
    {
        $('#'+butDiv).addClass('loaded');                                                   
        document.getElementById(divID).innerHTML="<button onclick='loadScreen(\""+divID+"\")'>"+divID+"</button>";

    }
    $("div").siblings(".Active").removeClass('Active');
    $('#'+divID).addClass('Active');           
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
    }else
    {
        var formData = myApp.formToData('#my-mainData-form');
        parameters=JSON.stringify(formData);   
        UpdateItem(parameters);
    }
});



$$('.edit-relatedItem-form-to-data').on('click', function(){
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
        var formData = myApp.formToData('#my-relatedItem-form');
        parameters=JSON.stringify(formData);
            setTimeout(function() { UpdateRelatedItem(parameters); }, 1000) ;

       
    }
});

function UpdateRelatedItem(parameters)
{
     var data="{"+  
        "\"mainItemId\":\""+itemId+"\","+
        "\"relatedItemId\":\"244\","+
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
                    myApp.alert("successful");
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

function UpdateItem(parameters)
{
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
 