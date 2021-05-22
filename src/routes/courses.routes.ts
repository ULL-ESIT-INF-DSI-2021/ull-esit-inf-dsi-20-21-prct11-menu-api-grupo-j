import { Request, Response, Router } from 'express'
import Course from '../models/Course'

class CourseRoutes {
    router: Router;
    constructor() {
        this.router = Router();
        this.routes();
    }

    getCourses(req: Request, res: Response) {
        const filter = req.query.name ? { name: req.query.name.toString() } : {};

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
            if (!courses) {
                res.status(404).send();
            } else {
                res.send(courses);
            }
        }).catch(() => {
            res.status(500).send();
        });
    }

    postCourse(req: Request, res: Response) {
        const course = new Course(req.body);
        course.save().then((courses) => {
            res.status(201).send(courses);
        }).catch((error: Error) => {
            res.status(400).send(error);
        });
    }

    patchCourse(req: Request, res: Response) {
        if (!req.query.name) {
            res.status(400).send({
                error: 'A name must be provided',
            });
        } else {
            const allowedUpdates = ['name', 'courseType', 'ingredients', 'coursePrice', 'courseComposition'];
            const actualUpdates = Object.keys(req.body);
            const isValidUpdate =
                actualUpdates.every((update) => allowedUpdates.includes(update));

            if (!isValidUpdate) {
                res.status(400).send({
                    error: 'Update is not permitted',
                });
            } else {
                Course.findOneAndUpdate({ name: req.query.name.toString() }, req.body, {
                    new: true,
                    runValidators: true,
                }).then((course) => {
                    if (!course) {
                        res.status(404).send();
                    } else {
                        res.send(course);
                    }
                }).catch((error) => {
                    res.status(400).send(error);
                });
            }
        }
    }

    deleteCourse(req: Request, res: Response) {
        if (!req.query.name) {
            res.status(400).send({
                error: 'A name must be procided',
            });
        } else {
            Course.findOneAndDelete({ name: req.query.name.toString() }).then((course) => {
                if (!course) {
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
        this.router.get('/courses/:id', this.getCourseById);
        this.router.post('/courses', this.postCourse);
        this.router.patch('/courses', this.patchCourse);
        this.router.delete('/courses', this.deleteCourse);
    }
}

const courseRoutes = new CourseRoutes();
courseRoutes.routes();
export default courseRoutes.router;