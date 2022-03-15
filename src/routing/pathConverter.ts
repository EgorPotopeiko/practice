export default function PathConverter(path: string, id1?: string | number, id2?: string | number): string {
    if (id2) return `${path}?id=${id1}&id2=${id2}`
    else return `${path}?id=${id1}`
}