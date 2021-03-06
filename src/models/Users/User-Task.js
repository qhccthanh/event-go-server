var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    autoIncrement = require('mongoose-auto-increment');

var userTaskSchema = new Schema({
  task_id: {
    type: Schema.Types.ObjectId,
    ref: 'task'
  },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  event_id: {
    type: Schema.Types.ObjectId,
    ref: 'event'
  },
  user_event_id: {
    type: Schema.Types.ObjectId,
    ref: "user-event"
  },
  start_time: {
    type: Date,
    default: new Date()
  },
  end_time: Date,
  status: {
    type: String,
    enum: ['doing', 'expired','failure','completed','quited'],
    default: 'doing'
  },
  result: Object
});

var userTaskModel = mongoose.model('user-task',userTaskSchema);
module.exports =  userTaskModel;
