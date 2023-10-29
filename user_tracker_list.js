let user_tracker_list = [];
const user_tracker = require('./models/UserTracker.js');
user_tracker.findAll().then(d => d.forEach(e => {user_tracker_list.push(e.getFullJsonData())}));

module.exports = user_tracker_list