const express = require('express');
const router = express.Router();

const coursesController = require('../app/controllers/CourseController');

router.get("/create", coursesController.create)
router.post("/store", coursesController.store)
router.get("/:id/edit", coursesController.edit)
router.post("/handle-form-action", coursesController.handleFormAction)
router.post("/handle-form-action-trash", coursesController.handleFormActionTrash)
router.put("/:id", coursesController.update)
router.patch("/:id/restore", coursesController.restore)
router.delete("/:id", coursesController.destroy)
router.delete("/:id/force", coursesController.forceDestroy)
router.get('/:slug', coursesController.show);


module.exports = router;
