#!/usr/bin/env node

import * as chalk from 'chalk';
import * as program from 'commander';
import * as figlet from 'figlet';

// Add a 'Zoomdata' Header to the console output
console.log(
  chalk.green(figlet.textSync('Zoomdata', { horizontalLayout: 'full' })),
);

program
  .version('1.0.0')
  .description('A CLI tool to manage Zoomdata Custom Charts')
  .command(
    'config',
    "Set-up an encrypted configuration of Zoomdata's server URL and admin credentials",
  )
  .command(
    'edit [chartname]',
    "Edit a custom chart's controls, components, libraries, name, and/or variables",
  )
  .command('ls', 'List custom visualizations')
  .command(
    'pull [chartname]',
    'Pull the latest version of a custom chart from the Zoomdata server',
  )
  .command('push', 'Push the current state of the chart to the Zoomdata server')
  .command(
    'watch',
    'Watch for changes in chart files and update them in the Zoomdata server',
  )
  .parse(process.argv);

// if program was called with no arguments, show help.
if (program.args.length === 0) {
  program.help();
}
