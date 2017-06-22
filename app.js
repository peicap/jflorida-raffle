var entries = new PouchDB('entries_db');
var submit = document.getElementById('new-entry');
var input = document.getElementById('new-entry-value');
var ul = document.getElementById('list-group-entries');
var winner = document.getElementById('new-winner');
var win = document.getElementById('win-win')


function start(){
	entries.allDocs({include_docs: true, descending: false}, function(err, doc){
		return doc.rows
	}).then(function(data){
		data.rows.forEach(function(doc){
			var list = document.createElement('li');
			list.className = 'list-group-item';
			list.innerHTML = doc.doc.entry_name;
			list.dataset.id = doc.id;
			ul.appendChild(list)
		})
	}).catch(function(err){
		console.log(err)
	})

	// Add an event listener and create a new document in the database then display the document inside the DOM.
	submit.addEventListener('click', function(){
		if(input.value != ''){ // Check whether the input is blank or not
			// Create new document in database
			var doc = {
				"_id": new Date().toISOString(),
				"entry_name": input.value
			};
			// Add the current document in database
			entries.put(doc).then(function(result){
				return result
			}).then(function(result){
				return	entries.get(result.id)
			}).then(function(doc){
				var list = document.createElement('li')
				list.innerHTML = doc.entry_name;
				list.dataset.id = doc._id
				list.className = 'list-group-item'
				ul.appendChild(list);
			}).catch(function(err){
				console.log(err)
			})
		}else{console.log('wrong!')}
	})
	// Add an event listener and generate a random winner then the winner from the database and DOM
	winner.addEventListener('click', function(){
		if(ul.innerHTML !=''){ // Check if the #list-group-entries has content
			var entriesNum = document.querySelectorAll('li.list-group-item').length;
			var randomNum = Math.floor(Math.random() * (entriesNum - 1 + 1) + 0); // Generate random number according to the length of entries
			// Show the winner
			win.innerHTML = 'The winner is ' + ul.childNodes[randomNum].innerHTML + '!';
			// Remove the winner from the database
			entries.get(ul.childNodes[randomNum].getAttribute('data-id')).then(function(doc){
				return entries.remove(doc);
			}).then(function(result){
				console.log(result)
			}).catch(function(err){
				console.log(err)
			})

			// Remove the winner from the DOM
			ul.childNodes[randomNum].remove()

			} else {
			console.log('There are no entries.')
		}
	})
}

start()