function test () {
  const a = Math.random();
  const b =Math.random();
  const c= test1(a,b);
  console.log(c);
  
}

function test1(a,b) {
  if(a > b) {
    a+=a*2;

  }else{
    b-=a ;
  }

  return a + b 
}
test()