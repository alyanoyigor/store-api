import { Response } from 'express';

export function formatResponse(error: boolean, data: any) {
  return {
    error,
    data,
  };
}

export function formatSuccessResponse(res: Response, data: any) {
  return res.status(200).json(formatResponse(false, data));
}

export function formatErrorResponse(res: Response, error: any) {
  return res.status(400).json(formatResponse(true, error));
}
