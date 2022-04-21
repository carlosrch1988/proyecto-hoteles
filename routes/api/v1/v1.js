const express = require('express');
const router = express.Router();
const hotelesRoutes = require('./hoteles/hoteles');
//middlewares
router.use('/hoteles', hotelesRoutes);
module.exports = router;
