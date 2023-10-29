const Router = require('koa-router');

// Prefix all routes with: /
const router = new Router({prefix: '/tracker'});
let items = [];
const tracker = require('../models/Tracker.js');
tracker.findAll().then(d => d.forEach(e => {items.push(e.getFullJsonData())}));

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
		ctx.body = 'Tracker Not Found';
	}
	next();
});

router.post('/add', (ctx, next) => {
	let new_id = 1;

	if(items.length > 0){
		new_id = items[items.length -1].id + 1;
	}

	if (
		!ctx.request.body.naam ||
        !ctx.request.body.user_id
	) {
		ctx.response.status = 400;
		ctx.body = 'Please enter the data: naam, user_id';
	} else {
		let new_naam = ctx.request.body.naam;
        let new_user_id = ctx.request.body.user_id;
        const user_tracker = require('../models/UserTracker.js');
        let user_tracker_list = require('../user_tracker_list.js');
		try {
			tracker.create({id: new_id, naam: new_naam});
            user_tracker.create({user_id: new_user_id, tracker_id: new_id});
			items.push({
				id: new_id,
				naam: new_naam				
			});
            user_tracker_list.push({
                user_id: new_user_id,
                tracker_id: new_id
            });
			ctx.response.status = 201;
			ctx.body = `New tracker added = id: ${new_id} & naam: ${new_naam}`;
		} catch(e) {
			ctx.response.status = 500;
			ctx.body = `Server Error: ${e}`;
		}
	}
	next();
});

module.exports = router;