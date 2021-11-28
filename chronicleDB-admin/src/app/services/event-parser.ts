import { ChronicleEventElement } from './../model/ChronicleEvent';
import { EventElementSingleOrList, EventElementSubtype, EventElementType } from '../model/ChronicleEvent';


export class eventParser{
    

static parseResponseEvent(string:string):Array<ChronicleEventElement>{
    //find out where event line is
    let eventLayoutPosition=string.indexOf("Event layout:") +13;
    let lightweightIndexPosition = string.indexOf("[Lightweight Index]");
    let allEvents= new Array<ChronicleEventElement>();

    //save event string into variable res
    let res=string.slice(eventLayoutPosition,lightweightIndexPosition);

    //determine if single, varcompound or compound
    if(res.includes("VarCompound")){
      res = res.slice(14,-6);
    }
    if(res.includes("Compound")&& !res.includes("VarCompound")){
      res = res.slice(11,-6)
    }
    const regex = /(\w*\(.+?\))/gmi;
    let temp = res.match(regex);

    //start parsing the individual event chunks
  for(let element of temp as any){
    allEvents.push(this.parseEvent(element))
    }

   // return string.slice(eventLayoutPosition,lightweightIndexPosition)
    return allEvents;
}

 static  parseEvent(singleEvent:string):ChronicleEventElement{
    let singleOrList!: EventElementSingleOrList;
    let type!: EventElementType;
    let subtype!: EventElementSubtype;
    let size !: number; 

    const regex = new RegExp(/[IFU]\d{1,2}\(\d*\)|VarString\(.*?\)|ConstString\(.*?\)/gmi);
    let singleRegEx =/[IFU]\d{1,2}\(\d*\)|VarString\(.*?\)|ConstString\(.*?\)/gmi ;
   
    if(regex.test(singleEvent)){
      //set type
      singleOrList=EventElementSingleOrList.single;
      let tmp=singleEvent.split(/[\(\)]/)
      //regExp to test if tmp[0] is I or F or U 
      const typeRegex = new RegExp(/[F|I|U]\d*/g);
      if(typeRegex.test(tmp[0])){

        let singleChar= tmp[0].match(/[F|I|U]|\d{2}|\d/g)
          switch(singleChar![0]){
            case "I":type=EventElementType.integer ,size=parseInt(tmp[1]);break;
            case "U":type=EventElementType.unsigned ,size=parseInt(tmp[1]);break;
            case "F":type=EventElementType.float,size=parseFloat(tmp[1]) ;break;
          }
        
          switch(singleChar![1]){
            case"8":subtype=EventElementSubtype.eight;break;
            case"16":subtype=EventElementSubtype.sixteen;break;
            case"32":subtype=EventElementSubtype.thirtytwo;break;
            case"64":subtype=EventElementSubtype.sixtyfour;break;
          }
          

      }else{
        type =EventElementType.string
        if(tmp[0]=="ConstString"){
          subtype=EventElementSubtype.constString;
        }
        if(tmp[0]=="VarString"){  
          subtype=EventElementSubtype.varString;      
        }
        size=tmp[1].length;
      }
      // else is a List  (const or varList)
    }else{
        //divide is in 2 parts to parse size and the other attributes
        let leftPart = singleEvent.split("(")[0];
        let rightPart=singleEvent.split("(")[1];
        let subtypes = leftPart.match(/[IFU]\d+/g)!
        if(leftPart.includes("Var")){
            singleOrList=EventElementSingleOrList.varList;
        }
        if(leftPart.includes("Const")){
            singleOrList=EventElementSingleOrList.constList;
        }
        
        
        let singleChar= subtypes[0].match(/[F|I|U]|\d+/g)
          switch(singleChar![0]){
            case "I":type=EventElementType.integer ;break;
            case "U":type=EventElementType.unsigned;break;
            case "F":type=EventElementType.float;break;
          }
        
          switch(singleChar![1]){
            case"8":subtype=EventElementSubtype.eight;break;
            case"16":subtype=EventElementSubtype.sixteen;break;
            case"32":subtype=EventElementSubtype.thirtytwo;break;
            case"64":subtype=EventElementSubtype.sixtyfour;break;
          }
          //clean everything besides the digits and put in in an array, then return the size
        size = rightPart.match(/\d+/g)?.length!
       

    }

    const event: ChronicleEventElement = {singleOrList:singleOrList,type:type,subtype:subtype,size:size};
    return event;



  }

}