function timer(time){
 const start = Date.now();

 //    console.log("starting timer...");
 // Expected output: "starting timer..."

 setTimeout(() => {
   const millis = Date.now() - start;

   console.log(`seconds elapsed = ${Math.floor(millis / 1000)}`);
   // Expected output: "seconds elapsed = 2"
 }, time);
}
function test (){
    for(let i=0;i<3;i++){
         timer(parseInt(i + `000`));
    }
}

module.exports = { test };