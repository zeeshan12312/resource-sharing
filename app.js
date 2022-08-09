const express = require('express');
const bp = require('body-parser');
const router = require('./routes');
const error = require('./middleware/error');

const app = express();

//Body Parser
app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));

app.use('/api/v1/', router);
app.use(error.get500);
app.use(error.get404);
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server Listen at:${port}`);
});
