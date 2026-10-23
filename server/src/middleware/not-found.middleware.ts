
import type { Request, Response, NextFunction } from "express";

export default function notFoundMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (res.headersSent) {
    return next();
  }

  res.status(404).json({
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
}
