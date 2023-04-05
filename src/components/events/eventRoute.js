import { Router } from "express";
import {
    createEvent,
    deleteEvent,
    getAllEvent,
    getOneEvent,
    updateEvent,
} from "./eventController.js";

const router = Router();

router.route("/").get(getAllEvent).post(createEvent);

router.route("/:id").get(getOneEvent).patch(updateEvent).delete(deleteEvent);

export default router;
