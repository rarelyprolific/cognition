import { readFile } from 'fs/promises';
import fs from 'fs';

// Home-made, rustic single filer script!

// TODO: Add a CI workflow for verifying this "single-filer.js" build script.
// TODO: Inline the graphics!
// TODO: Tidy this up!

async function readTextFile(fileToRead) {
    try {
        const data = await readFile(fileToRead, 'utf8');
        //console.log('📄 File contents:\n', data);
        return data;
    } catch (err) {
        console.error('❌ Error reading file:', err);
    }
}

let sourceHtml = await readTextFile('dist/index.html');

let sourceHtmlArray = sourceHtml.split('\n');

let scriptLineNumber = 0;
let scriptFilename = "";

sourceHtmlArray.forEach((line, index) => {
    if (line.trimStart().startsWith("<script")) {
        scriptLineNumber = index

        let start = line.indexOf("src") + 5;
        let end = line.indexOf("></script") - 1;

        scriptFilename = line.substring(start, end)
    }
})

let script = await readTextFile("dist/" + scriptFilename);

sourceHtmlArray.splice(scriptLineNumber, 1);
sourceHtmlArray.splice(sourceHtmlArray.length - 2, 1, `<script>${script}</script>`);

//console.log(sourceHtmlArray.join('\n'));

fs.writeFile('dist/single-filetro.html', sourceHtmlArray.join('\n'), (err) => {
    if (err) {
        console.error('❌ Error writing file:', err);
    } else {
        console.log('✅ File written successfully!');
    }
});
