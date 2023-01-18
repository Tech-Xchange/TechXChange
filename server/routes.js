const router = require('express').Router();
const { Users, Trades, Shared } = require('./controllers');

router.get('/users/user/:id', Users.getUser);
router.post('/users', Users.createUser);
router.post('/users/auth', Users.authUser);

router.post('/trades/involved', Trades.getInvolvedTrades);//WORKING
router.get('/trade/:tradeID', Trades.getTradeFromID);//..........
router.get('/item/:itemID', Shared.getItemFromID);//WORKING
router.get('/items/user/:userID', Shared.getItemsFromUserID); //WORKING
router.post('/item/insert/:userID', Shared.insertDevice); //WORKING
router.put('/trade/status/:tradeID/:newStatus', Trades.updateTradeFromID);//WORKING
router.post('/trades', Trades.createNewTrade); //WORKING

module.exports = router;
