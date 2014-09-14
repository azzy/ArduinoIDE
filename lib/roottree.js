/* Requires JQuery */

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
	this._client = 'b4177d68cbd64e44b6b81765727dc6d5'
	var url = 'http://roottree.me/api/sessions/';

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

	this.init = function(dev_key){
	    this._developer = dev_key;
	    // for now developer uuid and dev key are the same.
	};

	this.run = function(command, settings){
	    var postData = {
		command: command,
		args: settings.args,
		kwargs: settings.kwargs,
		client: this._client,
		developer: this._developer
	    };
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
	};
    };
    return new RootTree();
}());
