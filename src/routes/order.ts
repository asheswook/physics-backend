import { Router } from "express";
import { orderMenu, searchOrder, modifyOrder } from "../controllers/order";

const router = Router();

router.post("/search", searchOrder);
router.post("/modify", modifyOrder);
router.post("/", orderMenu);

export default router;
