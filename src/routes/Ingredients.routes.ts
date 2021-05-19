import {Request, Response, Router} from 'express'

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
        const ingredient = new Ingredient();
        //then 201 catch 400
        ingredient.save().then((ingredient: Ingredient) => {
            res.status(201).send(ingredient);
        }).catch((error: Error) => {
            res.status(400).send(error);
        });
    }

    putIngredient(req: Request, res: Response) {
        res.send("put");
    }

    deleteIngredient(req: Request, res: Response) {
        if(!req.query.title) {
            res.status(400).send({
                error: 'A title must be procided',
            });
        } else {
            Ingredient.findOneAndDelete({title: req.query.title.toString()}).then((ingredient) => {
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
        this.router.put('/ingredients', this.putIngredient);
        this.router.delete('/ingredients', this.deleteIngredient);
    }
}

const ingredientRoutes = new IngredientRoutes();
ingredientRoutes.routes();
export default ingredientRoutes.router;