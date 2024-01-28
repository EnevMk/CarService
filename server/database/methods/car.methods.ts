import express from "express";
import { CarModel } from "../models/car.model";
import Car from "../../api/cars/car"
import mongoose, { mongo } from "mongoose";

export async function checkCarByVIN (
    _VIN: String
): Promise<any> {
    return await CarModel.find ({ VIN: _VIN} );
}

export async function addCar (car: Car): Promise<any>
{
    const carModel = new CarModel ({
        VIN: car.VIN,
        brand: car.brand,
        model: car.model,
        service: car.service,
    })

    const validationError = carModel.validateSync ();

    if (validationError) {
        throw new Error ("Invalid CarModel for the database: " + validationError);
    }

    return await carModel.save ();
}