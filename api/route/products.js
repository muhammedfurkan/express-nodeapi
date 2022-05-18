const express = require('express');
const router = express.Router();

const multer = require('multer');
const checkAuth = require('../middleware/check-auth');
const ProductController = require('../controllers/products');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'D:/KULLANICILAR/Desktop/Temp/node-api/uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    //reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {

        cb(null, false);
    }

}
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});





router.get('/', checkAuth, ProductController.product_get_all);

router.post('/', upload.single('productImage'), checkAuth, ProductController.product_create_product);

router.get('/:productId', checkAuth, ProductController.product_get_product);

router.patch('/:productId', ProductController.product_update_product);

router.delete('/:productId', ProductController.product_delete_product)

module.exports = router;