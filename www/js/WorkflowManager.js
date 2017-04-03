function startWorkflow_ButtonAction(itemId){
    myApp.showPreloader();
    selectedItem=itemId;
    var url='http://'+ sessionStorage.getItem('Ip_config')+':'+sessionStorage.getItem('Ip_port')+'/MobileAPI.svc/StartWorkFlowButtonAction';
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
                            if(data.runningWF!=undefined)
                                  myApp.alert(data.runningWF,'MACP',function(){
                                     myApp.closeModal(".popup",true);
                                  });
                            if(data.noPublishedWF!=undefined)
                                {
                                     myApp.alert(data.noPublishedWF,'MACP',function(){
                                     myApp.closeModal(".popup",true);
                                  });
                                }
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