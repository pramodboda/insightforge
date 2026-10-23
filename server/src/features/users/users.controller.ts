// import {getEmployees100} from "./users.model";

import type {Request, Response, NextFunction} from "express";

import * as userService from "./users.service";

export async function getEmployees100(
    _req:Request,
    res:Response,
    next: NextFunction
){
    try{
        const users = await userService.getEmployees100();

        res.status(200).json({data: users});
    }catch(error:any){
        console.error("Error detching users:",{
            message:"Internal server error",
            error: error?.message || "Unknown error",
        });

        next(error);

    }
}

// export async function createUser(
//     req: Request,
//     res: Response,
//     next: NextFunction
//   ) {
//     try {
//       const user = await userService.createUser(req.body);
  
//       res.status(201).json({ data: user });
//     } catch (error) {
//       next(error);
//     }
//   }