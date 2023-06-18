// export class

import { Router } from 'express';
import { TeamController } from '../controller/teamController';
// import { sessionAuthValidator } from '../middleware/authValidator';
import { teamBodyValidator } from '../utils/req-validators/team';
const teamController = new TeamController();
const teamRoutes = Router();
//Lets add middleware to protect routes
teamRoutes.post('/', teamBodyValidator, teamController.createNewTeam);
teamRoutes.get('/', teamController.getTeams);
teamRoutes.put('/:teamId', teamBodyValidator, teamController.updateTeam);

export default teamRoutes;
