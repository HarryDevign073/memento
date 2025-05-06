import { Router } from "express";
const router = Router();

router.get("/", (req, res) => res.json({ message: "Home Data" }));

export default router;
