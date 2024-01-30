import express from "express";
import { AdministratorModel } from "../models/administrator.model";
import Administrator from "../../api/administrators/administrator" 
import { tokenGenerator } from "../../utils/token-generator";
import { compare } from "bcrypt"

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

export async function login (username: string, password: string): Promise<any>
{
    const searchResult = await AdministratorModel.findOne ( {username: username } );

    if (!searchResult) {
        throw new Error ("No such admin user.");
    }
    if (await compare (password, searchResult.password.toString ())) {
        console.log (password === searchResult.password.toString ())
        throw new Error ("Invalid password");
    }

    const token = tokenGenerator (username);
    return token;
}