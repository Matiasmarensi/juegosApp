// src/types/express.d.ts
declare namespace Express {
  export interface Request {
    user?: any; // Aquí defines que req.user puede ser cualquier cosa (o puedes especificar el tipo exacto)
  }
}
