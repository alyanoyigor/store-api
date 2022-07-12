import express from 'express';

const router = express.Router();

router.use('/', (req, res) => {
    res.send('Hello World');
})

export default router;