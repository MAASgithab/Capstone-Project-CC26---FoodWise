const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        data: [
            { id: 1, name: 'Kompos' },
            { id: 2, name: 'Bokashi' },
            { id: 3, name: 'Eco-Enzym' },
            { id: 4, name: 'Diberikan ke Hewan' }
        ]
    });
});

module.exports = router;