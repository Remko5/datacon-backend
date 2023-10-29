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
		!ctx.request.body.voornaam ||
		!ctx.request.body.achternaam
	) {
		ctx.response.status = 400;
		ctx.body = 'Please enter the data: voornaam, achternaam';
	} else {
		let new_voornaam = ctx.request.body.voornaam;
		let new_achternaam = ctx.request.body.achternaam;
		try {
			user.create({id: new_id, voornaam: new_voornaam, achternaam: new_achternaam});
			items.push({
				id: new_id,
				voornaam: new_voornaam,
				achternaam: new_achternaam
			});
			ctx.response.status = 201;
			ctx.body = `New user added = id: ${new_id} & voornaam: ${new_voornaam} achternaam: ${new_achternaam}`;
		} catch(e) {
			ctx.response.status = 500;
			ctx.body = `Server Error: ${e}`;
		}
	}
	next();
});

module.exports = router;