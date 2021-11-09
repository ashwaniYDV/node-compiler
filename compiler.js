var spawn = require('child_process').spawn;
var path = require('path');
 
// compile the given c source file and execute it.
exports.clang = function (srcfile) {
    // if srcfile = 'main.c'
    var filename = path.parse(srcfile).name; // main
    var extension = path.parse(srcfile).ext;  // .c
    if (extension === ".c") {
        var args_compile = []; // ['main.c', '-o','main.out']
        args_compile[0] = srcfile;
        args_compile[1] = '-o';
        args_compile[2] = filename + '.out';
        var cmd_run = './'+filename + '.out';
        this.execute('gcc', args_compile, cmd_run, []);
    } else {
        console.log(srcfile + " is not a c file.");
    }
}

// compile the given c++ source file and execute it.
exports.cpp = function (srcfile) {
    // if srcfile = 'main.cpp'
    var filename = path.parse(srcfile).name; // main
    var extension = path.parse(srcfile).ext;  // .cpp
    if (extension === ".cpp") {
        var args_compile = []; // ['main.cpp', '-o','main']
        args_compile[0] = srcfile;
        args_compile[1] = '-o';
        args_compile[2] = filename;
        var cmd_run = './'+filename;
        this.execute('g++', args_compile, cmd_run, []);
    } else {
        console.log(srcfile + " is not a cpp file.");
    }
}
 
// compile the given java source file and execute it.
exports.java = function (srcfile) {
    // if srcfile = 'main.java'
    var filename = path.parse(srcfile).name; // main
    var extension = path.parse(srcfile).ext;  // .java
    if (extension === ".java") {
        var args_compile = [];
        args_compile[0] = srcfile;
        var args_run = [];
        args_run[0] = filename;
        this.execute('javac', args_compile, 'java', args_run);
    } else {
        console.log(srcfile + " is not a java file.");
    }
}
 
// compile source file and execute it.
exports.execute = function (cmd_compile, args_compile, cmd_run, args_run) {
    // var compile = spawn('gcc', ['main.c', '-o','main.out']);
    // var compile = spawn('g++', ['main.c', '-o','main']);
    // var compile = spawn('javac', ['main.java']);
    var compile = spawn(cmd_compile, args_compile);
    compile.stdout.on('data', function (data) {
        console.log('stdout: ' + data);
    });
    compile.stderr.on('data', function (data) {
        console.log('stderr: ' + String(data));
    });
    compile.on('close', function (data) {
        if (data === 0) {
            var run = spawn(cmd_run, args_run);
            run.stdout.on('data', function (output) {
                console.log(String(output));
            });
            run.stderr.on('data', function (output) {
                console.log('stderr: ' + String(output));
            });
            run.on('close', function (output) {
                console.log('stdout: ' + output);
            })
        }
    });
};