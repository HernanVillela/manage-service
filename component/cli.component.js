import { Command } from 'commander';
const program = new Command();

program.name('quality-extractor').description('CLI de extracción de calidad en base a API').version('0.0.1-ts')
    .requiredOption('-t, --type <string>') // product - category
    .option('-r, --retail_id <number>')
    /*
    .requiredOption('-r, --run <string>')
    .option('-v, --variety_id <number>')
    .option('-i, --instances <number>')
    .option('-s --sku <string>')
    .option('-u --url <string>')
    .option('-p --pending_only')
    .option('-t --retail_id <number>')
    .option('-x --debug')*/
    ;

program.parse();
let cli = program.opts();

const cli_interface = cli;
export default cli_interface;
