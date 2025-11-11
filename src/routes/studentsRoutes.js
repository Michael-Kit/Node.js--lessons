import { Router } from 'express';
import {
  createStudent,
  deleteStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
} from '../controllers/studentsController.js';

const router = Router();

router.get('/students', getAllStudents);
router.get('/students/:studentId', getStudentById);
router.post('/students', createStudent);
router.delete('/students/:studentId', deleteStudent);
router.patch('/students/:studentId', updateStudent);

export default router;
