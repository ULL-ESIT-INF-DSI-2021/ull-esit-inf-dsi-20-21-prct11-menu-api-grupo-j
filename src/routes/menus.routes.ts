import { Request, Response, Router } from 'express'
import Menu from '../models/Menu'

class MenuRoutes {
    router: Router;
    constructor() {
        this.router = Router();
        this.routes();
    }

    getMenus(req: Request, res: Response) {
        const filter = req.query.name?{name: req.query.name.toString()}:{};

        Menu.find(filter).then((menus) => {
            if (menus.length !== 0) {
                res.send(menus);
            } else {
                res.status(404).send();
            }
        }).catch(() => {
            res.status(500).send();
        })
    }

    getMenuById(req: Request, res: Response) {
        Menu.findById(req.params.id).then((menus) => {
            if (!menus) {
                res.status(404).send();
            } else {
                res.send(menus);
            }
        }).catch(() => {
            res.status(500).send();
        });
    }

    postMenu(req: Request, res: Response) {
        const menu = new Menu(req.body);
        menu.save().then((menus) => {
            res.status(201).send(menus);
        }).catch((error: Error) => {
            res.status(400).send(error);
        });
    }

    patchMenu(req: Request, res: Response) {
        if (!req.query.name) {
            res.status(400).send({
                error: 'A name must be provided',
            });
        } else {
            const allowedUpdates = ['name', 'ingredientTypes', 'courses', 'menuPrice', 'menuComposition'];
            const actualUpdates = Object.keys(req.body);
            const isValidUpdate =
                actualUpdates.every((update) => allowedUpdates.includes(update));

            if (!isValidUpdate) {
                res.status(400).send({
                    error: 'Update is not permitted',
                });
            } else {
                Menu.findOneAndUpdate({ name: req.query.name.toString() }, req.body, {
                    new: true,
                    runValidators: true,
                }).then((menu) => {
                    if (!menu) {
                        res.status(404).send();
                    } else {
                        res.send(menu);
                    }
                }).catch((error) => {
                    res.status(400).send(error);
                });
            }
        }
    }

    deleteMenu(req: Request, res: Response) {
        if (!req.query.name) {
            res.status(400).send({
                error: 'A name must be provided',
            });
        } else {
            Menu.findOneAndDelete({ name: req.query.name.toString() }).then((menu) => {
                if (!menu) {
                    res.status(404).send();
                } else {
                    res.send(menu);
                }
            }).catch(() => {
                res.status(400).send();
            })
        }
    }

    routes() {
        this.router.get('/menus', this.getMenus);
        this.router.post('/menus', this.postMenu);
        this.router.patch('/menus', this.patchMenu);
        this.router.delete('/menus', this.deleteMenu);
    }
}

const menuRoutes = new MenuRoutes();
menuRoutes.routes();
export default menuRoutes.router;