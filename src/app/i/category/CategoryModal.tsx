import { useCreateProductMutation, useProductDataById, useUpdateProductMutation } from "@/hook/productHook";
import { IProductRequest, IProductResponseDetail } from "@/interface/product";
import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import "./ProductModal.scss";
import { ICategoryRequset } from "@/interface/category";
import { useCategoryDataById, useCreateCategoryMutation, useUpdateCategoryMutation } from "@/hook/categoryHook";

interface Props {
  categoryId: number;
  setCategoryId:any,
  type:"Создать" | "Изменить",
}

export default function CategoryModal({categoryId,setCategoryId,type}:Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ICategoryRequset>({ mode: "onChange" });
  const { mutate:createCategoryMutation } = useCreateCategoryMutation();
  const {mutate:updateCategoryMutation} = useUpdateCategoryMutation()
  const {categoryByIdData} = useCategoryDataById(String(categoryId))

  const onSubmit: SubmitHandler<ICategoryRequset> = (data) => {
    type === "Создать" ? createCategoryMutation(data): updateCategoryMutation(data);
    setCategoryId(undefined);
    reset();
  };

  useEffect(() => {
    if (categoryId === undefined && type === 'Создать') {
      reset();
    } else if (categoryId) {
      reset({
       category_id:categoryId,
       category_name:categoryByIdData?.detail.category_name
      });
    }
  }, [reset, categoryId, categoryByIdData, type]);

  return (
    <>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                {type} категории
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => {setCategoryId(undefined);reset()}}
              ></button>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="modal-body">
                <div className="mt-side-widget">
                  <div className="mb-3">
                    <label className="form-label">Название категории</label>
                    <input
                      type="text"
                      className="input"
                      placeholder="Категория"
                      {...register("category_name", {
                        required: {
                          message: "Введите название категории",
                          value: true,
                        },
                      })}
                    />
                    {errors.category_name && (
                      <p
                        style={{
                          color: "#c93e3e",
                          paddingLeft: "3px",
                          marginBottom: "10px",
                        }}
                      >
                        {errors.category_name.message}
                      </p>
                    )}
                  </div>

                </div>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                  onClick={() => {setCategoryId(undefined);reset()}}
                >
                  Закрыть
                </button>
                <button type="submit" className="btn-type1" data-bs-dismiss="modal">
                  {type} категорию
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
