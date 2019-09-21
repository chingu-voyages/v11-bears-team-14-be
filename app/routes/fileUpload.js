const express = require('express');
const cors = require('cors');
const router = express.Router();

router.all('*', cors());

router.post('/uploadPlacePic', async (req, res) => {
    if (!req.files) {
        return res.status(400).send('No files were uploaded');
    }

    let placePic = req.files.placepic;
    let placeId = req.body.placeid;

    placePic.mv(`uploaded_files/places/${placeId}/placepic.jpg`, (err) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.send('File uploaded!');
    });
});

router.post('/uploadProfilePic', async (req, res) => {
    if (!req.files) {
        return res.status(400).send('No files were uploaded');
    }

    let profilePic = req.files.profilepic;
    let userId = req.body.userid;

    profilePic.mv(`uploaded_files/users/${userId}/profilepic.jpg`, (err) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.send('File uploaded');
    });
});

module.exports = router;
