import { Router } from "express";
const router = Router();

router.get("/", (req, res) => res.json({ message: "Community Data" }));

export default router;
