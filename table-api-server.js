const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const tableApiGenerator = require('./table-api-generator');

//APP SETTINGS
app.use(bodyParser.urlencoded({extended: true})); //app.use( bodyParser.json() );

app.get('/', function (req, res) {
	res.send(generateHtmlPage(exampleTableDescriptor(), ""));
});

app.post('/', function (req, res) {
	const tableDescriptor = req.body['table-descriptor'];
	const generatedCode = tableApiGenerator.generateTableApi(JSON.parse(tableDescriptor));
	res.send(generateHtmlPage(tableDescriptor, generatedCode));
});

app.listen(8081, function () {});

//HTML FUNCTIONS

function generateHtmlPage(tableDescriptor, generatedCode) {
	tableDescriptor = tableDescriptor || "";
	generatedCode = generatedCode ||"";

	return'<html>' +
		'<body>' +
			'<form method="POST">' +
				'<div>' +
					'<textarea rows="25" cols="40" name="table-descriptor">'+tableDescriptor+'</textarea>' +
					'<textarea rows="25" cols="40" name="generated-code">'+ generatedCode +'</textarea>' +
				'</div>' +
				'<div>' +
					'<input type="submit" value="Generate">' +
				'</div>' +
		'</form>' +
		'</body>' +
	'</html>';
}

function exampleTableDescriptor() {
	return '{\n' +
		'  "tableName": "u_bcg_vct_mapping",\n' +
		'  "className": "Mapping",\n' +
		'  "fields": [\n' +
		'    {\n' +
		'      "field": "u_catalog_item",\n' +
		'      "type": "default"\n' +
		'    },\n' +
		'    {\n' +
		'      "field": "u_region",\n' +
		'      "type": "default"\n' +
		'    },\n' +
		'    {\n' +
		'      "field": "u_portal",\n' +
		'      "type": "default"\n' +
		'    }\n' +
		'  ]\n' +
		'}';
}
