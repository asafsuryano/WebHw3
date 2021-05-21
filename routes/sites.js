const express = require('express');
const multer = require('multer');
const uuid = require('uuid').v4;
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function(req, file, cb) {
        const { originalname } = file;
        cb(null, `${uuid()}-${originalname}`);
    }
});

const router = express.Router();
const Site = require('../models/site');
const upload = multer({ storage: storage });

// Getting all
router.get('/', async(req, res) => {
    try {
        const sites = await Site.find()
        res.send(sites)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

// Getting one
router.get('/:id', getSite, (req, res) => {
    res.send(res.site)
})

// Creating one
router.post('/', upload.single('picturefile'), async(req, res) => {
    const site = new Site({
        title: req.body.title,
        details: req.body.details,
        path: req.file.path
    })
    try {
        const newSite = await site.save()
        res.status(201).json(newSite)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

// Updating one
router.patch('/:id', getSite, async(req, res) => {
    if (req.body.title != null) {
        res.site.title = req.body.title
    }
    if (req.body.path != null) {
        res.site.path = req.body.path
    }
    if (req.body.details != null) {
        res.site.details = req.body.details
    }
    try {
        const udp = await res.site.save()
        res.json(udp)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

// Deleting One
router.delete('/:id', getSite, async(req, res) => {
    try {
        await res.site.remove()
        res.json({ message: 'Deleted' })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

router.delete('/', async(req, res) => {
    try {
        const sites = await Site.find()
        sites.forEach(element => element.remove());
        res.json({ message: 'Deleted' })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

async function getSite(req, res, next) {
    try {
        site = await Site.findById(req.params.id)
        if (site == null) {
            return res.status(404).json({ message: 'Cannot find site' })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
    res.site = site
    next()
}

module.exports = router