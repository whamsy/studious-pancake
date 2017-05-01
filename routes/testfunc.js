/**
 * Created by whamsy on 5/1/17.
 */

module.exports.logged = function(){

    var x = 'OLA';

    this.test1 = function (y) {

        console.log('logged',y,x);

    };

    this.authzed = function(sessionSet){

        if(sessionSet){
            console.log('authorized');
            console.log(x);
        }

    }
}

