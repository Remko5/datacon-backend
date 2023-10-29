const Router = require('koa-router');

// Prefix all routes with: /
const router = new Router({prefix: '/data'});
let items = [];
const data = require('../models/Data.js');
data.findAll().then(d => d.forEach(e => {items.push(e.getFullJsonData())}));

// let items = [
// 	{ id: 100, iname: 'Quartz Analog Wrist Watch', price: 'US $4.99'},
// 	{ id: 101, iname: 'Leather Peep Pump Heels', price: 'US $33.56'},
// 	{ id: 102, iname: 'Apple iPod', price: 'US $219.99'},
// 	{ id: 103, iname: 'Prince Phantom 97P Tennnis Racket', price: 'US $50.00'},
// ];

// Routes
router.get('/', (ctx, next) => {
	ctx.body = items;
	next();
});

router.get('/:tracker_id', (ctx, next) => {
	let getCurrentItem = items.filter(function(item) {
		if (item.tracker_id == ctx.params.tracker_id) {
			return true;
		}
	});

	if (getCurrentItem.length) {
		ctx.body = getCurrentItem;
	} else {
		ctx.response.status = 404;
		ctx.body = 'Items Not Found';
	}
	next();
});

router.post('/add', (ctx, next) => {
	let new_id = 1;
	let new_createdAt = getDate();

	if(items.length > 0){
		new_id = items[items.length -1].id + 1;
	}

	if (
		!ctx.request.body.tracker_id ||
		!ctx.request.body.lat ||
		!ctx.request.body.long 
	) {
		ctx.response.status = 400;
		ctx.body = 'Please enter the data: tracker_id, lat, long';
	} else {
		let new_tracker_id = ctx.request.body.tracker_id;
		let new_lat = ctx.request.body.lat;
		let new_long = ctx.request.body.long;
		try {
			data.create({id: new_id, tracker_id: new_tracker_id, lat: new_lat, long: new_long, createdAt: new_createdAt});
			items.push({
				id: new_id,
				tracker_id: new_tracker_id,
				lat: new_lat,
				long: new_long,
				createdAt: new_createdAt
			});
			ctx.response.status = 201;
			ctx.body = `New data added = id: ${new_id} & tracker_id: ${new_tracker_id} lat: ${new_lat} & long: ${new_long} & createdAt: ${new_createdAt}`;
		} catch(e) {
			ctx.response.status = 500;
			ctx.body = `Server Error: ${e}`;
		}
	}
	next();
});

function getDate() {
	let currentdate = new Date(); 
    return currentdate.getDate() + "-"
                + (currentdate.getMonth()+1)  + "-" 
                + currentdate.getFullYear() + " "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();
}

module.exports = router;