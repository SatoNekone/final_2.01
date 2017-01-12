$(document).ready(function(){
  // Initialize Firebase
  var config = {
   apiKey: "AIzaSyBiR7kwL78pCfI2GCbjdzHurA-nOfTbzvE",
   authDomain: "curfan-bbd1c.firebaseapp.com",
   databaseURL: "https://curfan-bbd1c.firebaseio.com",
   storageBucket: "curfan-bbd1c.appspot.com",
   messagingSenderId: "242871097966"
  };
  firebase.initializeApp(config);
  var dbRef = firebase.database().ref();
  // REGISTER DOM ELEMENTS
  var $messageField = $('#messageInput');
  var $nameField = $('#nameInput');
  var $messageList = $('#example-messages');
  // LISTEN FOR KEYPRESS EVENT
  $messageField.keypress(function (e) {
    if (e.keyCode == 13) {
      //FIELD VALUES
      var username = $nameField.val();
      var message = $messageField.val();
      console.log(username);
      console.log(message);

      //SAVE DATA TO FIREBASE AND EMPTY FIELD
      dbRef.push({name:username, text:message});
      $messageField.val('');
    }
  });

  // Add a callback that is triggered for each chat message.
  dbRef.limitToLast(10).on('child_added', function (snapshot) {
    //GET DATA
    var data = snapshot.val();
    var username = data.name || "anonymous";
    var message = data.text;

    //CREATE ELEMENTS MESSAGE & SANITIZE TEXT
    var $messageElement = $("<li>");
    var $nameElement = $("<strong class='example-chat-username'></strong>");
    $nameElement.text(username);
    $messageElement.text(message).prepend($nameElement);

    //ADD MESSAGE
    $messageList.append($messageElement)

    //SCROLL TO BOTTOM OF MESSAGE LIST
    $messageList[0].scrollTop = $messageList[0].scrollHeight;
  });
});
