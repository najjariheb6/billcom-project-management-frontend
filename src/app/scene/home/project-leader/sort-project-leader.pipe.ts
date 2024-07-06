import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortProjectLeader'
})
export class SortProjectLeaderPipe implements PipeTransform {

  transform(value: Array<any>, ...args: unknown[]): any {
    return   value.sort( (a,b)=>{
     let cretaionDate1= new Date(a.project.createdDate);
     let cretaionDate2= new Date(b.project.createdDate);
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
