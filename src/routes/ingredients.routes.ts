import {Request, Response, Router} from 'express'
import Ingredient from '../models/Ingredient'

class IngredientRoutes {
    router: Router;
    constructor() {
        this.router = Router();
        this.routes();
    }

    getIngredients(req: Request, res: Response) {
        const filter = req.query.title?{title: req.query.title.toString()}:{};

        Ingredient.find(filter).then((ingredients) => {
            if (ingredients.length !== 0) {
                res.send(ingredients);
            } else {
                res.status(404).send();
            }
        }).catch(() => {
            res.status(500).send();
        })
    }

    getIngredientById(req: Request, res: Response) {
        Ingredient.findById(req.params.id).then((ingredient) => {
            if(!ingredient) {
                res.status(404).send();
            } else {
                res.send(ingredient);
            }
        }).catch(() => {
            res.status(500).send();
        });
    }

    postIngredient(req: Request, res: Response) {
        const ingredient = new Ingredient(req.body);
        ingredient.save().then((ingredient) => {
            res.status(201).send(ingredient);
        }).catch((error: Error) => {
            res.status(400).send(error);
        });
    }

    patchIngredient(req: Request, res: Response) {
        if (!req.query.name) {
            res.status(400).send({
                error: 'A name must be provided',
            });
        } else {
            const allowedUpdates = ['name', 'ingredientGroup', 'location', 'nutrients', 'pricePerKg'];
            const actualUpdates = Object.keys(req.body);
            const isValidUpdate =
                actualUpdates.every((update) => allowedUpdates.includes(update));

            if (!isValidUpdate) {
                res.status(400).send({
                    error: 'Update is not permitted',
                });
            } else {
                Ingredient.findOneAndUpdate({ name: req.query.name.toString() }, req.body, {
                    new: true,
                    runValidators: true,
                }).then((ingredient) => {
                    if (!ingredient) {
                        res.status(404).send();
                    } else {
                        res.send(ingredient);
                    }
                }).catch((error) => {
                    res.status(400).send(error);
                });
            }
        }
    }

    deleteIngredient(req: Request, res: Response) {
        if(!req.query.name) {
            res.status(400).send({
                error: 'A name must be provided',
            });
        } else {
            Ingredient.findOneAndDelete({name: req.query.name.toString()}).then((ingredient) => {
                if(!ingredient) {
                    res.status(404).send();
                } else {
                    res.send(ingredient);
                }
            }).catch(() => {
                res.status(400).send();
            })
        }
    }

    routes() {
        this.router.get('/ingredients', this.getIngredients);
        this.router.post('/ingredients', this.postIngredient);
        this.router.patch('/ingredients', this.patchIngredient);
        this.router.delete('/ingredients', this.deleteIngredient);
    }
}

const ingredientRoutes = new IngredientRoutes();
ingredientRoutes.routes();
export default ingredientRoutes.router;