const functions = require('firebase-functions');
const cors = require('cors')({origin: true}); //1

const admin = require('firebase-admin');
admin.initializeApp();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest((request, response) => {
 response.send("Hello from Firebase!");
});

exports.sayHi = functions.https.onRequest((request, response) => {
    response.set('Access-Control-Allow-Origin', '*');  //2
    //get name from the client
	var name = request.body.name;
	//change from function
	var msg = 'Welcome ' + name;
	//send it back to client
	response.send(msg);
});

exports.saveData = functions.https.onCall((data,context)=>{
    var dataRef = admin.database().ref();
    //get data from client
    var factValue = data.fact;
    //insert into database
    return dataRef.child('facts').push().set({
        fact: factValue
    }).then(()=>{
        return {message : 'insert done from function!'} 
    })
})

exports.helloHTML = functions.https.onRequest((req,res)=>{
    res.send('<html><title>Simple HTML</title>' +
                '<body><h1 style="color:red">Hi there</h1></body>' +
                '</html>'
    );
})
