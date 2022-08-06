const express = require('express');

 

const { basedir } = global;

const ctrl = require(`${basedir}/controllers/auth`);

const { ctrlWrapper } = require(`${basedir}/helpers`);

const { auth, upload } = require(`${basedir}/middlewares`);

const router = express.Router();

 
router.post('/register', ctrlWrapper(ctrl.register));

//signin
router.post('/login', ctrlWrapper(ctrl.login));

//get.current
router.get("/current", auth, ctrlWrapper(ctrl.getCurrent));

 
router.get('/logout', auth, ctrlWrapper(ctrl.logout));

router.patch("/avatar", auth, upload.single("avatar"), ctrlWrapper(ctrl.setAvatar));

module.exports = router;