const router = require('express').Router();
const multer = require('multer');

/* Controller Imports */
const collectionController = require("./controllers/collectionController");

/* Multer configuration */
const allowedFileTypes = ['audio/wav', 'audio/mp3', 'audio/flac', 'audio/mpeg'];

const storage = multer.diskStorage({
    destination: './collection/',
    filename: (req, file, callback) => {
        callback(null, file.originalname)
    }
});

const upload = multer({
    storage: storage,
    fileFilter: (req, file, callback) => {
        if (!allowedFileTypes.includes(file.mimetype.toLowerCase())) {
            callback(null, false);
        }
        callback(null, true);
    },

});


/**x
 * GET: get all Song from the Database
 */
router.get(
    "/listSongs",
        collectionController.listSongs
);

/**
 * POST: Add a new Song to our Local folder and/or to the database
 */
router.post(
    '/add',
    upload.single('file'),
    collectionController.add
);

/**
 * REMOVE: removes a Song from the database and Local Folder
 */

router.delete(
    '/remove',
    collectionController.remove
)

router.post(
    '/sync',
    collectionController.sync
)

module.exports = router;