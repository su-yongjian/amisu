// function makeIterator (arr) {
//     let index = 0 ;

//     return {
//         next: () =>{
//             if(index < arr.length){
//                 return {
//                     value : arr[index++] ,done:false
//                 }
//             }else{
//                 return { done:true}
//             }
//         }
//     }

// }
// const it = makeIterator(['吃饭','睡觉','洗澡','上班']);

// console.log(it.next().value);
// console.log(it.next().value);
// console.log(it.next().value);
// console.log(it.next().value);
// console.log(it.next().value);
// 所谓迭代器是指每一次运行都能拿到一个结果

// 生成器
function *makeIterator (arr) {
    for(let i=0;i<arr.length;i++){
        yield arr[i]
    }
}

const gen = makeIterator(['吃饭','睡觉','洗澡','上班']);
console.log('首先',gen.next().value);
console.log('其次',gen.next().value);
console.log('然后',gen.next().value);'首先',
console.log('最后',gen.next().value);
console.log('结束',gen.next().value);
