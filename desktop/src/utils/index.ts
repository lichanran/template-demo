
/** 数组再分组 */
export function splitToGroups<T> (list: T [], size: number) {

    let ret: T[] [] = []
    let count = Math.ceil(list.length / size)
    for (let i = 0; i < count; i += 1) {
        ret.push(list.slice(i * size, (i + 1) * size))
    }
    
    return ret
}
export function flat2DArray (list: any [] []) {
    let ret = []
    list.forEach((sub) => {
        ret = ret.concat(sub)
    })
    return ret
}


export function formatDate (ms, delimiter="/") {
    let date = new Date(ms)
    return [date.getFullYear(), padZero(date.getMonth() + 1), padZero(date.getDate())].join(delimiter)
    // return `${date.getFullYear()}.${padZero(date.getMonth() + 1)}.${padZero(date.getDate())}`
}

function padZero(n) {
  return ("0" + n).slice(-2)
}

// 校验手机号
export function validatePhone (phone) {
    var regExp_number = /^[1][3-9][0-9]{9}$/;
    return regExp_number.test(phone);
}

// 数组分组
export function divideArray (arr, filter) {
    let stay = []
    let out = []
    for (let i = 0; i < arr.length; i ++) {
        let item = arr[i]
        if (filter(item)) {
            out.push(item)
        } else {
            stay.push(item)
        }
    }
    return [out, stay]
}


// 是否已经加载了某个接口,可以指定过期时间
export class LoadStateCache {
    private _cache;
    age: number;

    constructor (age=5 * 1000 * 60) {
        this._cache = new Map<any, {value: any, expire: Date}>()
        this.age = age
    }

    setValue (key, value) {
        this._cache.set(key, {
            value,
            expire: new Date( Date.now() + this.age)
        })
    }

    getValue (key) {
        if (this.hasValue(key)) {
            return this._cache.get(key).value
        } else {
            // delete
            this._cache.delete(key)
            return null
        }
    }

    // 会检查过期时间
    hasValue (key) {
        if (!this._cache.has(key)) return false

        let expire = this._cache.get(key).expire

        if (expire < (new Date())) {
            return false 
        }

        return true
    }

}

// 判断一组值是否存在
export function exist (...arg) {
    for (let i = 0; i < arg.length; i++) {
        let item = arg[i];
        if (!item && item !== 0) return false
    }
    return true
}


export const regExp_number = /^[1][3-9][0-9]{9}$/;

