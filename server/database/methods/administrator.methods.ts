import express from "express";
import { AdministratorModel } from "../models/administrator.model";
import Administrator from "../../api/administrators/administrator" 
import { tokenGenerator } from "../../utils/token-generator";

export async function createAdmin (admin: Administrator): Promise<any>
{
    const adminModel = new AdministratorModel ({
        username: admin.username,
        email: admin.email,
        password: admin.password,
        firstName: admin.firstName,
        lastName: admin.lastName
    })

    const validationError = adminModel.validateSync ();

    if (validationError) {
        throw new Error ("Invalid AdministratorModel for the database: " + validationError);
    }

    const newAdmin = await adminModel.save ();

    const token = tokenGenerator (admin.username);
    return token;
}