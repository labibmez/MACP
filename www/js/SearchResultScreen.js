var loading = false;
var selectedItem; 
// Last loaded index
var lastIndex = 30; 
// Max items to load
var maxItems = 120;
 
// Append items per load
var itemsPerLoad = 30;
 
// Attach 'infinite' event handler
$$('.infinite-scroll').on('infinite', function () {
 
  // Exit, if loading in progress
  if (loading) return;
 
  // Set loading flag
  loading = true;
 
  // Emulate 1s loading
  setTimeout(function () {
    // Reset loading flag
    loading = false;
 
    if (lastIndex >= maxItems) {
      // Nothing more to load, detach infinite scroll events to prevent unnecessary loadings
      myApp.detachInfiniteScroll($$('.infinite-scroll'));
      // Remove preloader
      $$('.infinite-scroll-preloader').remove();
      return;
    }  
 
    // Generate new items HTML
    var html = '';
    for (var i = lastIndex + 1; i <= lastIndex + itemsPerLoad; i++) {
      html += '<li class="item-content"><div class="item-inner"><div class="item-title">Item ' + i + '</div></div></li>';
    }
     
    $$('.list-block ul').append(html);
    lastIndex=lastIndex+itemsPerLoad;
  }, 1000);
});        

                  
function startWorkflowFromSearchGrid(itemId)
{
    myApp.showPreloader();
    selectedItem=itemId;
    var url='http://'+ sessionStorage.getItem('Ip_config')+':'+sessionStorage.getItem('Ip_port')+'/MobileAPI.svc/StartWorkFlowFromSearchGrid';
    var  ProfilesList=GenerateResponseArray(sessionStorage.getItem("ProfilesList")); 
    var  GroupsList=GenerateResponseArray(sessionStorage.getItem("GroupsList")); 
     ProfilesList=JSON.stringify(ProfilesList); 
     GroupsList =JSON.stringify(GroupsList);   
     
     var data="{"+          
        "\"entityName\":\""+currentItem+"\","+  
        "\"itemId\":\""+itemId+"\"," +
        "\"profilesList\":"+ProfilesList+","+
        "\"groupsList\":"+GroupsList+","+   
        "\"popupWidth\":\""+900+"\","+
        "\"popupHeight\":\""+470+"\"}";    
    console.log("SearchParams",data);                
    $.ajax({             
        type: 'POST',               
        url: url,                    
        contentType: "text/plain",                          
        dataType: "json",                               
        async: false,                                
        data: data,         
        success: function(data) {                 
            
            manageStartWorkFlowResponse(data); 
          
           
        },
        error: function(e) {       
            console.log(e.message);  
            verifconnexion = false;        
            myApp.hideIndicator();  
                         
        }                           
    });    
}  


function manageStartWorkFlowResponse(data)
{
    switch(data.status)
        {
            case "ok":
                {
                  if(data.response==="defaultwf")
                      {
                          myApp.hidePreloader();
                           myApp.confirm(data.message, 'MACP',
                            function () {
                                       startWorkFlowItem(data.wfId);
                                        },
                                        function () {
                                       
                                            }
                                        );
                      }
                    else if(data.response==="wfStillRunning")
                        {
                              myApp.hidePreloader();
                              myApp.alert(data.message,'MACP');
                        }
                  else
                        {
                            myApp.hidePreloader();
                            myApp.popup('<div class="popup" style="width:90% !important; top:50% !important; left:35% !important; right:20% !important;  position:absoloute !important" >'+data.Content+'</div>', true);
                        }
                    break;
                }
            case "error" :
                {
                  myApp.alert("error in worflow");
                }
        }
}



function startWorkFlowEvent(workflowId,message){
     myApp.confirm(message, 'MACP',
                            function () {
                                startWorkFlowItem(workflowId);
                                        },
                                        function () {
                                        
                                            }
                                        );
}

function startWorkFlowItem(workflowId){
    var url='http://'+ sessionStorage.getItem('Ip_config')+':'+sessionStorage.getItem('Ip_port')+'/MobileAPI.svc/StartWorkFlow';
    myApp.showIndicator();
     var data="{"+          
        "\"itemId\":\""+selectedItem+"\","+  
        "\"workfloawId\":\""+workflowId+"\"," +
        "\"userShortName\":\""+setUser_ShortName(sessionStorage.getItem("userShortName"))+"\","+
        "\"entityName\":\""+currentItem+"\"}";    
     $.ajax({             
        type: 'POST',               
        url: url,                  
        contentType: "text/plain",                          
        dataType: "json",                               
        async: false,                              
        data: data,         
        success: function(data) { 
            myApp.hideIndicator();
             HomeBackButton.style.visibility="hidden";  
            myApp.closeModal();  
             mainView.router.back({force:true,pageName:"homePage"});   
        },
        error: function(e) {       
            console.log(e.message);       
            myApp.hideIndicator();  
                         
        }                           
    });   
     
   
}

 