const commandLineArgs = require('command-line-args')
const fs = require('fs');
const tableApiGenerator = require('./table-api-generator');

//MAIN EXECUTION
console.log('RUNNING TABLE-API-GENERATOR ...');
console.log('Usage: npm generate -- --descriptor={path_to_table_descriptor_path}');

const optionDefinitions = [{name: 'descriptor', type: String}];
const options = commandLineArgs(optionDefinitions);
const tableDescriptorPath = options.descriptor;

//READ DESCRIPTOR
const tableDescriptor = JSON.parse(fs.readFileSync(tableDescriptorPath, 'utf8')); //TODO: read descriptor from console
const res = tableApiGenerator.generateTableApi(tableDescriptor);

console.log(res);
