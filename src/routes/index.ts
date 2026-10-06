import { Router, type Request, type Response, type NextFunction } from 'express';

const router: Router = Router();

router.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.json({ title: 'Express API' });
});

export default router;
