interface IDecodedPayload{
    exp:number,
    sub:string,
    user:boolean
}

export const decoder = (token:string | null):IDecodedPayload | string => {
    if(token === null){
        return "нет токена"
    }
    const tokenParts = token.split('.');  // Разделяем токен на части
    const decodedPayload:IDecodedPayload = JSON.parse(atob(tokenParts[1]));  // Декодируем полезную нагрузку

    return decodedPayload
}