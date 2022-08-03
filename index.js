#!/usr/bin/env node

const updateNotifier = require('update-notifier');
let pkg;
try {
    pkg = require('./package.json');
} catch (e) {
    pkg = require('./package.json');
}

updateNotifier({pkg}).notify();

const puppeteer = require('puppeteer');


// Handle program arguments with yargs
const argv = require('yargs')(process.argv.slice(2))

    // Parameters with input arguments
    .option('url', {
        alias: 'u',
        type: 'string',
        description: 'URL to html file'
    })
    .option('pdf', {
        alias: 'p',
        type: 'string',
        description: 'path to output pdf'
    })
    .option('format', {
        alias: 'f',
        type: 'string',
        default: 'a4',
        description: 'All the valid paper format types when printing a PDF, a full list of them at https://pptr.dev/api/puppeteer.lowercasepaperformat/'
    })

    // Flags
    .boolean('display-header-footer')
    .describe('display-header-footer', 'Whether to show the header and footer')
    .default('display-header-footer', false)

    .boolean('omit-background')
    .describe('omit-background', 'Hides default white background and allows generating pdfs with transparency')
    .default('omit-background', false)
    
    .boolean('landscape')
    .describe('landscape', 'Whether to print in landscape orientation')
    .default('landscape', false)
    
    .boolean('prefer-css-page-size')
    .describe('prefer-css-page-size', 'Give any CSS @page size declared in the page priority over what is declared in the width or height or format option')
    .default('prefer-css-page-size', true)
    
    .boolean('print-background')
    .describe('print-background', 'Set to true to print background graphics')
    .default('print-background', true)
    
    .group(['url', 'pdf', 'format'], 'Options:')
    .group(['display-header-footer', 'omit-background', 'landscape', 'prefer-css-page-size', 'print-background'], 'Flags:\n(Can also be executed with --no-[flag] prefix to set the flag to false)\n')

    .demandOption('url', 'Please enter the URL to an HTML file')
    .demandOption('pdf', 'Please specify the output pdf name or path')
    .help().argv;


class RenderPDF {

    static async renderPDF() {
        const launchParams = {
            headless: true,
            slowMo: 0 // TODO remove debug stuff
        };

        const browser = await puppeteer.launch(launchParams);
        const page = await browser.newPage();
        await page.setUserAgent("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.121 Safari/537.36");
        await page.goto(argv.url, {
        waitUntil: 'networkidle2',
        });
        
        await page.emulateMediaType("print");

        await page.evaluateHandle('document.fonts.ready'); // wait for all fonts to load

        await page.pdf({
            path: argv.pdf,
            format: argv.format,
            displayHeaderFooter: argv.displayHeaderFooter,
            landscape: argv.landscape,
            preferCSSPageSize: argv.preferCssPageSize,
            printBackground: argv.printBackground,
            omitBackground: argv.omitBackground
        });

        await browser.close();
    }
}

(async () => {
    await RenderPDF.renderPDF();
})();
