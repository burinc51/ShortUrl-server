    const express = require('express')
    const cors = require('cors');
    const mongoose = require('mongoose')
    const shortid = require('shortid');

    const app = express()
    const port = 8000

    app.use(express.urlencoded({ extended: true }))
    app.use(express.json())
    app.use(express.static('public'))
    app.use(cors()); 

    
    mongoose.connect('mongodb+srv://burin:4uGZj0TupkvS9ncf@cluster0.9lxvgcs.mongodb.net/db1', {
        useNewUrlParser: true, useUnifiedTopology: true
    })
        .then(result => console.log('Connecttion OK'))
        .catch(err => console.log(err))

    let productSchema = new mongoose.Schema({
        furl: String,
        surl: String,
        c: Number,
    }, { versionKey: false })

    let Url = mongoose.model('Url', productSchema)
    module.exports = Url

    app.post('/api/form', async (req, res) => {
        const inputValue = req.body.inputValue;
        const shorturl = shortid.generate();
        const newUrl = new Url({
            furl: inputValue,
            surl: shorturl,
            c:0
        })
        try {
            const savedUrl = await newUrl.save();
            res.json({shorturl: savedUrl.surl});
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    })

    app.get('/:url', async (req, res) => {
        const shorturl = req.params.url;
        try {
            const urlData = await Url.findOne({ surl: shorturl });
            if (!urlData) {
                return res.status(404).send('Short URL not found');
            }
            urlData.c += 1;
            await urlData.save();
            res.redirect(urlData.furl);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    });

    app.get('/api/url', async (req, res) => {
        try {
            const urls = await Url.find(); 
            res.json(urls); 
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    });

    app.delete('/api/delete', async (req, res) => {
        const id = req.body.prop;
        try {
            await Url.findByIdAndDelete(id);
            res.json({ message: "URL deleted successfully" });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    });
    

    app.listen(port, () => console.log('Server listening on port' + port))
