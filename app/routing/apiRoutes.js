var friendData = require("../data/friends.js");

module.exports = function(app) {
	app.get("/api/friendsArray", function(req,res) {
		res.json(friendData);
	});

	app.post("/api/friendsArray", function(req,res) {

		var newFriend = req.body;
		//make scores all integers
		for(var i = 0; i < newFriend.scores.length; i++) {
			if(newFriend.scores[i] == "1 (Strongly Disagree)") {
				newFriend.scores[i] = 1;
			} 
			else if(newFriend.scores[i] == "5 (Strongly Agree)") {
				newFriend.scores[i] = 5;
			} 
			else{
				newFriend.scores[i] = parseInt(newFriend.scores[i]);
			}
		}

		// //compare the scores of the friends to find the best match
		var differenceArray = [];

		for(var i = 0; i < friendData.length; i++) {
			var comparedFriend = friendData[i];
			var totalDifference = 0;

			for (var j = 0; j < comparedFriend.scores.length; j++) {
				var findScore = Math.abs(comparedFriend.scores[j] - newFriend.scores[j]);
				totalDifference += findScore;
			}

			differenceArray[i] = totalDifference;
		}

		var bfNum = differenceArray[0];
		var bfIndex = 0;

		for(var i = 0; i < differenceArray.length; i++) {
			if (differenceArray[i] < bfNum) {
				bfNum = differenceArray[i];
				bfIndex = i;
			}
		}

		console.log(newFriend)
		//push the new friend to the friendsArray
		friendData.push(newFriend);
		//display the new friend to the user
		res.json(friendData[bfIndex]);
	});

}