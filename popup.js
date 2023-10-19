window.onload = function () {

    // load functions to page js namespace
    document.getElementById("loadFunctions").onclick = function () {
        chrome.tabs.executeScript({ file: "content.js" });
    };

    // start script
    document.getElementById('startButton').addEventListener('click', function () {
        chrome.tabs.executeScript({ code: 'startScript();' });
    });

    // stop scripts
    document.getElementById('stopButton').addEventListener('click', function () {
        chrome.tabs.executeScript({ code: 'stopScript();' });
    });

};