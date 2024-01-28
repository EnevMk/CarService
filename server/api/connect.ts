import { Application, Router } from "express";
import carsController from "./cars/cars.controller"

const router = Router()

export const connect = (app: Application, path: string): void => {
    router.use('/cars', carsController);
    app.use(path, router);
}