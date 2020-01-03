import { Injectable } from '@angular/core';
import { config } from '../../../config'

@Injectable({
  providedIn: 'root'
})
export class DownloadService {

  constructor() { }

  triggerDownload(modelid: string, userid: string) {

    const url = `${config.hosts.base}/api/model/downModel?userid=${userid}&modelid=${modelid}`
    let aTag: any = document.createElement('a')
    let body = document.body
    aTag.href = url
    aTag.onload = () => body.removeChild(aTag)
    aTag.onerror = () => body.removeChild(aTag)
    body.append(aTag)
    aTag.click()

  }

}
