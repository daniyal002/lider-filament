import { useDeleteCategoryMutation } from "@/hook/categoryHook";
import { useDeleteProductMutation } from "@/hook/productHook";
import { ICategoryResponse } from "@/interface/category";
import { IProductResponse } from "@/interface/product";
import Image from "next/image";
import React from "react";

interface Props {
  categoryData: ICategoryResponse;
  setCategoryId: any;
  setCategoryType: any;
}

export default function CategoryGrid({
  categoryData,
  setCategoryId,
  setCategoryType,
}: Props) {
  const { mutate: deleteCategoryMutation } = useDeleteCategoryMutation();

  return (
    <>
      <div className="container">
        <div className="row">
          <div data-wow-delay="0.4s">
            <header className="mt-shoplist-header">
              <div className="btn-box">
                <button
                  className="drop-link"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                  onClick={() => {
                    setCategoryType("Создать");
                    setCategoryId(undefined);
                  }}
                >
                  Добавить Категорию
                </button>
              </div>
            </header>
            <table className="table table-dark table-striped">
              <thead>
                <tr>
                  <th scope="col">Id</th>
                  <th scope="col">Название категории</th>
                  <th scope="col">Действия</th>
                </tr>
              </thead>
              <tbody>
                {categoryData &&
                  categoryData?.detail.map((category) => (
                    <tr>
                      <th scope="row">{category.category_id}</th>
                      <td>{category.category_name}</td>
                      <td style={{display:"flex",alignItems:"center",flexWrap:"wrap"}}>
                        <button
                          data-bs-toggle="modal"
                          data-bs-target="#exampleModal"
                          className="btn btn-outline-success"
                          onClick={() => {
                            setCategoryType("Изменить");
                            setCategoryId(category.category_id);
                          }}
                        >
                          Редактировать
                        </button>
                        <button
                          onClick={() =>
                            deleteCategoryMutation({
                              ...category,
                              category_id: category.category_id,
                            })
                          }
                          className="btn btn-outline-danger"
                          style={{ cursor: "pointer" }}
                        >
                          <Image
                            src={"/trash.svg"}
                            alt="Direct Image"
                            width={23.78}
                            height={20}
                          />
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
