import { Injectable } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfirmService {

  constructor(
    private modalService: NzModalService
  ) { }

  delete (name) {
    return new Observable(s => {
      this.modalService.confirm({
        nzTitle: `确认要删除${name}吗?`,
        nzContent: "",
        nzOkText: "删除",
        nzOkType: "danger",
        nzOnOk: () => {
          s.next()
        },
        nzCancelText: "取消",
      })
    })
  }

}
