import { Router, Request, Response } from "express";
var router = Router();
import {
  createPets,
  getPets,
  updatePets,
  getPet,
} from "../controllers/animalsController";
import { getCarts, getCart, createOrder, deleteCart } from "../controllers/cartControllers";
const multiparty = require("connect-multiparty");
const multipartyMiddleware = multiparty();
import { auth } from "../controllers/userAuthentication";

router.get("/animals", async (_req, res: Response) => {
  const animals = await getPets();
  if (!animals) res.status(404).json({ error: "Something went wrong" });
  return res.json({ data: animals });
});

router.get("/animals/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const animal = await getPet(id);
  if (!animal) res.status(404).json({ error: "Something went wrong" });
  return res.json({ data: animal });
});

router.post(
  "/animals", auth,
  async (req: Request, res: Response) => {
    const animal = await createPets(req.body, req, res);
    if (!animal) res.status(404).json({ error: "Something went wrong" });
    return res.json({ data: animal });
  }
);

router.patch(
  "/animals/:updateId",
  auth,
  async (req: Request, res: Response) => {
    const { updateId } = req.params;
    const animal = await updatePets(req.body, updateId);
    if (!animal) res.status(404).json({ error: "Something went wrong" });
    return res.json({ data: animal });
  }
);

router.get("/orders", async (req: any, res: Response) => {
  const carts = await getCarts();
  return res.json({ data: carts });
});

router.post("/orders", auth, async (req: Request, res: Response) => {
  const carts = await createOrder(req.body, req, res);
  return res.json({ data: carts });
});

router.delete(
  "/orders/:deleteId",
  auth,
  async (req: Request, res: Response) => {
    const carts = await deleteCart(req);
    return res.json({ data: carts });
  }
);

export default router;
