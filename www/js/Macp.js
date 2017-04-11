var ip_config;
var ip_port;
var itemId;
var tasks; 
var totalRowNumber;
var languagesList;
var $$ = Dom7;
var pageTitleContent;
var pageTitleElement;
var currentItem;
var searchParams;
var HomeBackButton;
var stopWFMessage;
var TaskId;
var ExecutedWorkflowName;
var myApp=new Framework7({ swipeBackPage : false,statusbarOverlay:true}) ;
// var db = openDatabase('MACPDB', '1.0', 'MACP DB', 50 * 1024 * 1024); 
var mainView = myApp.addView('.view-main', {
  dynamicNavbar: true,
    domCache :true
});
var leftView = myApp.addView('.view-left', {
    dynamicNavbar: true
});
function isScreenInCache(screenName)
{
    var history=mainView.history;
    console.log(screenName);
    for(var i=0 ; i<history.length ; i++)
        {
            if(history[i]===screenName)
                {
                console.log("true");    
                return true;
                }
        }
    console.log("false");   
    return false;
};
function westMenuItem(item,title,screenName){ 
    if(isScreenInCache(screenName))
        {
        mainView.history=["#homePage"];
        document.getElementById("title_"+screenName.replace(".html","")).remove(); 
        document.getElementById("userName_label_"+screenName.replace(".html","")).remove(); 
        document.getElementById("lng_label_"+screenName.replace(".html","")).remove(); 
        $$('.view-main .page-on-left').remove(screenName);
        }
      currentItem=item;
      pageTitleContent=title;
      mainView.router.load({url: screenName,reload:true});   
    mainView.hideToolbar();
};  
myApp.onPageReinit('homePage', function (page) {
      document.getElementById("tasks").innerHTML=null;
     setTimeout(function() {reInitHomePage(); }, 100) ;
     console.log(mainView.history);
});  

function reInitHomePage(){ 
     myApp.showPreloader();
      var url='http://'+ sessionStorage.getItem('Ip_config')+':'+sessionStorage.getItem('Ip_port')+'/MobileAPI.svc/ReInitHomePage';
     var  ProfilesList=GenerateResponseArray(sessionStorage.getItem("ProfilesList")); 
   var  AccessRightUserList=GenerateResponseArray(sessionStorage.getItem("AccessRightUserList")); 
   var  InternalEntitiesShortName=GenerateResponseArray(sessionStorage.getItem("InternalEntitiesShortname"));    
   var  GroupsList=GenerateResponseArray(sessionStorage.getItem("GroupsList"));     
   var  InternalEntities=GenerateResponseArray(sessionStorage.getItem("InternalEntities"));
   ProfilesList=JSON.stringify(ProfilesList); 
   AccessRightUserList =JSON.stringify(AccessRightUserList); 
   GroupsList =JSON.stringify(GroupsList); 
   InternalEntities=JSON.stringify(InternalEntities); 
   InternalEntitiesShortName=JSON.stringify(InternalEntitiesShortName);    
   var data="{"+  
        "\"userid\":\""+sessionStorage.getItem("userId")+"\"," +
        "\"userShortName\":\""+setUser_ShortName(sessionStorage.getItem("userShortName"))+"\"," +
        "\"InternalEntities\":"+InternalEntities+","+
        "\"InternalEntitiesShortName\":"+InternalEntitiesShortName+","+
        "\"ProfilesList\":"+ProfilesList+","+  
        "\"GroupsList\":"+GroupsList+","+    
        "\"AccessRightUserList\":"+AccessRightUserList+","+    
        "\"HomePageConfig\":\""+sessionStorage.getItem("HomePageConfig")+"\","+      
        "\"windowWidth\":\""+window.innerWidth+"\","+
        "\"windowHeight\":\""+(window.innerHeight-90)+"\"}";
     $.ajax({             
        type: 'POST',                             
        url: url,                                  
        contentType: "text/plain",                                      
        dataType: "json",                               
        data: data,      
        success: function(data) {
             document.getElementById("tasks").innerHTML=data.TasksContent;
            console.log("success");
             myApp.hidePreloader();
        },
        error: function(e) {
             myApp.hideIndicator();     
              myApp.alert("error occured in the system");
        }
    });   
};


function saveFirstConfig(){
    ip = document.getElementById('ipFirstConfig').value,
    port = document.getElementById('portFirstConfig').value;
    sessionStorage.setItem('Ip_config', ip);
    sessionStorage.setItem('Ip_port', port);
  //  saveWsConfiguration(ip,port);
    myApp.closeModal();
};       
function loadJSFile(screenName){
    var js = document.createElement("script");
    js.type = "text/javascript";    
    js.src = screenName;
    document.body.appendChild(js);
};

function isScriptAlreadyIncluded(src){
    var scripts = document.getElementsByTagName("script");
    for(var i = 0; i < scripts.length; i++) 
       if(scripts[i].getAttribute('src') == src) return true;
    return false;
}
function verifConfig(){    
    ip_config=sessionStorage.getItem("Ip_config");
    ip_port=sessionStorage.getItem("Ip_port");
    if(ip_config===null || ip_port===null)
      myApp.loginScreen(); 
      myApp.alert("verifConfig");
};  
/*
function verifDeviceConfig()
{
    manageDB();
    getWsConfiguration();
};
*/
var leftView=myApp.addView('.view-left',{
    domCache: true,dynamicNavbar:true
   });
myApp.onPageInit('home', function (page) { 
     HomeBackButton=document.getElementById("homeBackButton");
     myApp.params.swipePanel=false;
    verifConfig();
   // verifDeviceConfig();   
    
}).trigger();                       
myApp.onPageInit('WSConfigurationScreen', function (page) {
    myApp.params.swipePanel=false;    
   loadJSFile("js/WSConfigurationScreen.js");
});   
myApp.onPageInit('homePage', function (page) {   
    //loadJSFile("js/homePage.js");      
     myApp.params.swipePanel=false;    
    setTemplate_HeaderData('homePage');
   setTimeout(function() {loadTaskList(); }, 1000) ;
});                  
myApp.onPageInit('searchScreen', function (page) {
    console.log("Init search screen");
    HomeBackButton.style.visibility="visible";    
    createLanguagesList('searchScreen');
    createLogoutPopover('searchScreen');
    myApp.params.swipePanel=false;
    pageTitleElement=document.getElementById("title_searchScreen");
    console.log(pageTitleElement);
    pageTitleElement.textContent=pageTitleContent;
    console.log(pageTitleContent);
    myApp.showPreloader();
    setTemplate_HeaderData('searchScreen');  
    setTimeout(function() {loadsearchScreen(); }, 1000) ;
  
}); 

myApp.onPageInit('editScreen', function (page) {
    createLanguagesList('editScreen');
    createLogoutPopover('editScreen');
    myApp.params.swipePanel=false;
    myApp.showPreloader();
    pageTitleElement=document.getElementById("title_editScreen");
    pageTitleElement.textContent=pageTitleContent;
    setTemplate_HeaderData('editScreen');
    setTimeout(function() {loadEditScreen(itemId); }, 1000) ;
    
}); 

myApp.onPageInit('newInputScreen', function (page) {
    HomeBackButton.style.visibility="visible"; 
    createLanguagesList('newInputScreen');
    mainView.hideToolbar();  
    createLogoutPopover('newInputScreen');
    myApp.params.swipePanel=false;
    pageTitleElement=document.getElementById("title_newInputScreen");
    pageTitleElement.textContent=pageTitleContent;
    myApp.showPreloader();
    setTemplate_HeaderData('newInputScreen');
    setTimeout(function() {loadNewInputPage(); }, 1000) ;
});              
myApp.onPageInit('searchResultScreen', function (page) {
    HomeBackButton.style.visibility="visible";
    createLanguagesList('searchResultScreen'); 
    createLogoutPopover('searchResultScreen');  
    myApp.params.swipePanel=false;
    pageTitleElement=document.getElementById("title_searchResultScreen");
    pageTitleElement.textContent=pageTitleContent;
    setTemplate_HeaderData('searchResultScreen'); 
     myApp.showPreloader();
      var url='http://'+ sessionStorage.getItem('Ip_config')+':'+sessionStorage.getItem('Ip_port')+'/MobileAPI.svc/GetSearchResultPage';
    console.log("URL",url);
   setTimeout(function() {lunchSearchResult(url); }, 1000) ;
});  

myApp.onPageInit('executeTaskScreen', function (page) {
    HomeBackButton.style.visibility="visible";
    createLanguagesList('executeTaskScreen'); 
    createLogoutPopover('executeTaskScreen');  
    myApp.params.swipePanel=false;
    pageTitleElement=document.getElementById("title_executeTaskScreen");
    pageTitleElement.textContent=pageTitleContent;
    setTemplate_HeaderData('executeTaskScreen'); 
     myApp.showPreloader();
      var url='http://'+ sessionStorage.getItem('Ip_config')+':'+sessionStorage.getItem('Ip_port')+'/MobileAPI.svc/GetExecuteTaskScreen';
    console.log("URL",url);
    setTimeout(function() {GetExecuteTaskScreen(url); }, 1000) ;
});  

function setTemplate_HeaderData(pScreen){
    document.getElementById("userName_label"+"_"+pScreen).textContent=sessionStorage.getItem('userName');
     document.getElementById("lng_label"+"_"+pScreen).textContent=sessionStorage.getItem('language');
    console.log(document.getElementById("userName_label"+"_"+pScreen));
     console.log(document.getElementById("lng_label"+"_"+pScreen));
};  
function loadsearchScreen(){
    GetSearchPage('http://'+sessionStorage.getItem('Ip_config')+':'+sessionStorage.getItem('Ip_port')+'/MobileAPI.svc/GetSearchScreen/'+currentItem);
   
};       
function loadTaskList() {
     tasks=document.getElementById('tasks');
     var deviceWidth = window.innerWidth - 50;
      GetHomePage('http://'+sessionStorage.getItem('Ip_config')+':'+sessionStorage.getItem('Ip_port')+'/MobileAPI.svc/getHomePage');  
}; 
function loadNewInputPage(){
    currentItem=currentItem.toLowerCase();
    var url='http://'+sessionStorage.getItem('Ip_config')+':'+sessionStorage.getItem('Ip_port')+'/MobileAPI.svc/GetNewInputScreen/'+currentItem;
    GetNewInputScreen(url);
};  


function loadEditScreen(itemId)
{
    var url='http://'+sessionStorage.getItem('Ip_config')+':'+sessionStorage.getItem('Ip_port')+'/MobileAPI.svc/GetEditScreen';
    GetEditScreen(url,itemId);
}; 

function GetEditScreen(url,itemId){ 
     var data="{"+            
        "\"screenName\":\""+currentItem+"\","+
        "\"mainItemId\":\""+itemId+"\"," +  
        "\"screenEngine\":\"empty\","+
        "\"screenWidth\":\""+window.innerWidth+"\"," +
        "\"screenHeight\":\""+window.innerHeight+"\"}";  
    
    $.ajax({ 
                    type: "POST", 
                    dataType:"json",  
                    url: url,
                    contentType: "text/plain",                          
                    dataType: "json",                      
                    data: data, 
                    success: function(data) { 
                        console.log(data);
                        document.getElementById("editScreenForm").innerHTML=data.content;
                         $('#edit-toolbarContent').append(data.StarWFButton);
                        $('#edit-toolbarContent').append(data.Savebutton);
                        loadJSFile("js/EditScreen.js");
                        loadJSFile("js/WorkflowManager");
                         myApp.hidePreloader();
                    },
                    error: function(e) {
                       myApp.alert("error occured");      
                    }   
            });         
};                
function GetNewInputScreen(url){
    $.ajax({ 
                    type: "GET", 
                    dataType:"json",  
                    url: url,
                    success: function(data) {                   
                         mainView.showToolbar();
                        document.getElementById("newInputForm").innerHTML=data.content;
                        document.getElementById("newInput-toolbarContent").innerHTML=data.button;
                        mainView.showToolbar();
                        loadJSFile("js/NewInputScreen.js");
                         myApp.hidePreloader();
                    },
                    error: function(e) {
                       myApp.hidePreloader();
                       myApp.alert("error occured");
                          
                    }    
            });         
};
function GetSearchPage(url){ 
    $.ajax({ 
                    type: "GET", 
                    dataType:"json",  
                    url: url,
                    success: function(data1) { 
                        document.getElementById("searchForm").innerHTML=data1;
                        loadJSFile("js/SearchScreen.js");
                        loadJSFile("js/FormatUtils.js");
                        loadJSFile("js/accounting.js");
                         myApp.hidePreloader();
                    },
                    error: function(e) {
                       myApp.alert("error occured");      

                    }  
                 
            });    
};  
function GenerateResponseArray(element){ 
   var res = element.split(",");
   var result = [];//Array
    if(res.length!=0)
    {
    for (var i = 0; i < res.length; i++) 
      {
          if(res[i]!="")
            result.push(res[i]);
      }
    }
    return result;        
}; 
function setUser_ShortName(userShortName){
    var res = userShortName.split('\\');
    return res[0]+'\\\\'+res[1];
    
};  
function GetHomePage(url) {
   var  ProfilesList=GenerateResponseArray(sessionStorage.getItem("ProfilesList")); 
   var  AccessRightUserList=GenerateResponseArray(sessionStorage.getItem("AccessRightUserList")); 
   var  InternalEntitiesShortName=GenerateResponseArray(sessionStorage.getItem("InternalEntitiesShortname"));    
   var  GroupsList=GenerateResponseArray(sessionStorage.getItem("GroupsList"));     
   var  InternalEntities=GenerateResponseArray(sessionStorage.getItem("InternalEntities"));
   ProfilesList=JSON.stringify(ProfilesList); 
   AccessRightUserList =JSON.stringify(AccessRightUserList); 
   GroupsList =JSON.stringify(GroupsList); 
   InternalEntities=JSON.stringify(InternalEntities); 
   InternalEntitiesShortName=JSON.stringify(InternalEntitiesShortName);    
   var data="{"+  
        "\"userid\":\""+sessionStorage.getItem("userId")+"\"," +
        "\"userShortName\":\""+setUser_ShortName(sessionStorage.getItem("userShortName"))+"\"," +
        "\"InternalEntities\":"+InternalEntities+","+
        "\"InternalEntitiesShortName\":"+InternalEntitiesShortName+","+
        "\"ProfilesList\":"+ProfilesList+","+  
        "\"GroupsList\":"+GroupsList+","+    
        "\"AccessRightUserList\":"+AccessRightUserList+","+    
        "\"HomePageConfig\":\""+sessionStorage.getItem("HomePageConfig")+"\","+      
        "\"windowWidth\":\""+window.innerWidth+"\","+
        "\"windowHeight\":\""+(window.innerHeight-90)+"\"}";  
    var dataToReturn = 'null';    
     $.ajax({             
        type: 'POST',                             
        url: url,                                
        contentType: "text/plain",                                    
        dataType: "json",                               
        data: data,    
        success: function(data) {
             document.getElementById("tasks").innerHTML=data.TasksContent;
            // document.getElementById("westMenu").innerHTML=data.WestMenuContent;
            // leftView.innerHTML=data.WestMenuContent;
            $.getScript("js/Macp.js");
            $('.view-left').html(data.WestMenuContent);
            $("script[src='js/Macp.js']").remove();
            sessionStorage.setItem("Languages",data.Languages);
             var languages=sessionStorage.getItem('Languages');
             languagesList = JSON.parse(languages); 
             createLanguagesList('homePage');
             createLogoutPopover('homePage'); 
             myApp.hidePreloader();
               
               
           
        },
        error: function(e) {  
             myApp.hideIndicator();     
              myApp.alert("error occured in the system");
        }
    });          
             
};  
function createLanguagesList(screen){
    $$('.create-language-links-'+screen).on('click', function () {
  var clickedLink = this;
    var output="";
    for(var i=0 ; i< languagesList.LangsList.length ; i++)
        { 
            var display=languagesList.LangsList[i].display;
            output=output+'<li><a href="#" class="item-link list-button">'+display  +'</li>';
        }
  var popoverHTML = '<div class="popover">'+
                      '<div class="popover-inner">'+
                        '<div class="list-block">'+
                          '<ul>'+
                           output
                          '</ul>'+
                        '</div>'+
                      '</div>'+
                    '</div>'
  myApp.popover(popoverHTML, clickedLink); 
});
};  
function createLogoutPopover(screen){
    $$('.create-profile-links-'+screen).on('click', function () {
  var clickedLink = this;
    var output="";

            output=output+'<li><a href="#" onclick="logoutAction();" class="item-link list-button">Logout</li>';
        
  var popoverHTML = '<div class="popover">'+
                      '<div class="popover-inner">'+
                        '<div class="list-block">'+
                          '<ul>'+
                           output
                          '</ul>'+
                        '</div>'+
                      '</div>'+
                    '</div>'
  myApp.popover(popoverHTML, clickedLink);
});
};          
function logoutAction(){
            sessionStorage.clear();        
        mainView.router.load({url: 'index.html'});
        location.reload(true);
};
function lunchSearchResult(url){           
     var data="{"+    
        "\"item\":\""+currentItem+"\","+
        "\"userid\":\"1\"," +
        "\"searchParams\":"+searchParams+","+
        "\"start\":\"0\","+
        "\"limit\":\"30\","+      
        "\"windowWidth\":\""+window.innerWidth+"\","+
        "\"windowHeight\":\""+(window.innerHeight-90)+"\"}";  
    console.log("SearchParams",data);          
    $.ajax({             
        type: 'POST',           
        url: url,                      
        contentType: "text/plain",                          
        dataType: "json",                            
        data: data,         
        success: function(data) {   
            
            document.getElementById("searchResult").innerHTML=data.dataGrid;  
            totalRowNumber=data.TotalRows;
            console.log(totalRowNumber);
             var tasksTableElement =document.getElementById("tasksTableElement");
             myApp.attachInfiniteScroll(tasksTableElement);
            loadJSFile("js/infiniteScroll.js");
            loadJSFile("js/WorkflowManager.js");
            loadJSFile("js/SearchResultScreen.js");
            myApp.hidePreloader();
            
        },  
        error: function(e) { 
            console.log(e.message);  
            verifconnexion = false;  
            
            myApp.hidePreloader();
            myApp.alert("error occured");
 
                         
        }                           
    });    
};         
function generateConnectedComboItems(idChild,screenTagName,val,child,entity){ 
    var url =  "http://"+sessionStorage.getItem('Ip_config')+":"+sessionStorage.getItem('Ip_port')+"/MobileAPI.svc/ConnectedComboOptions/"+val.value+"/"+screenTagName+"/"+child+"/"+entity;
    setTimeout(function() {connectedComboOptions(url,idChild);},100);       

}; 
function connectedComboOptions(url,idChild) {
    $.ajax({ 
                    type: "GET", 
                    dataType:"json",
                    url:url,
                    success: function(data1) {      
                        document.getElementById(idChild).innerHTML=data1;                                            
                    },
                    error: function(jqXHR, textStatus, errorThrown) {
                        console.log(errorThrown+'  in processing!'+textStatus);
                    }                
            });        
};
function HomeBack(){
    HomeBackButton.style.visibility="hidden";       
    mainView.router.back({force:true,pageName:"homePage"});
    
};
/*
function manageDB(){
     db.transaction(function(tx) {
                  tx.executeSql('Create Table  IF NOT EXISTS WSConfiguration (id REAL UNIQUE,ip, port)');
              });
}; 

function getWsConfiguration(){
           db.transaction(function (t) {
       t.executeSql('SELECT * FROM WSConfiguration', [], function (t, r)
                    {
          var len = r.rows.length;            
           if(len!=0)
               {
           var ip=r.rows.item(0).ip;
           var port=r.rows.item(0).port;    
           sessionStorage.setItem('Ip_config', ip);
           sessionStorage.setItem('Ip_port', port);        
               }
           else
               {
                  myApp.loginScreen();
               }
    }, null)
  });
};
*/
function onError(tx, error) {
   myApp.alert(error.message);
 };
/*
function saveWsConfiguration(ip,port){    
       db.transaction(function (t) {
       t.executeSql('INSERT INTO WSConfiguration (id,ip,port) VALUES (1,"'+ip+'","'+port+'")');
  });
   
    
    sessionStorage.setItem('Ip_config', ip);
    sessionStorage.setItem('Ip_port', port);
};

function updateWsConfiguration(ip,port){
           db.transaction(function (t) {
       t.executeSql('Update WSConfiguration SET ip="'+ip+'" , port="'+port+'" where id=1');
  });
       sessionStorage.setItem('Ip_config', ip);
    sessionStorage.setItem('Ip_port', port);   
};
*/

function ExecuteTask(taskId,workflowName){
    TaskId=taskId;
    ExecutedWorkflowName=workflowName;
    mainView.router.load({url: "executeTaskScreen.html",reload:true});
}

function GetExecuteTaskScreen(url){
  var  ProfilesList=GenerateResponseArray(sessionStorage.getItem("ProfilesList"));   
   var  GroupsList=GenerateResponseArray(sessionStorage.getItem("GroupsList"));     
   var  InternalEntities=GenerateResponseArray(sessionStorage.getItem("InternalEntities"));
     ProfilesList=JSON.stringify(ProfilesList); 
   GroupsList =JSON.stringify(GroupsList); 
   InternalEntities=JSON.stringify(InternalEntities);    
    var data="{"+  
        "\"userId\":\""+sessionStorage.getItem("userId")+"\"," +
        "\"taskId\":\""+TaskId+"\"," +
        "\"userShortName\":\""+setUser_ShortName(sessionStorage.getItem("userShortName"))+"\"," +
        "\"interalEntites\":"+InternalEntities+","+
        "\"profilesList\":"+ProfilesList+","+      
        "\"groupsList\":"+GroupsList+","+          
        "\"screenWidth\":\""+window.innerWidth+"\","+
        "\"screenHeight\":\""+(window.innerHeight-90)+"\"}";
  $.ajax({             
        type: 'POST',           
        url: url,                  
        contentType: "text/plain",                           
        dataType: "json",                            
        data: data,             
        success: function(data) {       
            if(data.status==="ok")
                {
                    document.getElementById("executeTaskContent").innerHTML=data.content;
                    itemId=data.itemId;
                    stopWFMessage=data.stopWFMessage;
                     pageTitleElement=document.getElementById("title_executeTaskScreen");
                     pageTitleElement.textContent=data.itemShortName;
                     $('#executeTask-toolbarContent').append(data.endTaskButton);
                        $('#executeTask-toolbarContent').append(data.stopWorkflowButton);
                        loadJSFile("js/EditScreen.js");
                        loadJSFile("js/ExecuteTaskScreen.js");
                    myApp.hidePreloader();                    
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