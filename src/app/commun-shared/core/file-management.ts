import { HttpErrorResponse, HttpEvent, HttpEventType } from "@angular/common/http";
import { saveAs } from 'file-saver-es';

const fileStatus = { status: '', requestType: '', percent: 0 };

export function onDownloadFile(filename: string): void {
    this.taskService.download(filename).subscribe(
      event => {
        this.resportProgress(event);

      },
      (error: HttpErrorResponse) => {
      }
    );
  }

function resportProgress(httpEvent: HttpEvent<string[] | Blob>): void {
    switch(httpEvent.type) {
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
                  {type: `${httpEvent.headers.get('Content-Type')};charset=utf-8`}));
         
        }
        this.fileStatus.status = 'done';
        break;
        default:
          break;
      
    }
  }
 function updateStatus(loaded: number, total: number, requestType: string): void {

    this.fileStatus.status = 'progress';
    this.fileStatus.requestType = requestType;
    this.fileStatus.percent = Math.round(100 * loaded / total);
  }