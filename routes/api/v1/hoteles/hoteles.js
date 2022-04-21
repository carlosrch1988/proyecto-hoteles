const express = require('express');
const router = express.Router();

const Hoteles = new require('../../../../dao/hoteles/hoteles.model');
const hotelesModel = new Hoteles();

router.get('/', (req, res) => {
    res.status(200).json({
        endpoint: 'Hoteles',
        updates: new Date(2022, 0, 19, 18, 41, 00)
    });
}); //GET /

router.get('/all', async(req, res) => {
    try {
        const rows = await hotelesModel.getAll();
        res.status(200).json({ status: 'ok', hotel: rows });
    } catch (ex) {
        console.log(ex);
        res.status(500).json({ status: 'failed' });
    }
});
// /byid/1;
router.get('/byid/:id', async(req, res) => {
    try {
        const { id } = req.params;
        const row = await hotelesModel.getById(parseInt(id));
        res.status(200).json({ status: 'ok', hotel: row });
    } catch (ex) {
        console.log(ex);
        res.status(500).json({ status: 'failed' });
    }
});

//router.post();
router.post('/new', async(req, res) => {
    const { nombre, telefono, url, ubicacion } = req.body;
    try {
        rslt = await hotelesModel.new(nombre, telefono, url, ubicacion);
        res.status(200).json({
            status: 'ok',
            result: rslt
        });
    } catch (ex) {
        console.log(ex);
        res.status(500).json({
            status: 'failed',
            result: {}
        });
    }
}); //POST /new

//router.put();
router.put('/update/:id', async(req, res) => {
    try {
        const { nombre, telefono, url, ubicacion } = req.body;
        const { id } = req.params;
        const result = await hotelesModel.updateOne(id, nombre, telefono, url, ubicacion);
        res.status(200).json({
            status: 'ok',
            result
        });
    } catch (ex) {
        console.log(ex);
        res.status(500).json({ status: 'failed' });
    }
});

//router.delete();
router.delete('/delete/:id', async(req, res) => {
    try {
        const { id } = req.params;
        const result = await hotelesModel.deleteOne(id);
        res.status(200).json({
            status: 'ok',
            result
        });
    } catch (ex) {
        console.log(ex);
        res.status(500).json({ status: 'failed' });
    }
});



module.exports = router;
