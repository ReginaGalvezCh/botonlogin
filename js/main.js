

  	$(function(){
  		var app_id = '1418440218188263';
  		var scopes = 'email,user_friends,user_online_presence';

  		var btn_login = '<a href="#" id="login" class="btn">Iniciar Sesion</a>' ;

  		var  div_session = "<div id='facebook-session'>" +
  		"<strong></strong>"+
  		"<img>"+
  		"<a href= '#' id='logout' class='btn'>Cerrar Sesion</a> " +
  		"</div>"

  		
/*probando codigo*/
window.fbAsyncInit = function () {
    FB.init({ appId: 'your-app-id', cookie: true, xfbml: true, oauth: true });

    window.fbAsyncInit = function() {
  			FB.init({
  				appId      : app_id,
  				status     : true, 
  				cookie     : true,  
  				xfbml      : true,  
  				version    : 'v2.8' 
  			});


  			FB.getLoginStatus(function(response) {
  				statusChangeCallback(response,function(data) {

  				});
  			});

  		};
    if (typeof facebookInit == 'function') {
        facebookInit();
    }
};

(function(d){
    var js, id = 'facebook-jssdk'; if (d.getElementById(id)) {return;}
    js = d.createElement('script'); js.id = id; js.async = true;
    js.src = "//connect.facebook.net/en_US/all.js";
    d.getElementsByTagName('head')[0].appendChild(js);
}(document));

/*probando codigo*/
  		var statusChangeCallback = function(response, callback) {
  			console.log('statusChangeCallback');
  			console.log(response);

  			if (response.status === 'connected') {
  				getFacebookData();
  			} else {
  				callback(false);
  			}
  		}
  		
  		
	var checkLoginState = function(callback) {
		FB.getLoginStatus(function(response) {
			statusChangeCallback(response,function(data) {
				callback(data);
			});
		});
}
		var getFacebookData= function()
		{
			FB.api('/me',function(response){
				$('#login').after(div_session);
				$('#login').remove();
				$('#facebook-session strong').text("Bienvenido: "+response.name);
				$('#facebook-session img').attr('src','http://graph.facebook.com/'+response.id+'/picture?type=large');
			});
		}
		var facebookLogin = function(){
			checkLoginState(function(response){
				if(!response){
					FB.login(function(response){
						if (response.status === 'connected')
							getFacebookData();
					},{scope:scopes});
				}
			})
		}

		$(document).on('click','#login',function(e){
			e.preventDefault;
			facebookLogin();
		});


})



