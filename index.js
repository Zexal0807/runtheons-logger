const fs = require('fs');
const util = require('util');

module.exports = new class logger {

    sql(sql, result, user = undefined) {
        var path = 'log/sql/';
        if (user != undefined) {
            path += user + '/';

        }

        if (!fs.existsSync(path)) {
            fs.mkdirSync(path, { recursive: true });
        }
        path += new Date().toISOString().slice(0, 10) + '.txt';

        var time = new Date().toTimeString().slice(0, 8);
        fs.open(path, 'a', function(e, file) {
            if (e)
                throw e;

            var str = util.inspect(result);
            str = str.replace(/\n/g, "\n\t");
            str = '[' + time + '] : ' + sql + '\nResult:\n\t' + str + '\n\r';

            fs.write(file, str, function(er) {
                if (er)
                    throw er;
                fs.close(file, function() {});
            });
        });
    }

};