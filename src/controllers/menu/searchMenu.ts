import { NextFunction, Request, Response } from "express";
import { HttpException } from "../../utils/exception";
import { Menu } from "../../models";
import { IMenu } from "../../interfaces";
/*
{

}
*/

export const searchMenu = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, oid } = req.body;
    if (name) {
      const menu: IMenu = await Menu.findOne({ name: name });
      if (!menu) return next(new HttpException(400, "NO_MENU"));
      return res.json({ code: 200, menu: menu });
    }

    if (oid) {
      const menu: IMenu = await Menu.findOne({ _id: oid });
      if (!menu) return next(new HttpException(400, "NO_MENU"));
      return res.json({ code: 200, menu: menu });
    }

    const menus: IMenu[] = await Menu.find();
    return res.json({ code: 200, menus: menus });
  } catch (err) {
    console.log(err);
    return next(new HttpException(400, "BAD_REQUEST"));
  }
};
