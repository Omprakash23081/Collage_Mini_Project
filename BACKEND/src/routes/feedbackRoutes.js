import { Router } from 'express';
import { createFeedback, deleteFeedback, getAllFeedback, getUserFeedbacks, replyToFeedback, markFeedbackRead } from '../controllers/feedbackController.js';
import { verifyJWT } from '../middleware/auth.middleware.js';

const router = Router();

router.use(verifyJWT); // Secure all feedback routes

router.route('/')
    .post(createFeedback)
    .get(getAllFeedback);

router.route('/my-feedback')
    .get(getUserFeedbacks);

router.route('/:id/reply')
    .patch(replyToFeedback);

router.route('/:id/read')
    .patch(markFeedbackRead);

router.route('/:id')
    .delete(deleteFeedback);

export default router;
