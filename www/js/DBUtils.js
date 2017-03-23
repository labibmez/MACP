
var db = null;

document.addEventListener('deviceready', function() {
  db = window.sqlitePlugin.openDatabase({name: 'MACPDB.db', location: 'default'});
});
function manageDB()
{
   console.log("manageDB");
    db.transaction(function (tx) {  
    tx.executeSql('CREATE TABLE IF NOT EXISTS WS (IPaddress, port)');
}, function(error) {
    console.log('Transaction ERROR: ' + error.message);
  }, function() {
    console.log('Populated database OK');
  }); 
}

function getWSConfiguration()
{
    console.log("getWSConfigurationWITH DB");
    db.transaction(function (tx) {
   tx.executeSql('SELECT * FROM WS', [], function (tx, results) {
       if(results.rows.length !=0)
           {
               sessionStorage.setItem('Ip_config', results.rows.item(0).IPaddress);
               sessionStorage.setItem('Ip_port', results.rows.item(0).port);  
           }
           else
           { 
            if(ip_config===null || ip_port===null)
             myApp.loginScreen(); 
           }
      });
});
}

function saveWSConfiguration(ipAddress,port)
{
     console.log("saveWSConfiguration WITH DB");
     db.transaction(function (tx) {
       tx.executeSql('UPDATE WS SET IPaddress='+2+' AND port='+port+')');  
});
    
}