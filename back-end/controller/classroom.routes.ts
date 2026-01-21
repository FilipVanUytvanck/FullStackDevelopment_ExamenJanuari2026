/**
 * @swagger
 *   components:
 *    schemas:
 *      Classroom:
 *          type: object
 *          properties:
 *            id:
 *              type: number
 *              format: int64
 *            name:
 *              type: string
 *              description: Classroom name.
 */
import express, {NextFunction, Request, Response} from "express";
import classroomService from '../service/classroom.service';


const classroomRouter = express.Router();

/**
 * @swagger
 * /classrooms:
 *   post:
 *     summary: Create new classroom
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 description: Classroom name
 *     responses:
 *       201:
 *         description: The created classroom
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Classroom'
 *       400:
 *         description: Bad request (duplicate name or validation error)
 *       401:
 *         description: Unauthorized
 */
classroomRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.auth || req.auth.role !== 'admin') {
            return res.status(403).json({errorMessage: 'Only admins can create classrooms'});
        }

        const {name} = req.body;

        if (!name || !name.trim()) {
            return res.status(400).json({errorMessage: 'Name is required'});
        }

        const classroom = await classroomService.createClassroom({name});
        res.status(201).json(classroom);
    } catch
        (error) {
        if (error.message === 'Classroom with this name already exists') {
            res.status(400).json({errorMessage: error.message});
        } else {
            next(error);
        }
    }
});

classroomRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.status(200).json();
    } catch (error) {
        next(error);
    }
});

export { classroomRouter };