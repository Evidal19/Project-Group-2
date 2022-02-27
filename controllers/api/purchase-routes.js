const router = require('express').Router();
const { User, Post, Purchase } = require('../../models');
// import models here

// uses /api/purchases

// expects: http://localhost:3001/api/purchases/
router.get('/', (req, res) => {
    // Get the purchase history and sell history for all users
    // POSSIBLY MAKE A SEPARATE ROUTE FILE FOR EACH GETTING PURCHASE HISTORY AND SOLD HISTORY
    Purchase.findAll().then(purchases => {
        res.json({ message: 'Success', purchases });
    });
});

// expects: http://localhost:3001/api/purchases/2
router.get('/:id', (req, res) => {
    let userId = req.params.id;
    // Get the purchase and sell history for the user specified
    Purchase.findAll({
        where: {
            user_id: userId
        }
    }).then(purchases => {
        res.json({ message: 'success', purchases });
    });
});

// expects: http://localhost:3001/api/purchases/2
// expects JSON
// ex. { purchase_amount: 100, post_id: 4, user_id: 5 }
// change based on table layout
router.post('/', (req, res) => {
    let id = req.params.id;

    Purchase.create(
        {
            purchase_amount: req.body.purchase_amount,
            post_id: req.body.post_id,
            user_id: req.body.user_id
        }
    ).then(newPurchase => res.json({ message: 'success', newPurchase }));
    // Create a new purchase for the user specified by id
})

// expects: http://localhost:3001/api/purchases/2/10
// expects similar json to post request
router.put('/:purchaseId', (req, res) => {
    let purchaseId = req.params.purchaseId;

    Purchase.update({
        purchase_amount: req.body.purchase_amount,
        post_id: req.body.post_id,
        user_id: req.body.user_id
    },{
        where: {
            id: purchaseId
        }
    }).then(updatedPurchase => {
        res.json({ message: 'success', updatedPurchase })
    })
    // update purchase information based on purchase id
});

router.delete('/:purchaseId', (req, res) => {
    let purchaseId = req.params.purchaseId;

    // delete purchase based on purchase id
    Purchase.destroy({
        where: {
            id: purchaseId
        }
    }).then(deletedPurchase => {
        res.json({ message: 'success', deletedPurchase })
    })
});

module.exports = router;