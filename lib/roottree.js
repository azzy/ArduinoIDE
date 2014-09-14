/* Requires JQuery */

/* based off of http://codewiz.biz/article/post/Creating+your+own+JavaScript+Library#.VBSq6WRdWRg */

// for debug
function stop() {
    for (k in RootTree.watchers)
	clearInterval(RootTree.watchers[k].timer)
};

window.RootTree = (function() {
    function RootTree(properties) {
	console.log('roottree constructor');
	var watchers = {};
	this.watchers = watchers; // for debug
	// to do read cookie and set user
	
	var url = 'http://wwww.roottree.me/api/sessions/';

	var getCookie = function(cname) {
	    var name = cname + "=";
	    var ca = document.cookie.split(';');
	    for(var i=0; i<ca.length; i++) {
	        var c = ca[i];
	        while (c.charAt(0)==' ') c = c.substring(1);
	        if (c.indexOf(name) != -1) return c.substring(name.length,c.length);
	    }
	    return "";
	}

	var registerWatcher = function(sessionId, settings) {
	    watchers[sessionId] = jQuery.extend(true, {}, settings);
	    watchers[sessionId].timer = window.setInterval(
		function(sessionId, settings) {
		    return function() {
			// poll the server
			var getData = {
			    client: this._client,
			    developer: this._developer
			};
			jQuery.ajax({
			    type: 'GET',
			    url: url + sessionId + '/',
			    data: getData,
			    success: function(data) {
				console.log('client responded successfully', data);
				if (data != 'pending') {
				    settings.success(data);
				    clearWatcher(sessionId);
				}
			    },
			    error: function(jqXHR, textStatus, errorThrown) {
				console.error('client reported an error',
					     jqXHR, textStatus, errorThrown);
				settings.error(errorThrown);
				clearWatcher(sessionId);
			    },
			    dataType: 'json',
			    crossDomain: true
			});
		    }
		}(sessionId, settings), 1000);
	};

	var clearWatcher = function(sessionId) {
	    window.clearInterval(watchers[sessionId].timer);
	    delete watchers[sessionId];
	};

	var popupIframe = function() {
		$('.roottree_iframe_container').bPopup({
            content:'iframe', //'ajax', 'iframe' or 'image'
            contentContainer:'.content',
            loadUrl:'http://www.roottree.me/accounts/login/clientuser/?next=/accounts/setcookie/cross_domain/' //Uses jQuery.load()
        });
	}

	var thisObject = this;

	this.init = function(dev_key){
	    this._developer = dev_key;
		
	};

	this.run = function(command, settings){
		
		window.addEventListener("message", receiveMessage, false);

		function receiveMessage(event)
		{
			console.log('uuid', event.data['uuid'])
		    // this._client = event.data['uuid'];
		    document.cookie="uuid="+event.data['uuid'];
		    $('.roottree_iframe_container').bPopup().close();
		    finishRun();
		}
	    // for now developer uuid and dev key are the same.

	    if (getCookie('uuid')) finishRun();
	    else popupIframe();

	    function finishRun() {
	    	//set this._client from cookie
	    	thisObject._client = getCookie('uuid')
	    	var postData = {
			command: command,
			args: settings.args,
			kwargs: settings.kwargs,
			client: thisObject._client,
			developer: thisObject._developer
		    };
		    console.log('postData', postData);
		    jQuery.ajax({
			type: 'POST',
			url: url,
			data: postData,
			dataType: 'json',
			crossDomain: true,
			beforeSend: function (xhr){
			    xhr.setRequestHeader('X-CSRFToken', 'xbdBtMOyAzeEDC3H2xdW7lTwvkIEiA4I');
			},
			success: function(settings) {
			    return function(data){
				console.log('successfully gave the server the command', data);
				var sessionId = data;
				registerWatcher(sessionId, settings);
			    }
			}(settings),
			error: function(jqXHR, textStatus, errorThrown) {
			    console.error('error giving command to server',
					  jqXHR, textStatus, errorThrown);
			    settings.error(errorThrown);
			},
		    });
	    }
	    

	};
    };
    return new RootTree();
}());
