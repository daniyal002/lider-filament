import { useCreateProductMutation, useProductDataById, useUpdateProductMutation } from "@/hook/productHook";
import { IProductRequest, IProductResponseDetail } from "@/interface/product";
import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import "./ProductModal.scss";

interface Props {
  productId: number;
  setProductId:any,
  type:"Создать" | "Изменить",
}

export default function ProductModal({productId,setProductId,type}:Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IProductRequest>({ mode: "onChange" });
  const { mutate:createProductMutation } = useCreateProductMutation();
  const {mutate:updateProductMutation} = useUpdateProductMutation()
  const {productByIdData} = useProductDataById(String(productId))

  const onSubmit: SubmitHandler<IProductRequest> = (data) => {
    const newProduct: IProductRequest = { ...data, category_id: 1 };
    type === "Создать" ? createProductMutation(newProduct): updateProductMutation(newProduct);
    setProductId(undefined);
    reset();
  };

  useEffect(() => {
    if (productId === undefined && type === 'Создать') {
        reset()
      reset({
        product_name: undefined,
        product_color: undefined,
        product_price: undefined,
        product_size: undefined,
        product_weight: undefined,
        category_id: undefined,
        note: undefined,
      });
    } else if (productId) {
      reset({
        product_id:productId,
        product_name: productByIdData?.detail.product_name,
        product_color: productByIdData?.detail.product_color,
        product_price: productByIdData?.detail.product_price,
        product_size: productByIdData?.detail.product_size,
        product_weight: productByIdData?.detail.product_weight,
        category_id: productByIdData?.detail.product_category?.category_id,
        note: productByIdData?.detail.note,
      });
    }
  }, [reset, productId, productByIdData, type]);

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
                Создание товара
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => {setProductId(undefined);reset()}}
              ></button>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="modal-body">
                <div className="mt-side-widget">
                  <div className="mb-3">
                    <label className="form-label">Название товара</label>
                    <input
                      type="text"
                      className="input"
                      placeholder="Название"
                      {...register("product_name", {
                        required: {
                          message: "Введите название товара",
                          value: true,
                        },
                      })}
                    />
                    {errors.product_name && (
                      <p
                        style={{
                          color: "#c93e3e",
                          paddingLeft: "3px",
                          marginBottom: "10px",
                        }}
                      >
                        {errors.product_name.message}
                      </p>
                    )}
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Размер товара</label>
                    <input
                      type="text"
                      className="input"
                      placeholder="Размер"
                      {...register("product_size", {
                        required: {
                          message: "Введите размер товара",
                          value: true,
                        },
                      })}
                    />
                    {errors.product_size && (
                      <p
                        style={{
                          color: "#c93e3e",
                          paddingLeft: "3px",
                          marginBottom: "10px",
                        }}
                      >
                        {errors.product_size.message}
                      </p>
                    )}
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Цена товара</label>
                    <input
                      type="text"
                      className="input"
                      placeholder="Цена"
                      {...register("product_price", {
                        required: {
                          message: "Введите цену товара",
                          value: true,
                        },
                        pattern: {
                          value: /^[1-9][0-9]*$/,
                          message: "Вводить можно только положительные цифры",
                        },
                      })}
                    />
                    {errors.product_price && (
                      <p
                        style={{
                          color: "#c93e3e",
                          paddingLeft: "3px",
                          marginBottom: "10px",
                        }}
                      >
                        {errors.product_price.message}
                      </p>
                    )}
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Вес товара</label>
                    <input
                      type="text"
                      className="input"
                      placeholder="Вес"
                      {...register("product_weight", {
                        required: {
                          message: "Введите вес товара",
                          value: true,
                        },
                        pattern: {
                          value: /^[1-9][0-9]*$/,
                          message: "Вводить можно только положительные цифры",
                        },
                      })}
                    />
                    {errors.product_weight && (
                      <p
                        style={{
                          color: "#c93e3e",
                          paddingLeft: "3px",
                          marginBottom: "10px",
                        }}
                      >
                        {errors.product_weight.message}
                      </p>
                    )}
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Описание товара</label>
                    <textarea
                      placeholder="Описание"
                      className="input"
                      {...register("note")}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Цвет товара</label>
                    <input
                      type="text"
                      className="input"
                      placeholder="Цвет"
                      {...register("product_color", {
                        required: {
                          message: "Введите цвет товара",
                          value: true,
                        },
                      })}
                    />
                    {errors.product_color && (
                      <p
                        style={{
                          color: "#c93e3e",
                          paddingLeft: "3px",
                          marginBottom: "10px",
                        }}
                      >
                        {errors.product_color.message}
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
                  onClick={() => {setProductId(undefined);reset()}}
                >
                  Закрыть
                </button>
                <button type="submit" className="btn-type1" data-bs-dismiss="modal">
                  Добавить товар
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
