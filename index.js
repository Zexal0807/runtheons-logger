const fs = require('fs');
const util = require('util');

module.exports = new class logger{
	
	sql(sql, err, result, fields){
		var path = 'log/sql/' + new Date().toISOString().slice(0,10) + '.txt',
		time = new Date().toTimeString().slice(0,8);
		fs.open(path, 'a', function(e, file) {
			if (e)
				throw e;
			
			var str = util.inspect(result);
			str = str.replace(/\n/g, "\n\t");
			str = '[' + time + '] : ' + sql + '\nResult:\n\t'+str+'\n\r';
			fs.write(file, str, function(e) {
				if (e)
					throw err;
				fs.close(file, function(){
					
				});
			});
		});
	}
	
};