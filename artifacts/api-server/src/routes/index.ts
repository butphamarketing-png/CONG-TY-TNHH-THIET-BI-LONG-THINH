import { Router, type IRouter } from "express";
import healthRouter from "./health";
import productsRouter from "./products";
import categoriesRouter from "./categories";
import brandsRouter from "./brands";
import bannersRouter from "./banners";
import newsRouter from "./news";
import showroomsRouter from "./showrooms";
import policiesRouter from "./policies";
import ordersRouter from "./orders";
import searchRouter from "./search";

const router: IRouter = Router();

router.use(healthRouter);
router.use(productsRouter);
router.use(categoriesRouter);
router.use(brandsRouter);
router.use(bannersRouter);
router.use(newsRouter);
router.use(showroomsRouter);
router.use(policiesRouter);
router.use(ordersRouter);
router.use(searchRouter);

export default router;
