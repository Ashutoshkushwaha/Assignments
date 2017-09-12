function callback() {
    console.log("we waited ...and now displaying ");

}
console.log(" starting the page")
function setTimeoutSync(callback, n) {
    var start = new Date();
    while((new Date() - start) <= n){ /*do nothing here */};
    callback();
}
setTimeoutSync(callback, 5000);