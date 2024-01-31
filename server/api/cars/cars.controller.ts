import { Router } from "express";
import { CarModel } from "../../database/models/car.model";
import Car from "./car"
import { checkCarByVIN, addCar, setServicePrice } from "../../database/methods/car.methods";
import { validateToken } from "../../middleware/token-validator";
import { validateTestCard } from "../../external/payment-api"

const carsController = Router()

carsController.get('/get_by_VIN/:VIN', async (req, res) => {
    
    if (!req.params.VIN) {
        res.status(400).json ({errorMessage: "No VIN provided"});
        return;
    }

    /* const VIN = parseInt (req.params.VIN);

    if (isNaN (VIN)) {
        res.status (400).json ({errorMessage: "Invalid Client Number value."});
        return;
    } */
    //validateTestCard ();

    var car : Promise<any>;
    try {
        car = await checkCarByVIN (req.params.VIN);
    }
    catch (error) {
        res.status(500).json ({ errorMessage: "Could not retrieve information for client Number " + req.params.VIN + ": " + error});
        return;
    }
    res.status (200).json ({ successMessage: "VIN: " + req.params.VIN, Car_information: car});
})

carsController.post ('/set_price', validateToken, async (req, res) => {
    const vin = req.body.VIN as string;
    const price = parseInt(req.body.price as string);

    if (!vin) {
        res.status(400).json({ errorMessage: "No VIN provided" });
        return;
    }

    if (isNaN(price)) {
        res.status(400).json({ errorMessage: "Invalid price provided" });
        return;
    }

    try {
        console.log("price: ", price);
        console.log("vin: ", vin);
        await setServicePrice(vin, price);
        res.status(200).json({ successMessage: "Car service price updated successfully!" });
    } catch (error) {
        res.status(400).json({ errorMessage: "Error setting car price: " + error });
    }
})

carsController.post('/add_car/', validateToken, async (req, res) => {

    const VIN = req.body.VIN;
    const brand = req.body.brand
    const model = req.body.model
    const service = req.body.service

    if (!VIN || VIN === '') {
        res.status (400).json ({ errorMessage: "No VIN provided! "});
    }

    if (!brand || brand === '') {
        res.status (400).json ({ errorMessage: "No brand provided! "});
    }

    if (!model || model === '') {
        res.status (400).json ({ errorMessage: "No model provided! "});
    }

    if (!service || service === '') {
        res.status (400).json ({ errorMessage: "No service provided! "});
    }

    var car : Promise<any>
    try {
        car = await addCar (new Car (VIN, brand, model, service));
    }
    catch (error) {
        res.status (500).json ({ errorMessage: "Couldn't add car to database: " + error });
        return;
    }
    res.status (201).json ({ successMessage: "Car added successfully!"} )
})

export default carsController;