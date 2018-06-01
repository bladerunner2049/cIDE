var request = require('request');
var accessToken = '50d19d54472448e85088e790d97dbfb6';
var endpoint = 'd32fffd4.compilers.sphere-engine.com';
var SubmissionId = null;


function test() {
    event.preventDefault();
    // define access parameters
    var text1 = 'Connection problem...'
    var text2 = 'Connection established...'
    var text3 = 'Invalid access token...'

    // send request
    request({
        url: 'http://' + endpoint + '/api/v3/test?access_token=' + accessToken,
        method: 'GET'
    }, function (error, response, body) {
        if (error) {
            document.getElementById('output').innerHTML = text1;
        }

        // process response
        if (response) {
            if (response.statusCode === 200) {
                //var ans = toString(JSON.parse(response.body));
                //document.write(JSON.parse(response.body)); // test message in JSON
                document.getElementById('output').innerHTML = text2;
            } else {
                if (response.statusCode === 401) {
                    document.getElementById('output').innerHTML = text3;
                }
            }
        }
    });
}
/////Function pycom example
///////////////////////////
///////////////////////////
function pycom () {
    event.preventDefault();
    var select = document.getElementById('lang_selector');
    var selected_lang = select.options[select.selectedIndex].value;
    var responsetxt = null;
    var subtext = document.getElementById('codearea').innerText;
    var std_input = document.getElementById('input').value;
    // define request parameters
    var submissionData = {
        compilerId: selected_lang,
        source: subtext,
        input: std_input
    };

    // send request
    request({

        url: 'https://' + endpoint + '/api/v4/submissions?access_token=' + accessToken,
        method: 'POST',
        form: submissionData
    }, function (error, response, body) {

        if (error) {
            document.getElementById('output').innerHTML +='Connection problem' + '<br>';
        }

        // process response
        if (response) {
            if (response.statusCode === 201) {
                //document.getElementById('output').innerHTML = toString(JSON.parse(response.body)); // submission data in JSON
                //document.getElementById('output').innerHTML = 'Success';
                //document.getElementById('output').innerHTML = response.body;
                responsetxt = JSON.parse(response.body);
                SubmissionId = responsetxt.id;
                //getanswer(SubmissionId);
                document.getElementById('output').innerHTML +='Responce`s id is:' + SubmissionId + '<br>';
                //document.getElementById('output').innerHTML = document.getElementById('codearea');
            } else {
                if (response.statusCode === 401) {
                    document.getElementById('output').innerHTML +='Invalid access token' + '<br>';
                }
            }
        }
        return SubmissionId;
    });
    return SubmissionId;
}

/*
function getanswer(SubmissionId) {

    event.preventDefault();

// send request
    request({

        url: 'http://' + endpoint + '/api/v3/submissions/' + SubmissionId + '/input?access_token=' + accessToken,
        method: 'GET'
    }, function (error, response, body) {

        if (error) {
            document.getElementById('output').innerHTML ='Connection problem';
        }

        // process response
        if (response) {
            if (response.statusCode === 200) {
                var getresponce = toString(responce.body);
                document.getElementById('output').innerHTML = getresponce; // raw data from selected stream
            } else {
                if (response.statusCode === 401) {
                    document.getElementById('output').innerHTML ='Invalid access token';
                }
                if (response.statusCode === 403) {
                    document.getElementById('output').innerHTML ='Access denied';
                }
                if (response.statusCode === 404) {
                    document.getElementById('output').innerHTML ='Submission or stream not found';
                }
            }
        }
    });

}
*/
function getsub(){
    //var getsubdata = {
    //    withOutput: true
    //}
    //event.preventDefault();

    // send request
    request({

        url: 'http://' + endpoint + '/api/v4/submissions/' + SubmissionId + '?access_token=' + accessToken,
        method: 'GET',
        //form: getsubdata
    }, function (error, response, body) {

        if (error) {
            document.getElementById('output').innerHTML +='Connection problem' + '<br>';
        }

        // process response
        if (response) {
            if (response.statusCode === 200) {
                var getsubm = JSON.parse(response.body);
                //document.getElementById('output').innerHTML = 'Id is' + getsubm.id +'/n' + 'Output is:' + getsubm.output; // list of submissions in JSON
                var output = $.ajax({
                    url: getsubm.result.streams.output.uri,
                    async: false
                }).responseText;
                document.getElementById('output').innerHTML +='Output:' + output + '<br>';
            } else {
                if (response.statusCode === 401) {
                    document.getElementById('output').innerHTML +='Invalid access token' + '<br>';
                }
            }
        }
    });
}

function work () {
    pycom();
    setTimeout(getsub,5000);

}
/*
function open(){
    //var remote = require('remote');
    //var remote = require('electron').remote;
    //const {dialog} = require('electron').remote.dialog;
    //const {dialog} = require('electron').remote.require('dialog');
    //var dialog = remote.dialog;
    const {dialog} = require('electron').remote;

    //event.preventDefault();
    dialog.showOpenDialog(
        { 
            properties: [ 'openFile' ] 
        }, function ( filename ) 
        {
                console.log(filename.toString());
        }
    );
}
*/
var remote = require('electron').remote;

var dialog =remote.dialog;

var fs = require('fs');

    function openFile () {
        event.preventDefault();
        //event.stopImmediatePropagation();

        dialog.showOpenDialog({properties: [ 'openFile' ]} ,function (fileNames) {

            if (fileNames === undefined) return;

            var fileName = fileNames[0];


            fs.readFile(fileName, 'utf-8', function (err, data) {

                //document.getElementById("editor").innerText = data;
                start_editor();
                var editor = ace.edit("codearea");
                editor.setValue(data);
            });

        });

    }
    
    function saveFile() {
        event.preventDefault();
        dialog.showSaveDialog(function(fileName){
            if (fileName === undefined) return;
            fs.writeFile(fileName, document.getElementById("codearea").value, function (err) {   
            
            });

        });
    }

function start_editor(){
    var editor = ace.edit("codearea");
    editor.setTheme("ace/theme/twilight");
    editor.session.setMode("ace/mode/javascript");
}
/*
function new_file(){
    if(document.getElementById("codearea").value == ""){}
    else {
        event.preventDefault();
        dialog.showMessageBox({message: "Do you want to save current file?",buttons:["Yes","No","Cancel"]}){
            event.preventDefault();
        }
    }
}
*/