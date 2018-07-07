(function () {

//REQUIRES
	const _ = require('lodash');
	const fs = require('fs');

	module.exports.generateTableApi = function(tableDescriptor) {
//GENERATE FIELD TEMPLATES
		var generatedCode = '';
		for (var i = 0; i < tableDescriptor['fields'].length; i++) {
			var fieldDescriptor = tableDescriptor['fields'][i];
			var templateData = {
				fieldName: fieldDescriptor['field'],
				nameInFunction: _.upperFirst(_.camelCase(fieldDescriptor['field'].replace(/^u_/, '')))
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

		return res;
	}

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

		if (SUPPORTED_TEMPLATES.indexOf(fieldType) > -1) {
			templateSrc = './templates/' + fieldType + 'Function.tpl';
		} else if (fieldType == 'base') {
			templateSrc = './templates/baseTemplate.tpl';
		}

		return templateSrc;

	}

}());