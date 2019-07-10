'use strict';

const countProduceNum = (tags) =>{
    //implement here
    let produceNum ={};
    tags.forEach( tag =>{
        let barcode = tag.split('-')[0];
        let num = tag.split('-')[1];
        //const condition = (countTag) => countTag === barcode;
        if(!produceNum.hasOwnProperty(""+barcode)){
            if(num==null) {
                produceNum["" + barcode] = 1;
            }else{
                produceNum["" + barcode] = parseFloat(num);
            }
        }else{
            if(num==null) {
                produceNum["" + barcode] += 1;
            }else{
                produceNum["" + barcode] += parseFloat(num);
            }
        }
    })
    console.log(produceNum);
}
