const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const tableApiGenerator = require('./table-api-generator');

//APP SETTINGS
app.use(bodyParser.urlencoded({extended: true})); //app.use( bodyParser.json() );
app.use(express.static('public'));

app.post('/', function (req, res) {
	const tableDescriptor = req.body['table-descriptor'];
	const generatedCode = tableApiGenerator.generateTableApi(JSON.parse(tableDescriptor));
	res.send(generatedCode);
});

app.listen(8081, function () {});
