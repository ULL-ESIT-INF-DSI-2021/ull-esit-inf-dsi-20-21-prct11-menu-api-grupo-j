import {Request, Response, Router} from 'express';
import Course from '../models/course';

class IngredientRoutes {
    router: Router;
    constructor() {
        this.router = Router();
        this.routes();
    }

    getCourses(req: Request, res: Response) {
        const filter = req.query.title?{title: req.query.title.toString()}:{};

        Course.find(filter).then((courses) => {
            if (courses.length !== 0) {
                res.send(courses);
            } else {
                res.status(404).send();
            }
        }).catch(() => {
            res.status(500).send();
        })
    }

    getCourseById(req: Request, res: Response) {
        Course.findById(req.params.id).then((courses) => {
            if(!courses) {
                res.status(404).send();
            } else {
                res.send(courses);
            }
        }).catch(() => {
            res.status(500).send();
        });
    }

    postCourse(req: Request, res: Response) {
        const course = new Course();
        //then 201 catch 400
        course.save().then((course) => {
            res.status(201).send(course);
        }).catch((error: Error) => {
            res.status(400).send(error);
        });
    }

    putCourse(req: Request, res: Response) {
        res.send("put");
    }

    deleteCourse(req: Request, res: Response) {
        if(!req.query.title) {
            res.status(400).send({
                error: 'A title must be procided',
            });
        } else {
            Course.findOneAndDelete({title: req.query.title.toString()}).then((course) => {
                if(!course) {
                    res.status(404).send();
                } else {
                    res.send(course);
                }
            }).catch(() => {
                res.status(400).send();
            })
        }
    }

    routes() {
        this.router.get('/courses', this.getCourses);
        this.router.post('/courses', this.postCourse);
        this.router.put('/courses', this.putCourse);
        this.router.delete('/courses', this.deleteCourse);
    }
}

const ingredientRoutes = new IngredientRoutes();
ingredientRoutes.routes();
export default ingredientRoutes.router;