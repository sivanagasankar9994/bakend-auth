const express = require("express");
const relationController = require("../relationController");

const router = express.Router();

router
  .route("/")
  .post(relationController.createPerson)
  .get(relationController.getPersons);
router.route("/:id").get(relationController.getPerson);
router
  .route("/:personId/cars")
  .post(relationController.createCar)
  .get(relationController.getPersonCars);
// .get(relationController.getPersons);

router.route("/single").post(relationController.createSingleRelation);
router.route("/single/:id").get(relationController.getRealtion);
router.route("/:relationId/address").post(relationController.createAddress);
// .get(relationController.getPersons);
module.exports = router;
