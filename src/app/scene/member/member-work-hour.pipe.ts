import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'memberWorkHour'
})
export class MemberWorkHourPipe implements PipeTransform {

  transform(value: Array<any>, ...args: unknown[]): any {
    return   value.sort( (a,b)=>{
    
         if( a.teamName < b.teamName)
          return -1
          else if( a.teamName >  b.teamName)
          return 1
          else 
          return -1

 
     
   })
  
  }
  

}
