export interface ICategoryRequset{
    category_id:number,
    category_name:string
}

export interface ICategoryResponse{
    detail:ICategoryRequset[]
}

export interface ICategoryByIdResponse{
    detail:ICategoryRequset
}
