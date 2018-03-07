const express = require('express')
const app = express()

const port = process.env.PORT || '8080';

app.use(express.static('build'));
app.get('*', (req, res) => {
  res.sendfile('./build/index.html');
})

app.listen(port, _ => console.log(`Server is listening on port ${port}`))
