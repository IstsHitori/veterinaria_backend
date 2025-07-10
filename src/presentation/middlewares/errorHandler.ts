import { Request, Response, NextFunction } from "express";
import { BadRequest } from "@/domain/errors/BadRequest";
import { Unauthorized } from "@/domain/errors/Unauthorized";
import { NotFound } from "@/domain/errors/NotFound";
import { ValidationError } from "class-validator";
import { DatabaseError } from "@/domain/errors/DatabaseError";

export interface ErrorResponse {
  message: string;
  errors?: Array<{
    field: string;
    errors: string[];
  }>;
  statusCode: number;
}

function isClassValidatorError(error: any): error is ValidationError[] {
  return (
    Array.isArray(error) &&
    error.length > 0 &&
    typeof error[0] === "object" &&
    Object.prototype.hasOwnProperty.call(error[0], "property")
  );
}

function mapClassValidatorErrors(
  errors: ValidationError[]
): Array<{ field: string; errors: string[] }> {
  return errors.map((err) => ({
    field: err.property,
    errors: Object.values(err.constraints || {}),
  }));
}

export const errorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const timestamp = new Date().toISOString();
  const path = req.path;

  let errorResponse: ErrorResponse;

  // Errores de class-validator
  if (isClassValidatorError(error)) {
    errorResponse = {
      message: "Datos inválidos",
      errors: mapClassValidatorErrors(error),
      statusCode: 400,
    };
    res.status(400).json(errorResponse);
    return;
  }

  // Errores de dominio (Value Object, BadRequest, etc.)
  if (error instanceof BadRequest) {
    // Si el error tiene un campo, lo formateamos igual que class-validator
    if (error.field) {
      errorResponse = {
        message: "Datos inválidos",
        errors: [
          {
            field: error.field,
            errors: [error.message],
          },
        ],
        statusCode: error.statusCode,
      };
    } else {
      errorResponse = {
        message: error.message,
        statusCode: error.statusCode,
      };
    }
    res.status(error.statusCode).json(errorResponse);
    return;
  }

  if (error instanceof Unauthorized) {
    errorResponse = {
      message: error.message,
      statusCode: error.statusCode,
    };
    res.status(error.statusCode).json(errorResponse);
    return;
  }

  if (error instanceof NotFound) {
    errorResponse = {
      message: error.message,
      statusCode: error.statusCode,
    };
    res.status(error.statusCode).json(errorResponse);
    return;
  }

  // Errores de base de datos
  if (error instanceof DatabaseError) {
    // Loguea el error técnico completo para desarrolladores
    console.error("DatabaseError:", error.originalError || error);

    errorResponse = {
      message: "Error interno de base de datos. Por favor, intente más tarde.",
      statusCode: error.statusCode,
    };
    res.status(error.statusCode).json(errorResponse);
    return;
  }

  // Error no manejado
  console.error("Error no manejado:", error);
  errorResponse = {
    message: "Error interno del servidor",
    statusCode: 500,
  };
  res.status(500).json(errorResponse);
};
