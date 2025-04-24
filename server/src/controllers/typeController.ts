import type { Request, Response } from "express";
import { db } from "../db/db";
import { exerciseTypesTable } from "../db/schema";

export async function getTypes(req: Request, res: Response) {
  const types = await db.select().from(exerciseTypesTable);
  res.json(types);
}


export async function createType(req: Request, res: Response) {
  const { name } = req.body;
  const newType = await db
    .insert(exerciseTypesTable)
    .values({ name })
    .returning();
  res.json(newType);
}
