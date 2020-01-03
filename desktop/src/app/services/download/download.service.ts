import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DownloadService {

  constructor() { }

  triggerDownload(url: string, modelid: string, userid: string) {
    let aTag: any = document.createElement('a')
    let body = document.body
    aTag.href = url
    aTag.onload = () => body.removeChild(aTag)
    aTag.onerror = () => body.removeChild(aTag)
    body.append(aTag)
    aTag.click()

  }

}
