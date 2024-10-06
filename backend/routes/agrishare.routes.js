import express from 'express';
import { agrishare, deleteinfo, getallfarmingInfo } from '../controller/agrishare.controller.js';
import { isauthenticated } from '../middleware/authUser.js';
const router = express.Router();
router.post("/agrishare", isauthenticated, agrishare);
router.delete("/delete/:id", isauthenticated, deleteinfo);
router.get("/all-farmingInfo", isauthenticated, getallfarmingInfo);

export default router;