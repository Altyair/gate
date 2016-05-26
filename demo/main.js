import Gate from '../dist/gate';

var gate = new Gate({
	crossDomain: true,
	keyLocalStorage: 'storageKey',
});

gate.on('ready', function (event) {
	document.getElementById('text').addEventListener('change', function(event) {
		document.getElementById('color').style.background = this.value;
		
		gate.postMessage( {color: this.value} );
	});
});

function errorHandler (event) {
	console.log(event.detail.message);
};
function messageHandler(event) {
	var data = event.detail;

	if (data && data.color) {
		document.getElementById('text').value = data.color;
		document.getElementById('color').style.background = data.color;
	}
};

gate.on('error', errorHandler);

gate.on('message', messageHandler);
