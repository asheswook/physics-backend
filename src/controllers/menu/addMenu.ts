import { NextFunction, Request, Response } from "express";
import { HttpException } from "../../utils/exception";
import { Menu } from "../../models";
import { IMenu } from "../../interfaces";
/*
{
    "name": "메뉴 이름",
    "price": "가격",
}
*/

export const addMenu = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, price }: IMenu = req.body;
    if (!name || !price) return next(new HttpException(400, "BAD_REQUEST"));

    await Menu.create({
      name: name,
      price: price,
    });

    res.json({ code: 200 });
  } catch (err) {
    console.log(err);
    return next(new HttpException(400, "BAD_REQUEST"));
  }
};
