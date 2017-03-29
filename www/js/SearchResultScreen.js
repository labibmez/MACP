var loading = false;
var selectedItem; 
// Last loaded index
var lastIndex = 30; 
// Max items to load
var maxItems = 120;
var SearchResultScreen_JSFlag;
var itemId;
 
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

                  
function startWorkflowFromSearchGrid(itemId){
    myApp.showPreloader();
    selectedItem=itemId;
    var url='http://'+ sessionStorage.getItem('Ip_config')+':'+sessionStorage.getItem('Ip_port')+'/MobileAPI.svc/StartWorkFlowFromSearchGrid';
    var  ProfilesList=GenerateResponseArray(sessionStorage.getItem("ProfilesList")); 
    var  GroupsList=GenerateResponseArray(sessionStorage.getItem("GroupsList")); 
     ProfilesList=JSON.stringify(ProfilesList); 
     GroupsList =JSON.stringify(GroupsList);   
     var popupWidth=window.innerWidth*0.8;
    popupWidth=Math.floor(popupWidth);
     var data="{"+          
        "\"entityName\":\""+currentItem+"\","+  
        "\"itemId\":\""+itemId+"\"," +
        "\"profilesList\":"+ProfilesList+","+
        "\"groupsList\":"+GroupsList+","+   
        "\"popupWidth\":\""+popupWidth+"\","+
        "\"popupHeight\":\""+470+"\"}";    
    console.log("SearchParams",data);                
    $.ajax({             
        type: 'POST',               
        url: url,                    
        contentType: "text/plain",                          
        dataType: "json",                              
        data: data,         
        success: function(data) {                 
            
            manageStartWorkFlowResponse(data); 
          
           
        },
        error: function(e) {         
            verifconnexion = false;  
        }                           
    });    
}  

function editItem(id){ 
    itemId=id;
    mainView.router.load({url: "editScreen.html" ,reload:false,ignoreCache:true});  
}
function manageStartWorkFlowResponse(data){
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
                            myApp.popup('<div class="popup" style="width: 80% !important; top: 10% !important;left: 10% !important; margin-left: 0px !important; margin-top: 0px !important; position:absoloute !important" >'+data.Content+'</div>', true);
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
    myApp.showPreloader(); 
    var url='http://'+ sessionStorage.getItem('Ip_config')+':'+sessionStorage.getItem('Ip_port')+'/MobileAPI.svc/StartWorkFlow';
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
        data: data,         
        success: function(data) { 
             HomeBackButton.style.visibility="hidden";  
             myApp.hidePreloader(); 
             myApp.closeModal('.popup');
             mainView.router.back({force:true,pageName:"homePage"});   
        },
        error: function(e) {       
            console.log(e.message);      
                         
        }                           
    });   
     
   
}

 