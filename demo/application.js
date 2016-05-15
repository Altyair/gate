require(["Gate"], function(Gate) {
	var gate = new Gate({
		crossDomain: true,
		serviceFile: 'http://syncwindow/frame.html',
		keyLocalStorage: 'storageKey',
	});
		
	// когда загружен iframe
	gate.on('ready', function (event) {
		// по событию изменения цвета, вызываем postMessage, передав в него данные для передачи
		document.getElementById('text').addEventListener('change', function(event) {
			document.getElementById('color').style.background = this.value;
			
			// данные
			gate.postMessage( {color: this.value} );
		});
	});
	function errorHandler (event) {
		alert(event.detail.message);
	};
	function messageHandler(event) {
		var data = event.detail;
	
		if (data && data.color) {
			document.getElementById('text').value = data.color;
			document.getElementById('color').style.background = data.color;
		}
	};

	// события error
	gate.on('error', errorHandler);
	
	gate.on('message', messageHandler);
	
	//document.getElementById('color').addEventListener('click', function(event) { gate.destroy(); })
	
});

//-----------------------------------------------------------------------------------------------------
