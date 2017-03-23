function loadScreen(divID)
{
       myApp.showPreloader();
            $.ajax({ 
                    type: "GET", 
                    dataType:"json",   
                    url: "http://192.168.1.47:92/MobileAPI.svc/GetRelatedItemScreen/"+divID+"/"+itemId+"/244",
                    success: function(data) { 
                       // document.getElementById(divID).innerHTML=data.content;
                        myApp.popup('<div class="popup" style="width:90% !important; top:50% !important; left:35% !important; right:20% !important;  position:absoloute !important" >'+data.content+'</div>', true);
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
 