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
   //console.log(produceNum);
    return produceNum
}

const getProduceMassage = (produceNum)=>{
    let allItem = loadAllItems();
    let produceList = [];
    let k=0;
    for(let i=0;i<allItem.length;i++){
        if(produceNum.hasOwnProperty(""+allItem[i].barcode)){
            let produce={
                barcode:allItem[i].barcode,
                name:allItem[i].name,
                unit:allItem[i].unit,
                price:allItem[i].price,
                count:produceNum[""+allItem[i].barcode]
            }
            produceList[k++] = produce;
        }
    }
    return produceList;
}

const getPosString = (produceList) => {
    let posString = "***<没钱赚商店>收据***\n";
    let totalSum=0;
    let free = 0;
    produceList.forEach( produce =>{
        posString += "名称："+produce.name+"，数量："+produce.count+produce.unit
            +"，单价："+produce.price.toFixed(2)+"(元)，小计：";
        let freeList = loadPromotions();
        if(freeList[0].barcodes.indexOf(produce.barcode)!=-1){
            let sum;
            if(produce.count>=2){
                sum =(produce.count-1)*produce.price;
                free += produce.price;
                posString+= sum.toFixed(2)+"(元)\n"

            }else{
                sum = produce.count*produce.price;
                posString+= sum.toFixed(2)+"(元)\n"
            }
            totalSum += sum;
        }else{
            let sum = produce.count*produce.price;
            posString+= sum.toFixed(2)+"(元)\n";
            totalSum += sum;
        }
    });
    posString +="----------------------\n总计："+totalSum.toFixed(2)+"(元)\n节省："+free.toFixed(2)+"(元)\n**********************";
    return posString;
}

const printReceipt = (tags)=>{
    let produceNum = countProduceNum(tags);
    let produceList = getProduceMassage(produceNum);
    let posString = getPosString(produceList);
    console.log(posString);
}