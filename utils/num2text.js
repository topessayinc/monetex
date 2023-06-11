const generateApiKey = require("generate-api-key").default;

function fix_arr(arr, max_val){
    let ret=[];
    let carry=0;
    for(let i of arr){
        let v=i+carry;
        if(v>=max_val){
            carry=parseInt(v/max_val);
            v=v%max_val;
        }else{
            carry=0;
        }
        ret.push(v);
    }
    if(carry>0){
        ret.push(carry);
        return fix_arr(ret, max_val);
    }
    return ret;
}
function arrToString(arr){
    let str='b98dtpsiv0JMSxB3N4HfYK1mEXhFZ2zPyjUAOnIWD5aRGrgLowecVCk7Qu6qlT';
    arr=fix_arr(arr, 62);
    let ret='';
    for(let i of arr){
        ret+=str[i];
    }
    return ret;
}

function toArr(str){
    let ref="yNZf8ObB5v4lAcikGIpudRj9g3E2TrWq1htoDCsHan06SVJeQwzMPFmxKUY7XL";
    return str.split('').map(d=> ref.indexOf(d));
}

function idGen(str){
    if(typeof(str)=='string'){
        str=toArr(str);
    }else if(typeof(str)=='number'){
        str=[str];
    }
    
    str[0]++;
    str=fix_arr(str, 62);
    return arrToString(str);
}

function generateKey(prefix){
    if(!prefix){
        prefix ="";
    }
    let str=generateApiKey({method: 'base62', prefix, length: 12});
    return idGen(str);
}

module.exports = {idGen, generateKey};