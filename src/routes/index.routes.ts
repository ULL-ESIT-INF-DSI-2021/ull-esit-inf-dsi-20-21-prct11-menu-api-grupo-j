import {Request, Response, Router} from 'express'
import ingredientRoutes from './ingredients.routes'

class ApiRoutes {
    router: Router;
    constructor() {
        this.router = Router();
        this.routes();
    }

    routes() {
        this.router.get('/', (req, res) => {
            res.send("To use the API, you must go to: /ingredients /courses or /menus");
        })
        this.router.use(ingredientRoutes);
    }
}

const apiRoutes = new ApiRoutes();
apiRoutes.routes();
export default apiRoutes.router;