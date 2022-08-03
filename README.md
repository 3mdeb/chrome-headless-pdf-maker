# Headless Chrome PDF Maker

## Usage:

> Note: this server requires the HTML to be provided by a server, it doesn't 
work on bare .html files. The easiest way to do that is to host a local server 
by running `python3 -m http.server 8000`.

> Then, provide the script with a URL to the file, e.g. `http://127.0.0.1:8000/my-file.html`.

```
node chrome-headless-pdf-maker --url url/to/html --pdf path/for/output/pdf
Options:
  -u, --url      URL to html file                            [string] [required]
  -p, --pdf      path to output pdf                          [string] [required]
  -f, --format   All the valid paper format types when printing a PDF, a full
                 list of them at
                 https://pptr.dev/api/puppeteer.lowercasepaperformat/
                                                        [string] [default: "a4"]
      --version  Show version number                                   [boolean]
      --help     Show help                                             [boolean]

Flags:
(Can also be executed with --no-[flag] prefix to set the flag to false)

      --display-header-footer  Whether to show the header and footer
                                                      [boolean] [default: false]
      --omit-background        Hides default white background and allows
                               generating pdfs with transparency
                                                      [boolean] [default: false]
      --landscape              Whether to print in landscape orientation
                                                      [boolean] [default: false]
      --prefer-css-page-size   Give any CSS @page size declared in the page
                               priority over what is declared in the width or
                               height or format option [boolean] [default: true]
      --print-background       Set to true to print background graphics
                                                       [boolean] [default: true]

```

## Requirements

- Node.js >= 14.10