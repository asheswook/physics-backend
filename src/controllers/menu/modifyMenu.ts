import { NextFunction, Request, Response } from "express";
import { HttpException } from "../../utils/exception";
import { Menu } from "../../models";
import { IMenu } from "../../interfaces";
/*
{
    "name": "메뉴 이름",
    "price": "가격",
    "remove": boolean // Optional
}
*/

export const modifyMenu = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, price, remove }: IMenu = req.body;
    if (!name || !price) return next(new HttpException(400, "BAD_REQUEST"));

    const menu: IMenu = await Menu.findOne({ name: name });
    if (!menu) return next(new HttpException(400, "NO_MENU"));

    if (remove) await menu.remove();

    if (name) menu.name = name;
    if (price) menu.price = price;

    await menu.save();

    res.json({ code: 200 });
  } catch (err) {
    console.log(err);
    return next(new HttpException(400, "BAD_REQUEST"));
  }
};
