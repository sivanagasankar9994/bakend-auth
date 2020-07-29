const express = require("express");
const taskController = require("../taskController");
const authController = require("../authController");
const auth = require("../../utils/auth");

const router = express.Router();

router
  .route("/")
  .get(auth, taskController.getAllUsers)
  .post(taskController.createTask);

router.route("/login").post(taskController.login);
router.route("/logout/:id").post(auth, taskController.logout);
router
  .route("/:id")
  .get(auth, taskController.getUser)
  .delete(
    auth,
    authController.restrictTo("admin", "lead-guide"),
    taskController.deleteUser
  )
  .put(auth, taskController.updateUser);
module.exports = router;
