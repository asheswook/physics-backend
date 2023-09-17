import { Router } from "express";
import { addMenu, modifyMenu, searchMenu } from "../controllers/menu";

const router = Router();

router.post("/search", searchMenu);
router.post("/modify", modifyMenu);
router.post("/add", addMenu);

export default router;
