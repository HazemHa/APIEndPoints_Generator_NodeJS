
    const routes = require("express").Router(); 

    const FlashController = require('../controllers/flash'); 

    routes.post('/api/flash',  FlashController.postFlash); // insert new flash

    routes.get('/api/flash',  FlashController.getFlash); // get all flash

    routes.get('/api/flash/:id',  FlashController.getFlashById); // get flash by id

    routes.delete('/api/flash/:id',  FlashController.deleteFlashById); // delete a flash by id

    routes.patch('/api/flash/:id',  FlashController.updateFlashById); // update a flash

    module.exports = routes;
