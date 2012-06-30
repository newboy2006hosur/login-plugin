/************************************************************************/
/* Jquery login plugin - A simple plugin to create login form with few  */
/* lines of code.														*/
/*																		*/
/* Authors : Kiran Raj Samarthyam - srkiranraj@gmail.com,				*/
/*			 Manjunath Singh - newboy2006hosur@yahoo.co.in				*/
/*																		*/
/************************************************************************/

(function($){
	loginDefaults = {
		method : null,
		action : null,
		email : false,
		width : "auto",
		height : "auto",
		background : null,
		title : "Login",
		cancel : false,
		label : true
	};
	var currProp = {};
	var uid;
	var pwd;
	
	function displayError(self,elem,errorMessage)
	{
		$(self).find('#'+elem).after('<div id="login-error" style="position:absolute;max-height:100px;"><div class="triangle"></div><div style="padding:3px;font-size:10px;font-family:Arial;background:#2f2f2f;border-radius:3px;min-width:150px;text-align:center;color:SeaShell;">'+errorMessage+'</div></div>');
		var curr = $(self).find('#'+elem).next('#login-error');
		$(curr).css('top',$(self).find('#'+elem).offset().top + $(self).find('#'+elem).height()+3+5);
		$(curr).css('left',$(self).find('#'+elem).offset().left);
		$(curr).css('left',$(curr).offset().left + ($(self).find('#'+elem).width()/2) - ($(curr).width()/2));
		$(curr).find('.triangle').css('left',($(curr).width()/2) - 3);
	}
		
	$.fn.extend({
		createLogin : function(type,options,userid,password){
			var self = this;
			if(userid == undefined) userid = 'userid';
			if(password == undefined) password = 'password';
			uid = userid;
			pwd = password;
			if(type != 'one-line' && type != 'normal') type = 'normal';
			if(options != undefined)
			{
				$.each(loginDefaults,function(key,value){
					if(options[key] == null)
						currProp[key] = value;
					else
						currProp[key] = options[key];
				});
			}
			else
				currProp = loginDefaults;
			$(this).append('<form id="login-box" class="'+type+'"></form>');
			var form = $(this).find('#login-box');
			if(currProp.background !=null)
				$(form).css('background',currProp.background);
			$(form).css('width',currProp.width);
			$(form).css('height',currProp.height);
			if(currProp.method != null)
				$(form).attr('method',currProp.method);
			if(currProp.action != null)
				$(form).attr('action',currProp.action);
			switch(type){
				case 'one-line':
					if(currProp.label)
					{
						
						$(form).append('<label for="'+userid+'">Username</label>');
						
						$(form).append('<input type="text" class="'+userid+'" id="'+userid+'" name="'+userid+'">');
						
					}
					else
					{
						$(form).append('<input type="text" class="'+userid+'" id="'+userid+'" name="'+userid+'">');
						$(form).append('<span style="position:absolute;" class="username-label">Username</span>');
						$(this).find('#login-box .username-label').css('left',$(this).find('#'+userid).offset().left);
					}
					if(currProp.label)
					{
						$(form).append('<label for="'+password+'">Password</label>');
						$(form).append('<input type="password" class="'+password+'" id="'+password+'" name="'+password+'">');
					}
					else
					{
						$(form).append('<input type="password" class="'+password+'" id="'+password+'" name="'+password+'">');
						$(form).append('<span style="position:absolute;" class="pwd-label">Password</span>');
						$(this).find('#login-box .pwd-label').css('left',$(this).find('#'+password).offset().left);
					}
					
					$(form).append('<button type="submit" id="submit">Login</button>');
					if(currProp.cancel)
						$(form).append('<button type="cancel" id="cancel">Cancel</button>');
					break;
				case 'normal':
					if(currProp.title != 'none')
						$(form).append('<div class="loginTitle">'+currProp.title+'</div><br>');
					if(currProp.label)
					{
						$(form).append('<div><div style="float:left;width:40%;"><label for="'+userid+'">Username</label></div><div style="float:right;width:56%"><input type="text" class="'+userid+'" id="'+userid+'" name="'+userid+'"></div><div style="clear:both;"></div></div><br>');						
					}
					else
					{
						$(form).append('<input type="text" class="'+userid+'" id="'+userid+'" name="'+userid+'">');
						$(form).append('<span style="position:absolute;" class="username-label">Username</span><br><br>');
						$(this).find('#login-box .username-label').css('left',$(this).find('#'+userid).offset().left);
					}
					if(currProp.label)
					{
						$(form).append('<div><div style="float:left;width:40%;"><label for="'+password+'">Password</label></div><div style="float:right;width:56%"><input type="password" class="'+password+'" id="'+password+'" name="'+password+'"></div><div style="clear:both;"></div></div><br>');
					}
					else
					{
						$(form).append('<input type="password" class="'+password+'" id="'+password+'" name="'+password+'">');
						$(form).append('<span style="position:absolute;" class="pwd-label">Password</span><br><br>');
						$(this).find('#login-box .pwd-label').css('left',$(this).find('#'+password).offset().left);
					}
					
					$(form).append('<button type="submit" id="submit">Login</button>');
					if(currProp.cancel)
						$(form).append('<button type="cancel" id="cancel">Cancel</button>');
					break;
			}
			
			if(currProp.method != null || currProp.action != null)
			{
				$(form).find('button[type=submit]').bind('click',function(e){
					e.preventDefault();
				});
				$(this).find('#login-box span.username-label').bind('click',function(){
					$(self).find('#'+userid).focus();
				});
				$(this).find('#login-box span.pwd-label').bind('click',function(){
					$(self).find('#'+password).focus();
				});
			}
			
			if(currProp.cancel)
			{
				$(form).find('button[type=cancel]').bind('click',function(e){
					if(currProp.method != null || currProp.action != null)
					{
						e.preventDefault();
					}
					$(self).find('input').val('');
				});
			}
			
			if(!currProp.label)
			{
				$(form).find('#'+userid).bind('keyup',function(){
					if($(this).val().length > 0)
						$(self).find('#login-box .username-label').hide();
					else
						$(self).find('#login-box .username-label').show().css('display','inline');
				});
				
				$(form).find('#'+password).bind('keyup',function(){
					if($(this).val().length > 0)
						$(self).find('#login-box .pwd-label').hide();
					else
						$(self).find('#login-box .pwd-label').show().css('display','inline');
				});
			}
			
		},
		
		submitLogin : function(callback){
			var self = this;
			$(this).find('#login-box').find('button[type=submit]').unbind('click');
			$(this).find('#login-box').find('button[type=submit]').bind('click',function(e){
				var errorShown = false;
				$(self).find('#login-box').find('#login-error').remove();
				if($(self).find('#'+uid).val() == '' && !errorShown)
				{
					displayError(self, uid, "Cannot be empty!");
					errorShown = true;
				}
				else
				if(currProp.email)
				{
					var x=$(self).find('#'+uid).val();
					var atpos=x.indexOf("@");
					var dotpos=x.lastIndexOf(".");
					if (atpos<1 || dotpos<atpos+2 || dotpos+2>=x.length && !errorShown)
					{
						displayError(self, uid, "Enter a valid email address - abc@xyz.com");
						errorShown = true;
					}
				}
				
				if($(self).find('#'+pwd).val() == '')
				{
					displayError(self, pwd, "Cannot be empty!");
				}
				if(!errorShown)
				{
					if(callback !=null) callback();
					
					$(self).find('#login-box').find('button[type=submit]').unbind('click');
					$(self).find('#'+uid).unbind('keyup');
					$(self).find('#'+pwd).unbind('keyup');
					$(self).find('button[type=cancel]').unbind('click');
					$(self).find('button[type=submit]').unbind('click');
					$(self).find('#login-box span.username-label').unbind('click');
					$(self).find('#login-box span.pwd-label').unbind('click');
				}
				else
				{
					e.preventDefault();
				}
				if((currProp.method == null || currProp.action == null)) e.preventDefault();
				
			});
		},
		
		displayCustomError : function(errMsg){
			$(this).find('#login-box').append('<div id="customError" style="background:#f5f5f5;padding:3px;margin:20px;box-shadow:0 3px 4px #888;"><div style="color:red;font-size:12px;font-family:Arial;padding:3px;text-align:center;">'+errMsg+'</div></div>')
		},
		
		closeLogin : function(){
			$(this).children().remove();
		}
	}); 
})(jQuery);