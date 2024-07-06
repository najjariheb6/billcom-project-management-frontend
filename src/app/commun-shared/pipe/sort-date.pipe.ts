import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortDate'
})
export class SortDatePipe implements PipeTransform {
  transform(value: Array<any>, ...args: unknown[]): any {
   return   value.sort( (a,b)=>{
    let cretaionDate1= new Date(a.createdAt);
    let cretaionDate2= new Date(b.createdAt);
        if (cretaionDate1 == cretaionDate2)
          return 0
         else if( cretaionDate1 > cretaionDate2)
         return -1
         else if( cretaionDate1 < cretaionDate2)
         return 1
         else 
         return -1

    
  })}

}