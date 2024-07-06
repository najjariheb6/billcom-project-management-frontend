import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortEmployee'
})
export class SortEmployeePipe implements PipeTransform {

  transform(value: Array<any>, ...args: unknown[]): any {
    return   value.sort( (a,b)=>{
     let firstname1= a.firstName.toLowerCase();
     let firstname2= b.firstName.toLowerCase();
         if (firstname1 == firstname2)
           return 0
          else if( firstname1 < firstname2)
          return -1
          else if( firstname1 > firstname2)
          return 1
          else 
          return -1
 
     
   })}
}
