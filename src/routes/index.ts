import { Router } from 'express';
import authRoutes from './authRoutes';
import teamRoutes from './teamRoutes';
import { sessionAuthValidator } from '../middleware/authValidator';
import ticketRoutes from './ticketRoutes';

const V1Routes = Router();
V1Routes.use('/auth', authRoutes);
V1Routes.use('/teams', sessionAuthValidator, teamRoutes);
V1Routes.use('/tickets', sessionAuthValidator, ticketRoutes);
export default V1Routes;
