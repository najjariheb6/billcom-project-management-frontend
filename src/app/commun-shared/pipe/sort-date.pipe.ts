import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'sortDate'
})
export class SortDatePipe implements PipeTransform {
    transform(value: Array<any>, ...args: unknown[]): any {
        return value.sort((a, b) => {
            const creationDate1 = new Date(a.createdAt);
            const creationDate2 = new Date(b.createdAt);
            if (creationDate1 === creationDate2) {
                return 0;
            } else if (creationDate1 > creationDate2) {
                return -1;
            } else if (creationDate1 < creationDate2) {
                return 1;
            } else {
                return -1;
            }
        });
    }
}
