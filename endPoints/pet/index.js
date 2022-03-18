const router = require("express").Router();
const Pet = require("./Pet");

// Pet related end points
router.post("/", Pet.insertNewPet);
router.delete("/deleteall", Pet.deleteAllPet);
router.get("/getall", Pet.getAllPet);
router.get("/:id", Pet.getPet);
router.put("/:id", Pet.updatePet);
router.delete("/:id", Pet.deletePet);
module.exports = router;
