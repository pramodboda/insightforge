// import {getEmployees100} from "./users.model";

import type {Request, Response, NextFunction} from "express";

import * as userService from "./users.service";

export async function getEmployees(
    _req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const users = await userService.getEmployees();
  
      return res.status(200).json({
        success: true,
        data: users,
      });
    } catch (error) {
      console.error("Error fetching users:", error);
      return next(error);
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