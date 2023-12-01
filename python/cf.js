const { PythonShell } = require("python-shell");

const options = {
    pythonPath: 'python'
  };

exports.pythonCf = () => {
    PythonShell.run("./python/cf.py", options, function(err) {
        if (err) throw err;
        console.log('finished cf');
    });
}