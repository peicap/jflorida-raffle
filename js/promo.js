var customerDb = new PouchDB('customers');

customerDb.changes({
  since: 'now',
  live: true
}).on('change', pullDb);


function clear() {
}

function pullDb(){
		customerDb.allDocs({include_docs:true, descending:false}, function(err, doc){
		entries(doc.rows)
		raw(doc.rows)
	});
};


function raffle(){
	var winner = document.getElementById('winnerTxt');
	winner.innerHTML = 'The winner is...'
		customerDb.allDocs({include_docs:true, descending:false}, function(err, doc){
		randomizer(doc.rows)
	});
};


function raw(doc) {
	var display = document.getElementById('display');
	display.innerHTML = '';
	doc.forEach(function(data){
		display.appendChild(displayD(data.doc))
	});
};

function displayD(data) {
	console.log(data.mobile)
	var a = document.createElement('a')
	a.setAttribute('class', 'collection-item  purple-text');
	a.innerHTML = data.name;
	a.addEventListener( 'click', deleteButtonPressed.bind(this, data));
	return a
};

function deleteButtonPressed(data) {
  customerDb.remove(data);
  Materialize.toast('Entry deleted!!', 4000);
  display.innerHTML="";
}

function randomizer(data){
	var randomNum = Math.floor(Math.random() * data.length);
	selectWinner(randomNum);
}

function selectWinner(num){
	var winner = document.getElementById('display');
	var el = winner.childNodes[num]
	var winnerTxt = document.getElementById('winnerTxt')
	el.setAttribute('class', 'active collection-item  purple-text wiggle white-text')
	winnerTxt.innerHTML = 'The winner is ' + winner.innerHTML + '!'
}


function entries(data){
	var elEntry = document.getElementById('entries');
	elEntry.innerHTML = data.length
}

pullDb()

