/* eslint-disable @typescript-eslint/consistent-indexed-object-style */
import { Request } from "express";

export interface ICustomRequest extends Request{
    [key: string]: unknown
}
