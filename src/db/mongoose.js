const mongoose = require('mongoose')


mongoose.connect('mongodb://127.0.0.1/task-manager-api', {useNewUrlParser: true, useUnifiedTopology: true }).
catch(error=> console.log("unable to connect to mongo database"))
