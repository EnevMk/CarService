import { Application, Router } from "express";
import carsController from "./cars/cars.controller"
import administratorsController from "./administrators/administrator.controller"

const router = Router()

export const connect = (app: Application, path: string): void => {
    router.use('/cars', carsController);
    router.use('/administrators', administratorsController);
    app.use(path, router);
}