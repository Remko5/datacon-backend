const Router = require('koa-router');

// Prefix all routes with: /
const router = new Router({prefix: '/user_tracker'});
let items = require('../user_tracker_list.js');

// Routes
router.get('/', (ctx, next) => {
	ctx.body = items;
	next();
});

module.exports = router;