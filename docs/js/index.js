var customerDb = new PouchDB('customers');
var elName = document.getElementById('inputName');
var elMobile = document.getElementById('inputMobile');
var elFacebook = document.getElementById('inputFacebook')

customerDb.changes({
  since: 'now',
  live: true
}).on('change', pullDb);

function clear(){
	elName.value = '';
	elMobile.value = '';
	elFacebook.value = '';
}



function send(){
	sendDb(elName.value, elMobile.value, elFacebook.value);
}

function sendDb(name, mobile, facebook){
	var doc = {
		"_id": new Date().toISOString(),
		"name": name,
		"mobile": mobile,
		"facebook": facebook
	}

	customerDb.put(doc).then(function(result){
		console.log(result);
		Materialize.toast('You are now listed ' + doc.name + '!', 4000)
		clear();
	}).catch(function(err){
		console.log(err)
	})
}

function pullDb(){
		customerDb.allDocs({include_docs:true, descending:false}, function(err, doc){
		entries(doc.rows)
	});
};

function entries(data){
	var elEntry = document.getElementById('entries');
	elEntry.innerHTML = data.length
}

pullDb()