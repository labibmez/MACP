

function saveConfiguration() {
     ip = document.getElementById('ip').value,
     port = document.getElementById('port').value
    sessionStorage.setItem('Ip_config', ip);
    sessionStorage.setItem('Ip_port', port);  
    mainView.router.back();                            
 }     
                                           
$$('.WS-confirm-ok-cancel').on('click', function () {
    myApp.confirm('Are you sure want to exit from App?', 'MACP',
      function () {
       navigator.app.exitApp();
      },
      function () {
      }
    );
});