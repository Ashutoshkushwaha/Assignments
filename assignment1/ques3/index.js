function foreach(arr, callback1) {
    for(var i = 0; i <arr.length ; i++ ){
        console.log(callback1(arr[i]));
    }
}
function map(arr, callback1) {
    var arr2 = [];
    for(var i = 0; i <arr.length ; i++ ){
        arr2.push(callback1(arr[i]));
    }
    console.log(arr2);
}

function square(i) {
    return i*i;
}
foreach([1,2,3,4], square);
map([1,2,3,4], square);