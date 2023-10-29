const Router = require('koa-router');

// Prefix all routes with: /
const router = new Router({prefix: '/user_tracker'});
let items = require('../user_tracker_list.js');

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

module.exports = router;