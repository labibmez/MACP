function stopWorkflow()
{
   var comment=document.getElementById("stopWorkflowComment").value; 
    
   myApp.closeModal();
   myApp.showPreloader();
    var url='http://'+ sessionStorage.getItem('Ip_config')+':'+sessionStorage.getItem('Ip_port')+'/MobileAPI.svc/StopWorkflow';
    var data="{"+       
        "\"taskId\":\""+TaskId+"\"," +
        "\"userId\":\""+sessionStorage.getItem("userId")+"\"," +
        "\"mainItemId\":\""+itemId+"\"," +    
        "\"comment\":\""+comment+"\"," +
       "\"workflowName\":\""+ExecutedWorkflowName+"\"," +
        "\"userShortName\":\""+setUser_ShortName(sessionStorage.getItem("userShortName"))+"\"}";
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
                    mainView.router.back({force:true,pageName:"homePage"});          
                }
            else                     
                { 
                    myApp.hidePreloader();
                }
        },
        error: function(e) {         
            console.log(e.message);  
            verifconnexion = false;        
            myApp.hidePreloader();                  
        }                             
    });     
}      
$$('.stop-Workflow-form-to-data').on('click', function(){
     showcommentPopup();
});

function enabledButton(textarea)
{
   
    var stopWorkflowButton=document.getElementById("stopWfYesButton");
    if(textarea.value.length!=0)
        {
            stopWorkflowButton.className ="button button-fill active";
        }
    else
    {
        stopWorkflowButton.className ="button button-fill disabled";
    }
    
      
}  
function showcommentPopup()          
{
     myApp.popup('<div class="popup" style="width: 40% !important; height: 40% !important; top: 30% !important;left: 30% !important; margin-left: 0px !important; margin-top: 0px !important; position:absoloute !important background : #f1f1f1 !important;" ><div class="content-block-title">'+stopWFMessage+'</div><div class="list-block" ><ul><li class="align-top"><div class="item-content"><div class="item-media"></div><div class="item-inner"><div class="item-input"><textarea id="stopWorkflowComment" onkeyup="enabledButton(this)"></textarea></div></div></div></li></ul></<div><br><br><div class="row"><div class="col-50"><a href="#" class="button button-fill disabled" onclick="stopWorkflow()" id="stopWfYesButton">Yes</a></div><div class="col-50"><a href="#" class="button button-fill active" onclick="myApp.closeModal()">No</a></div></div></div>', true);
}     


