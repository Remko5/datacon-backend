const Router = require('koa-router');

// Prefix all routes with: /
const router = new Router({prefix: '/user'});
let items = [];
const user = require('../models/User.js');
user.findAll().then(d => d.forEach(e => {items.push(e.getFullJsonData())}));

// Routes
router.get('/', (ctx, next) => {
	ctx.body = items;
	next();
});

router.get('/:id', (ctx, next) => {
	let getCurrentItem = items.filter(function(item) {
		if (item.id == ctx.params.id) {
			return true;
		}
	});

	if (getCurrentItem.length) {
		ctx.body = getCurrentItem[0];
	} else {
		ctx.response.status = 404;
		ctx.body = 'Item Not Found';
	}
	next();
});

router.post('/add', (ctx, next) => {
	let new_id = 1;

	if(items.length > 0){
		new_id = items[items.length -1].id + 1;
	}

	if (
		!ctx.request.body.username ||
		!ctx.request.body.password
	) {
		ctx.response.status = 400;
		ctx.body = 'Please enter the data: username, password';
	} else {
		let new_username = ctx.request.body.username;
		let new_password = ctx.request.body.password.hashCode();
		try {
			user.create({id: new_id, username: new_username, password: new_password});
			items.push({
				id: new_id,
				username: new_username,
				password: new_password
			});
			ctx.response.status = 201;
			ctx.body = `New user added = id: ${new_id} & username: ${new_username} password: ${new_password}`;
		} catch(e) {
			ctx.response.status = 500;
			ctx.body = `Server Error: ${e}`;
		}
	}
	next();
});

String.prototype.hashCode = function() {
	var hash = 0,
	  i, chr;
	if (this.length === 0) return hash;
	for (i = 0; i < this.length; i++) {
	  chr = this.charCodeAt(i);
	  hash = ((hash << 5) - hash) + chr;
	  hash |= 0; // Convert to 32bit integer
	}
	return hash;
  }

module.exports = router;