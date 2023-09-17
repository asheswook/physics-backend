import { Router } from "express";
import { modifyTable, searchTable } from "../controllers/table";

const router = Router();

router.post("/search", searchTable);
router.post("/modify", modifyTable);

export default router;
