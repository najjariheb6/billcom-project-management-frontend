import { Component, Inject, Input, OnInit, ChangeDetectorRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProjectService } from 'src/app/rest-service/project.service';
import { NotficationService } from 'src/app/shared/service/notfication.service';
import * as moment from 'moment';

@Component({
    selector: 'app-update-project',
    templateUrl: './update-project.component.html',
    styleUrls: ['./update-project.component.scss']
})
export class UpdateProjectComponent implements OnInit {
    hostPhoto = 'http://localhost:8080/photoUser/';
    @Input() titleUpdate = 'Update Project';

    constructor(
        public dialogRef: MatDialogRef<UpdateProjectComponent>,
        @Inject(MAT_DIALOG_DATA) public data,
        private notificationService: NotficationService,
        private projectService: ProjectService,
        private cdr: ChangeDetectorRef
    ) {}

    ngOnInit(): void {
        this.formatDates();
        this.cdr.detectChanges(); // Manually trigger change detection
    }

    formatDates(): void {
        this.data.startedDate = this.formatDate(this.data.startedDate);
        this.data.endDate = this.formatDate(this.data.endDate);
    }

    formatDate(d: string | Date): string {
        if (!d) {
            return '';
        }
        const date = new Date(d);
        if (isNaN(date.getTime())) {
            return 'Invalid date';
        }
        return moment(date).format('DD MMMM, YY h:mm a');
    }

    onSubmit = () => {
        const currentDate = new Date();

        if (new Date(this.data.startedDate).getTime() < currentDate.getTime()) {
            this.notificationService.showInfo('Started Date should be after current date', 'Attention!');
            return;
        }

        if (new Date(this.data.startedDate).getTime() > new Date(this.data.endDate).getTime()) {
            this.notificationService.showInfo('End date should be after started date', 'Attention!');
            return;
        }

        this.projectService.updateProject(this.data).subscribe(
            () => {
                this.dialogRef.close();
            },
            (err) => {
                console.log(err);
            }
        );
    };

    close = () => {
        this.dialogRef.close();
    };
}
