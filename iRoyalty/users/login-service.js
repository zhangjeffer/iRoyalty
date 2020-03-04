const db = require("../helperz/database-service");
const User = db.User;

async function register(newUser){
    console.log({userId: newUser.userId});
    await User.findOne({userId: newUser.userId}).then(user => {
    	if (user) {
    		throw "User ID is already taken";
    	}
    	else {
    		const user = new User({
    			userId: newUser.userId,
    			mode: newUser.mode
    		});
    		user.save()
    	}
        
    });
}

async function remove(currUser){
    await User.remove({userId: currUser.userId});
}
module.exports = {
    register,
    remove: remove
};