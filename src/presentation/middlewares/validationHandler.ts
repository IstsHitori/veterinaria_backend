import { Request, Response, NextFunction } from "express";
import { ValidationError } from "class-validator";

// Esta función transforma los errores de class-validator en un formato legible
function formatValidationErrors(errors: ValidationError[]) {
  return errors.map((error) => ({
    field: error.property,
    errors: Object.values(error.constraints || {}),
  }));
}

// Middleware para manejar errores de validación
export function validationErrorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  // Si el error es un array de ValidationError (class-validator)
  if (Array.isArray(err) && err[0] instanceof ValidationError) {
    res.status(400).json({
      message: "Datos inválidos",
      errors: formatValidationErrors(err),
    });
    return;
  }

  // Si el error viene de class-transformer (por ejemplo, error de tipo)
  if (err instanceof SyntaxError && "body" in err) {
    res.status(400).json({
      message: "JSON malformado o datos incorrectos en el body",
    });
    return;
  }

  // Otros errores pasan al siguiente middleware
  return next(err);
}
