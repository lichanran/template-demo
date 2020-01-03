/** 数组再分组 */
export function splitToGroups<T> (list: T [], size: number) {

    let ret: T[] [] = []
    let count = Math.ceil(list.length / size)
    for (let i = 0; i < count; i += 1) {
        ret.push(list.slice(i * size, (i + 1) * size))
    }
    
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