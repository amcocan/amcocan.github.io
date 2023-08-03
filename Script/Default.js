// Default JS for Markdown Site...

// function readMarkdownFile(filename) { ... }
function readMarkdownFile(filename) {
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", filename, false);
    rawFile.onreadystatechange = function() {
        if(rawFile.readyState === 4) {
            if(rawFile.status === 200 || rawFile.status == 0) {
                var markdown = rawFile.responseText;
                var html = marked(markdown);
                document.getElementById("mkdown").innerHTML = html;
            }
        }
    }
    rawFile.send(null);
}

// Call the function with the file name
readMarkdownFile("markdown.md");