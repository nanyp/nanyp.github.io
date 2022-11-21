const express = require("express");
const { userRegister,
    loginUser,
    logOut,
    forgotPassword,
    resetPassword,
    getUserProfile,
    updatePassword,
    updateProfile,
    getAllUsers,
    getUserDetails,
    updateUser,
    deleteUser } = require("../controllers/authController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

router.route('/user/register').post(userRegister)
router.route('/login').post(loginUser)
router.route('/logout').get(isAuthenticatedUser, logOut)
router.route("/forgotPassword").post(forgotPassword)
router.route('/resetPassword/:token').post(resetPassword)
router.route('/myAccount').get(isAuthenticatedUser, getUserProfile)
router.route('/myAccount/updatePassword').put(isAuthenticatedUser, updatePassword)
router.route('/myAccount/updateProfile').put(isAuthenticatedUser, updateProfile)

router.route('/admin/viewAllUsers').get(isAuthenticatedUser, authorizeRoles("admin"), getAllUsers)
router.route('/admin/user/:id').get(isAuthenticatedUser, authorizeRoles("admin"), getUserDetails)
router.route('/admin/updateUser/:id').put(isAuthenticatedUser, authorizeRoles("admin"), updateUser)
router.route('/admin/deleteUser/:id').delete(isAuthenticatedUser, authorizeRoles("admin"), deleteUser)

module.exports = router