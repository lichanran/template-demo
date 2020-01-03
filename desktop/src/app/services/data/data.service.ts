import { Injectable } from '@angular/core'
import { Observable, of, forkJoin} from 'rxjs'
import { map } from 'rxjs/operators'
import { User } from '../../models'
import { HttpClient } from '@angular/common/http'
import { config } from '../../../config'
import { CarouselModelItem, Model ,Trade, Field } from '../../models'
import { tap, catchError } from 'rxjs/operators'
import { formatDate } from '../../../utils'

const base = config.hosts.base

/** 上下架的flag */
export enum ReleaseFlag {
    ONSHELF="0",
    OFFSHELF="1"
}

@Injectable({
    providedIn: 'root'
})
export class DataService {
    userId: string;
    constructor (
        private http: HttpClient,
    ) {
    }

    /** 登陆 */
    login(username, password): Observable<any> {
        return this.http.get<User>(base + '/login', {
            params: {
                username,
                password
            }
        }).pipe(
            tap(data => {
                console.log('data', data)
            }),
            catchError((err) => {
                console.log('err', err)
                return of({})
            })
        )
    }

    fetchModelsByTrade(tradename: string){
        return this.http.get<Model[]>(config.hosts.base + '/api/model/modelList',{params: {tradename}})
            .pipe(map(arr => arr.map(formatModelData)))
    }

    /** 查询走马灯数据 */
    fetchCarouselData (): Observable<any> {
        return this.http.get<CarouselModelItem []>(base + "")
    }
    
    //我的待上架区模型列表
    myuploading(userid) {
        // 接口不太合适，暂时先flat一下
        return this.http.get<Model [] []>(base + '/api/personal/myuploading',{params: {userid}})
            .pipe(
                map(arr => flat(arr)),
                map(arr => arr.map(formatModelData)),
                )
    }
    //我的已上架模型列表
    myuploaded(userid) {
        return this.http.get<Model [] []>(base + '/api/personal/myuploaded',{params: {userid}})
            .pipe(
                map(arr => flat(arr)),
                map(arr => arr.map(formatModelData)),
                )
    }
    //我的下载 模型列表
    mydown(userid){
        return this.http.get<Model[] []>(base + '/api/personal/mydown',{params: {userid}})
            .pipe(
                map(arr => flat(arr)),
                map(arr => arr.map(formatModelData)),
                )
    }
    //我的收藏 模型列表
    mycollection(userid){
        return  this.http.get<Model[] []>(base + '/api/personal/mycollection',{params: {userid}})
            .pipe(
                map(arr => flat(arr)),
                map(arr => arr.map(formatModelData)),
                )
    }

    //调用我的上传数
    myuploadcount(userid){
        return this.http.get<number>(base + '/api/personal/myuploadcount',{params: {userid}})
    }
    //调用被下载次数
    otherdowncount(userid){
        return this.http.get<number>(base + '/api/personal/otherdowncount',{params: {userid}})
    }
    //调用我的下载次数
    mydowncount(userid){
        return this.http.get<number>(base + '/api/personal/mydowncount',{params: {userid}})
    }
    //调用我的收藏次数
    mycollectioncount(userid){
        return this.http.get<number>(base + '/api/personal/mycollectioncount',{params: {userid}})
    }


    /** 管理 */
    // 所有待上架模型
    fetchAllPre() {
        return this.http.get<Model []>(base + '/api/modelmanage/grouding').pipe(map(arr => arr.map(formatModelData)))
    }
    // 所有已上架模型
    fetchAllUploaded() {
        return this.http.get<Model []>(base + '/api/modelmanage/grouded').pipe(map(arr => arr.map(formatModelData)))
    }
    // 所有下载模型
    fetchAllWithDrawn(){
        return this.http.get<Model []>(base + '/api/modelmanage/queryundercarriage').pipe(map(arr => arr.map(formatModelData)))
    }

    /** 模型操作 */


    /** 上下架 */
    toggleRelease (flag: ReleaseFlag ,modelid: string) {
        return this.http.get<any>(base + '/api/modelmanage/undercarriage', {params: {flag, modelid}})
    }

    /** 删除 */
    delete (modelid: string) {
        return this.http.get<any>(base + '/api/modelmanage/deleteModel', {params: {modelid}})
    }

    /** 上传 */
    getUploadUrl (userid: string, fieldType: string, tradename: string) {
        return `${base}/api/personal/myuploadFunction?userid=${userid}&sorttype=${fieldType}&tradename=${tradename}`
    }

    /** 请求模型统计数据 */
    fetchModelStats (modelId) {
        return forkJoin([
            this.viewCount(modelId),
            this.commentCount(modelId),
            this.collectCount(modelId),
            this.downloadCount(modelId),
        ])
    }

    // 浏览量
    viewCount(modelid){
        return  this.http.get<number>(config.hosts.base + '/api/model/queryModelViewCounts',{params: {modelid}});
    }
    // 评论数
    commentCount(modelid){
        return this.http.get<number>(config.hosts.base + '/api/model/queryModelCommentCounts',{params: {modelid}})
    }
    // 收藏数
    collectCount(modelid){
        return this.http.get<number>(config.hosts.base + '/api/model/queryModelCollectCounts',{params: {modelid}})
    }
    // 下载数
    downloadCount(modelid){
        return this.http.get<number>(config.hosts.base + '/api/model/queryModelDownloadCounts',{params: {modelid}})
    }

    // 获取模型的行业列表
    fetchFieldList () {
        return this.http.get<Field []>(config.hosts.base + '/api/model/modelSortList')
    }

    // 获取模型的领域列表
    fetchTradeList (fieldType: string) {
        return this.http.get<Trade []>(config.hosts.base + '/api/model/modelTradeList', {params: {sorttype: fieldType}})
    }

    // 收藏模型
    collect (modelId: string, userId: string) {
        return this.http.get(config.hosts.base + '/api/model/collectmodel', {params: {modelid: modelId, userid: userId }})
    }

    // 查询模型详情
    fetchModelDetail (modelId: string) {
        return this.http.get<Model []>(config.hosts.base + '/api/model/queryModelInsformationByModelid', {params: {modelid: modelId}})
                .pipe(map((list) => {
                    let model = list[0]
                    model.createTime = formatDate(model.createTime, '.')
                    initStats(model)
                    return model
                }))
    }


}

// flat 2d arr to 1d arr
function flat (arr: any [] []) {
    return [].concat(...arr)
}

function initStats (model) {
    model.modelCollectCounts = 0
    model.modelCommentCounts = 0
    model.modelDownloadCounts = 0
    model.modelViewCounts = 0
}

function formatModelData (model: Model) {
    if (typeof model.createTime === 'number') {
        model.createTime = formatDate(model.createTime)
    }
    initStats(model)
    return model
}