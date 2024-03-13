export default function getParams(url: string, objete: any) {
    const { searchParams } = new URL(url)
    let params = {}
    for (const key in objete) {
        const param = searchParams.get(key)
        if (param) {
            params = { ...params, [key]:  param }
        }
    }
    return params as typeof objete
}