export interface ICategoryRequset{
    category_id:number,
    category_name:string
    product_count?:number
}

export interface ICategoryResponse{
    detail:ICategoryRequset[]
}

export interface ICategoryByIdResponse{
    detail:ICategoryRequset
}
