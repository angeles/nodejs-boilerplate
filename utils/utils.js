//TODO: fix bug
module.exports.invalidStrName = (name, end) => {
  end(false);
  
    if(name == undefined || name == '') {
      console.log("true invalidStrName "+name);
      end(true);
    } 
    else {
        var format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
        if(format.text(name)) {
          console.log("true invalidStrName "+name);
          end(true);
        }
        else {
          console.log("false invalidStrName "+name);
          end(false);
        }
    }
};
