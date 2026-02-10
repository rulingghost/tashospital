export const formatDateToShow = (dateString) => {
    const [year, month, day] = dateString.split("-");   
    return `${day}.${month}.${year}`
}

export const formatISODate = (tarih) => {
    // "2024-12-15T00:00:00Z"

    if (!tarih) return "-" 
    const tarihObj = new Date(tarih)

    const gun = tarihObj.getDate().toString().padStart(2, '0')
    const ay = (tarihObj.getMonth() + 1).toString().padStart(2, '0')
    const yil = tarihObj.getFullYear()

    const saat = tarihObj.getHours().toString().padStart(2, '0')
    const dakika = tarihObj.getMinutes().toString().padStart(2, '0')

    return `${gun}.${ay}.${yil} - ${saat}:${dakika}`
}

export const formatISODateUTC = (tarih) => {
    // "2025-02-09T04:19:00Z"
    if (!tarih) return "-"
    const tarihObj = new Date(tarih)

    const gun = tarihObj.getUTCDate().toString().padStart(2, '0')
    const ay = (tarihObj.getUTCMonth() + 1).toString().padStart(2, '0')
    const yil = tarihObj.getUTCFullYear();

    const saat = tarihObj.getUTCHours().toString().padStart(2, '0')
    const dakika = tarihObj.getUTCMinutes().toString().padStart(2, '0')

    return `${gun}.${ay}.${yil} - ${saat}:${dakika}`
};