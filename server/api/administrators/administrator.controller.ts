import { Router } from "express";
import Administrator from "./administrator"
import { createAdmin, login } from "../../database/methods/administrator.methods"

const administratorsController = Router ();

const MONGODB_ERRORS = {
    DUPLICATE_KEY: 11000,
};

administratorsController.post ('/create', async (req, res) => {
    const admin = new Administrator (req.body.username, req.body.email, req.body.password, req.body.firstName, req.body.lastName);

    var token : Promise<any>
    try {
        token = await createAdmin (admin)
    } catch (error) {
        
        if (error.code === MONGODB_ERRORS.DUPLICATE_KEY) {
            res.status (400).json ( {errorMessage: "Duplicate key error. This record already exists."} );
        } else {
            console.log (error.name);
            res.status (500).json ( {errorMessage: error.name} );
        }
        return;
    }

    res.status (201).json ({ token: token});
})

administratorsController.post ('/login', async (req, res) => {

    var token: string;
    try {
        token = await login (req.body.username, req.body.password);
    } catch (error) {

        res.status (400).json ( {errorMessage: "Login error: " + error} );
        return;
    }
    res.status (201).json ( {authToken: token} );
})

export default administratorsController