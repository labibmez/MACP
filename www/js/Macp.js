var ip_config;
var ip_port;
var tasks; 
var totalRowNumber;
var languagesList;
var $$ = Dom7;
var pageTitleContent;
var pageTitleElement
var currentItem;
var searchParams;
var HomeBackButton;
var myApp=new Framework7({ swipeBackPage : false,statusbarOverlay:true}) ;

function westMenuItem(item,title){
    currentItem=item;
    pageTitleContent=title;
    mainView.router.load({url: 'searchScreen.html',reload:true});
    console.log("westMenuClick",item);
    
}


var mainView = myApp.addView('.view-main', {
  dynamicNavbar: true,
     domCache: true
});
function saveFirstConfig()        
{
    ip = document.getElementById('ipFirstConfig').value,
     port = document.getElementById('portFirstConfig').value
    sessionStorage.setItem('Ip_config', ip);
    sessionStorage.setItem('Ip_port', port);
    myApp.closeModal();
}       
function loadJSFile(screenName)
{
    var js = document.createElement("script");
    js.type = "text/javascript";    
    js.src = screenName;
    document.body.appendChild(js);
}
function verifConfig(){          
     
    ip_config=sessionStorage.getItem("Ip_config");
    ip_port=sessionStorage.getItem("Ip_port");
    if(ip_config===null || ip_port===null)
      myApp.loginScreen();    
}    
var leftView=myApp.addView('.view-left',{
    domCache: true,dynamicNavbar:true
   });
myApp.onPageInit('home', function (page) { 
     HomeBackButton=document.getElementById("homeBackButton");
   // HomeBackButton.style.visibility = "hidden";
     myApp.params.swipePanel=false;
    verifConfig();      
    
}).trigger();                  
     
myApp.onPageInit('WSConfigurationScreen', function (page) {
   // appName.params.swipePanel = false;
    myApp.params.swipePanel=false;    
   loadJSFile("js/WSConfigurationScreen.js");
});   
myApp.onPageInit('homePage', function (page) {   
    
    myApp.showIndicator();
    loadJSFile("js/homePage.js");      
     myApp.params.swipePanel=false;    
    setTemplate_HeaderData('homePage');
   setTimeout(function() {loadTaskList(); }, 1000) ;
});            
          
    myApp.onPageInit('searchScreen', function (page) {
    HomeBackButton.style.visibility="visible";    
    createLanguagesList('searchScreen');
    myApp.params.swipePanel=false;
    pageTitleElement=document.getElementById("title_searchScreen");
    pageTitleElement.textContent=pageTitleContent;
    myApp.showIndicator();
    setTemplate_HeaderData('searchScreen');
    setTimeout(function() {loadsearchScreen(); }, 1000) ;
});     
    myApp.onPageInit('searchResultScreen', function (page) {
    HomeBackButton.style.visibility="visible";
   createLanguagesList('searchResultScreen'); 
      
    myApp.params.swipePanel=false;
  setTemplate_HeaderData('searchResultScreen'); 
     myApp.showIndicator();
      var url='http://'+ sessionStorage.getItem('Ip_config')+':'+sessionStorage.getItem('Ip_port')+'/MobileAPI.svc/GetSearchResultPage';
    console.log("URL",url);
   setTimeout(function() {lunchSearchResult(url); }, 1000) ;
});
    
function setTemplate_HeaderData(pScreen){
    document.getElementById("userName_label"+"_"+pScreen).textContent=sessionStorage.getItem('userName');
     document.getElementById("lng_label"+"_"+pScreen).textContent=sessionStorage.getItem('language');
}  

function loadsearchScreen(){
     console.log("URL",currentItem);
    GetSearchPage('http://'+sessionStorage.getItem('Ip_config')+':'+sessionStorage.getItem('Ip_port')+'/MobileAPI.svc/GetSearchScreen/'+currentItem);
   
}       
 function loadTaskList() {
     tasks=document.getElementById('tasks');
     var deviceWidth = window.innerWidth - 50;
      GetHomePage('http://'+sessionStorage.getItem('Ip_config')+':'+sessionStorage.getItem('Ip_port')+'/MobileAPI.svc/getHomePage');  
}
                
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
                         myApp.hideIndicator(); 
                    },
                    error: function(e) {
                       myApp.alert("error occured");      

                    }  
                 
            });    
}
    
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
} 

function setUser_ShortName(userShortName)
{
    var res = userShortName.split('\\');
    return res[0]+'\\\\'+res[1];
    
}  
 
function GetHomePage(url) {
   
   var  ProfilesList=GenerateResponseArray(sessionStorage.getItem("ProfilesList")); 
    var  AccessRightUserList=GenerateResponseArray(sessionStorage.getItem("AccessRightUserList")); 

   var  GroupsList=GenerateResponseArray(sessionStorage.getItem("GroupsList"));     
   var InternalEntities=GenerateResponseArray(sessionStorage.getItem("InternalEntities"));
   ProfilesList=JSON.stringify(ProfilesList); 
   AccessRightUserList =JSON.stringify(AccessRightUserList); 
   GroupsList =JSON.stringify(GroupsList); 
   InternalEntities=JSON.stringify(InternalEntities); 
   var data="{"+  
        "\"userid\":\""+sessionStorage.getItem("userId")+"\"," +
        "\"userShortName\":\""+setUser_ShortName(sessionStorage.getItem("userShortName"))+"\"," +
        "\"InternalEntities\":"+InternalEntities+","+
        "\"ProfilesList\":"+ProfilesList+","+  
        "\"GroupsList\":"+GroupsList+","+    
        "\"AccessRightUserList\":"+AccessRightUserList+","+    
        "\"HomePageConfig\":\""+sessionStorage.getItem("HomePageConfig")+"\","+      
        "\"windowWidth\":\""+window.innerWidth+"\","+
        "\"windowHeight\":\""+(window.innerHeight-70)+"\"}";  
    console.log('data   '+data );
    var dataToReturn = 'null';    
    var wpost = "e=132&c=abcdef&s=demoBASICA";
     $.ajax({             
        type: 'POST',           
        url: url,                          
        contentType: "text/plain",                              
        dataType: "json",                                     
        async: false,                              
        data: data,    
        success: function(data) {
             document.getElementById("tasks").innerHTML=data.TasksContent;
             document.getElementById("westMenu").innerHTML=data.WestMenuContent;
            sessionStorage.setItem("Languages",data.Languages);
             var languages=sessionStorage.getItem('Languages');
             languagesList = JSON.parse(languages); 
             createLanguagesList('homePage');
             createProfileList('homePage'); 
            $.getScript("js/Macp.js");
             myApp.hideIndicator();
        },
        error: function(e) {
             myApp.hideIndicator();     
              myApp.alert("error occured in the system");
        }
    });        
      
}  
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
}  

function createProfileList(screen){
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
}  

function logoutAction(){
            sessionStorage.clear();        
        mainView.router.load({url: 'index.html'});
        location.reload(true);
}
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
        async: false,                              
        data: data,         
        success: function(data) {        
            console.log(data);  
            jsongrid = data;    
           
            document.getElementById("searchResult").innerHTML=data.dataGrid;  
            totalRowNumber=data.TotalRows;
             var tasksTableElement =document.getElementById("tasksTableElement");
            console.log(tasksTableElement);
             myApp.attachInfiniteScroll(tasksTableElement);
            loadJSFile("js/infiniteScroll.js");
            myApp.hideIndicator();
            
        },
        error: function(e) { 
            console.log(e.message);  
            verifconnexion = false;        
            myApp.hideIndicator();  
                         
        }                           
    });    
}         
function generateConnectedComboItems(idChild,screenTagName,val,child,entity){ 
    var url =  "http://"+sessionStorage.getItem('Ip_config')+":"+sessionStorage.getItem('Ip_port')+"/MobileAPI.svc/ConnectedComboOptions/"+val.value+"/"+screenTagName+"/"+child+"/"+entity;
    setTimeout(function() {connectedComboOptions(url,idChild);},100);       

}
   
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
}
function HomeBack(){
    HomeBackButton.style.visibility="hidden";       
    mainView.router.back({force:true,pageName:"homePage"});   
    
}