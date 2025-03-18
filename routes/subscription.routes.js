import { Router } from "express";

import authorize from "../middlewares/auth.middleware.js";
import { createSubscription, getAllSubscriptions, getSubscriptionDetails, getUserSubscriptions } from "../controllers/subscription.controller.js";

const subscriptionRouter = Router();

subscriptionRouter.get('/', getAllSubscriptions);

subscriptionRouter.get('/:id', authorize, getSubscriptionDetails);

subscriptionRouter.post('/', authorize, createSubscription);

subscriptionRouter.put('/:id', (req, res) => res.send('UPDATE subscription'));

subscriptionRouter.delete('/:id', (req, res) => res.send('DELETE subscription'));

subscriptionRouter.get('/user/:id', authorize, getUserSubscriptions);

subscriptionRouter.put('/:id/cancel', (req, res) => res.send('CANCEL subscription'));

subscriptionRouter.get('/upcoming-renewals', (req, res) => res.send('GET upcoming renewals'));

export default subscriptionRouter;