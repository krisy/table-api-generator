//REQUIRES
const fs = require('fs');
const _ = require('lodash');
const commandLineArgs = require('command-line-args')

//MAIN EXECUTION
console.log('RUNNING TABLE-API-GENERATOR ...');
console.log('Usage: npm generate -- --descriptor={path_to_table_descriptor_path}');

const optionDefinitions = [{name: 'descriptor', type: String}];
const options = commandLineArgs(optionDefinitions);
const tableDescriptorPath = options.descriptor;

//READ DESCRIPTOR
const tableDescriptor = JSON.parse(fs.readFileSync(tableDescriptorPath, 'utf8')); //TODO: read descriptor from console

//GENERATE FIELD TEMPLATES
var generatedCode = '';
for (var i=0; i<tableDescriptor['fields'].length; i++) {
	var fieldDescriptor = tableDescriptor['fields'][i];
	var templateData = {
		fieldName: fieldDescriptor['field'],
		nameInFunction: _.upperFirst( _.camelCase(fieldDescriptor['field'].replace('u_', '')))
	};
	generatedCode += compileTemplate(findTemplate(fieldDescriptor['type']), templateData);
	generatedCode += '\n';
}

//GENERATE BASE TEMPLATE
const res = compileTemplate(findTemplate('base'), {
	className: tableDescriptor.className,
	tableName: tableDescriptor.tableName,
	generatedCode: generatedCode
});

console.log(res);


//UTILITY FUNCTIONS
function compileTemplate(templateSrc, data) {
	var templateStr = fs.readFileSync(templateSrc, 'utf8');
	var templateFn = _.template(templateStr);
	var compiled = templateFn(data);

	return compiled;
}

function findTemplate(fieldType) {
	//TODO: support additional field types; e.g. date, number, string, etc.
	var SUPPORTED_TEMPLATES = ['default'];
	var templateSrc;

	if (SUPPORTED_TEMPLATES.indexOf(fieldType) >-1) {
		templateSrc = './templates/'+fieldType+'Function.tpl';
	} else if (fieldType == 'base') {
		templateSrc = './templates/baseTemplate.tpl';
	}

	return templateSrc;

}
