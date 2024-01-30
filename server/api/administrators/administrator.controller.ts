import { Router } from "express";
import Administrator from "./administrator"
import { createAdmin } from "../../database/methods/administrator.methods"

const administratorsController = Router ();

administratorsController.post ('/create', async (req, res) => {
    const admin = new Administrator (req.body.username, req.body.email, req.body.password, req.body.firstName, req.body.lastName);

    const token = await createAdmin (admin)

    res.status (201).json ({ token: token});
})

export default administratorsController