import { Router } from 'express';
import {
  getTicketsQueryValidator,
  validateTicketRequestBody,
  validateTicketRequestBodyForUpdate,
} from '../utils/req-validators/ticket';
import { TickerController } from '../controller/ticketController';
import { ActivityController } from '../controller/activityController';
import { activityRequestBodyValidator } from '../utils/req-validators/activity';
const ticket = new TickerController();
const activity = new ActivityController();
const ticketRoutes = Router();
//Create a new ticket
ticketRoutes.post('/', validateTicketRequestBody, ticket.createNewTicket);
//Get list of tickets
ticketRoutes.get('/', getTicketsQueryValidator, ticket.getTickets);
//Get details  of  single ticket/Bug
ticketRoutes.get('/:ticketId', () => {});
//Update a single template
ticketRoutes.put(
  '/:ticketId',
  validateTicketRequestBodyForUpdate,
  ticket.handleTicketUpdate,
);
//This end point will be used to move ticket into trash
ticketRoutes.patch('/:ticketId/trash', ticket.handleMoveToTrash);
//delete a single ticket
ticketRoutes.delete('/:ticketId', () => {});
//Post a activity on ticket
ticketRoutes.post(
  '/:ticketId/activity',
  activityRequestBodyValidator,
  activity.postNewActivity,
);
ticketRoutes.get('/:ticketId/activity', activity.getActivities);
//delete a activity on ticket
ticketRoutes.delete(
  '/:ticketId/activity/:activityId',
  activity.deleteActivityPost,
);
export default ticketRoutes;
