const { getAllMqtts, createMqtt } = require("../controllers/mqttController");

const router = require("express").Router();

router.get("/mqtt", getAllMqtts);
router.post("/mqtt", createMqtt);

module.exports = router;
