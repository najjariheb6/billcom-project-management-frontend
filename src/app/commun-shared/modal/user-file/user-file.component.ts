import { HttpErrorResponse, HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { EmployeeServiceService } from 'src/app/rest-service/employee-service.service';
import { saveAs } from 'file-saver-es';
import { Employee } from 'src/app/model/employee';

@Component({
  selector: 'app-user-file',
  templateUrl: './user-file.component.html',
  styleUrls: ['./user-file.component.scss']
})
export class UserFileComponent implements OnInit {


  @Input()
  LoggedEmployee: Employee;

  filenames: string[] = [];
  fileStatus = { status: '', requestType: '', percent: 0 };
  fileVisible: boolean = true;
  constructor(public employeeService: EmployeeServiceService) { }

  ngOnInit(): void {
  }


  onUploadFiles(files: File[]): void {
    const formData = new FormData();
    for (const file of files) { formData.append('files', file, file.name); }

    this.employeeService.upload(this.LoggedEmployee.user_id, formData).subscribe(
      event => {
        this.resportProgress(event);
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }

  // define a function to download files

  onDownloadFile(filename: string): void {
    this.employeeService
      .download(filename)
      .subscribe(blob => saveAs(blob, filename));
  }
  private resportProgress(httpEvent: HttpEvent<string[] | Blob>): void {
    switch (httpEvent.type) {
      case HttpEventType.UploadProgress:
        this.updateStatus(httpEvent.loaded, httpEvent.total!, 'Uploading... ');

        break;
      case HttpEventType.DownloadProgress:
        this.updateStatus(httpEvent.loaded, httpEvent.total!, 'Downloading... ');
        break;
      case HttpEventType.ResponseHeader:
        break;
      case HttpEventType.Response:
        if (httpEvent.body instanceof Array) {
          this.fileStatus.status = 'done';
          for (const filename of httpEvent.body) {
            this.filenames.unshift(filename);
          }
        } else {
          saveAs(new File([httpEvent.body!], httpEvent.headers.get('File-Name')!,
            { type: `${httpEvent.headers.get('Content-Type')};charset=utf-8` }));
          // saveAs(new Blob([httpEvent.body!], 
          //   { type: `${httpEvnt.headers.get('Content-Type')};charset=utf-8`}),
          //    httpEvent.headers.get('Fiele-Name'));
        }
        this.fileStatus.status = 'done';
        break;
      default:
        break;

    }
  }
  private updateStatus(loaded: number, total: number, requestType: string): void {
    this.fileStatus.status = 'progress';
    this.fileStatus.requestType = requestType;
    this.fileStatus.percent = Math.round(100 * loaded / total);
  }

  showAadFile() {
    this.fileVisible = !this.fileVisible;
  }


}
