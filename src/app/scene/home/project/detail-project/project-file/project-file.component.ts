import { HttpErrorResponse, HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ProjectList } from 'src/app/model/project';
import { ProjectService } from 'src/app/rest-service/project.service';
import { saveAs } from 'file-saver-es';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-project-file',
  templateUrl: './project-file.component.html',
  styleUrls: ['./project-file.component.scss']
})
export class ProjectFileComponent implements OnInit {
  @Input()
  projectDetail: ProjectList =null;
  filenames: string[] = [];
  fileStatus = { status: '', requestType: '', percent: 0 };
  fileVisible: boolean = true;
  constructor(private projectService: ProjectService) { }

  ngOnInit(): void {
  }


  onDownloadFile(filename: string): void {
    this.projectService
      .download(filename)
      .subscribe(blob => saveAs(blob, filename));
  }

  saveFile(data: any, filename?: string) {
    const blob = new Blob([data], {type: 'text/csv; charset=utf-8'});
    FileSaver.saveAs(blob, filename);
  }
  /**************Upload files************ */
  onUploadFiles(id: number ,files: File[]) {
    const formData = new FormData();
    for (const file of files) { formData.append('files', file, file.name); }

    this.projectService.upload(id,formData).subscribe(
      event => {
        this.resportProgress(event);
        this.fileVisible = !this.fileVisible

      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }
  showAadFile(){
    this.fileVisible = !this.fileVisible
  }
  private resportProgress(httpEvent: HttpEvent<string[] | Blob>): void {
    switch(httpEvent.type) {
      case HttpEventType.UploadProgress:
        this.updateStatus(httpEvent.loaded, httpEvent.total!, 'Uploading... ');

        break;
      case HttpEventType.DownloadProgress:
        this.updateStatus(httpEvent.loaded, httpEvent.total!, 'Downloading... ');
        break;
      case HttpEventType.ResponseHeader:
        console.log('Header returned', httpEvent);
        break;
      case HttpEventType.Response:
        if (httpEvent.body instanceof Array) {
          this.fileStatus.status = 'done';
          for (const filename of httpEvent.body) {
            this.filenames.unshift(filename);
          }
        } else {
          saveAs(new File([httpEvent.body!], httpEvent.headers.get('File-Name')!, 
                  {type: `${httpEvent.headers.get('Content-Type')};charset=utf-8`}));
          // saveAs(new Blob([httpEvent.body!], 
          //   { type: `${httpEvnt.headers.get('Content-Type')};charset=utf-8`}),
          //    httpEvent.headers.get('Fiele-Name'));
        }
        this.fileStatus.status = 'done';
        break;
        default:
          console.log(httpEvent);
          break;
      
    }
  }
  private updateStatus(loaded: number, total: number, requestType: string): void {
    this.fileStatus.status = 'progress';
    this.fileStatus.requestType = requestType;
    this.fileStatus.percent = Math.round(100 * loaded / total);
  }





}
