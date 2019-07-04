const path = require('path'); 
const Shark = require('../models/sharks'); 

const index = (req, res) => {
    res.sendFile(path.resolve('../../node_project/views/shark.html'));
}

const create = (req, res) => {
    let newShark = new Shark(req.body);
    console.log(req.body)
    newShark.save((err) => {
        if(err) {
            res.status(400).sned('Unable to save shark to database');
        }
        else {
            res.redirect('/sharks/getshark')
        }
    })
}

const list = (req, res) => {
    Shark.find({}).exec((err, sharks) => {
        if (err) {
            return res.send(500, err)
        }
        res.render('getshark', {
            sharks: sharks
        })
    })
}