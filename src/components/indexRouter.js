import { Router } from "express";
import eventRoute from "./events/eventRoute.js";
import fileRoute from "./files/fileRoute.js";
const router = Router();

router.use("/event", eventRoute);
router.use("/upload", fileRoute);
export default router;
