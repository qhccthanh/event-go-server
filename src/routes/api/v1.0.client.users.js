var express = require('express');
var router = express.Router();

// User Event
var userEventController = require("../../controllers/api/Users/UserEventController");
router.route('/events')
    .get(userEventController.getAll)
    .post(userEventController.joinEvent);

router.route('/events/:user_event_id')
    .post(userEventController.completeEvent)
    .delete(userEventController.outEvent);

    // User Task
var userTaskController = require("../../controllers/api/Users/UserTaskController");
router.route('/events/:user_event_id/tasks')
    .post(userTaskController.joinTask);

router.route('/events/:user_event_id/tasks/:user_task_id')
    .delete(userTaskController.outTask)
    .post(userTaskController.completeTask);

// UserAward
var userAwardController = require("../../controllers/api/Users/UserAwardController");
router.route('/awards')
    .get(userAwardController.getAll)
    .post(userAwardController.post);
router.route('/awards/:user_award_id')
    .get(userAwardController.get)
    .put(userAwardController.put)
    .delete(userAwardController.delete);

// UserNotification
var userNotificationController = require("../../controllers/api/Users/UserNotification");
router.route('/notifications')
    .get(userNotificationController.getAll)
    .post(userNotificationController.post);
router.route('/notifications/:user_notification_id')
    .get(userNotificationController.get)
    .put(userNotificationController.put)
    .delete(userNotificationController.delete);

module.exports = router;