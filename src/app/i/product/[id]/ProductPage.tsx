'use client'

import {
  useCreateProductMutation,
  useProductDataById,
  useUpdateProductMutation,
} from "@/hook/productHook";
import { IProductRequest } from "@/interface/product";
import React, { useEffect } from "react";
import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";
import "./ProductPage.scss";
import { useCategoryData } from "@/hook/categoryHook";
import { Toaster } from "react-hot-toast";

interface Props {
  productId: number;
}

export default function ProductPage({ productId }: Props) {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<IProductRequest>({ mode: "onChange" });
  const { mutate: createProductMutation } = useCreateProductMutation();
  const { mutate: updateProductMutation } = useUpdateProductMutation();
  const { productByIdData } = useProductDataById(String(productId));
  const { categoryData } = useCategoryData();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "product_additional_prices",
  });

  const onSubmit: SubmitHandler<IProductRequest> = (data) => {
    const formData = new FormData();
    const productData = JSON.stringify({
      product_name: data.product_name,
      product_price: data.product_price,
      product_size: data.product_size,
      product_weight: data.product_weight,
      product_color: data.product_color,
      note: data.note,
      category_id: data.category_id,
      product_additional_prices: data.product_additional_prices
    });

    if (productId !== Number(productId)) {
      formData.append("product_create", productData);
    } else {
      formData.append("product_update", productData);
      formData.append("product_id", JSON.stringify(data.product_id));

    }

    if (data.images) {
      Array.from(data.images).forEach((file) => {
        formData.append("images", file);
      });
    }


    if (productId !== Number(productId)) {
      createProductMutation(formData as any);
    } else {
      updateProductMutation({ product_id: String(productId), formData });
    }

    // reset();
  };

  useEffect(() => {
    if (productId === undefined && productId !== Number(productId)) {
      reset();
      reset({
        product_name: undefined,
        product_color: undefined,
        product_price: undefined,
        product_size: undefined,
        product_weight: undefined,
        category_id: undefined,
        images: undefined,
        note: undefined,
        product_additional_prices: undefined,
      });
    } else if (productId) {
      reset({
        product_id: productId,
        product_name: productByIdData?.detail.product_name,
        product_color: productByIdData?.detail.product_color,
        product_price: productByIdData?.detail.product_price,
        product_size: productByIdData?.detail.product_size,
        product_weight: productByIdData?.detail.product_weight,
        category_id: productByIdData?.detail.product_category?.category_id,
        note: productByIdData?.detail.note,
        product_additional_prices: productByIdData?.detail.product_additional_prices || [],
      });
    }
  }, [reset, productId, productByIdData]);

  return (
    <div className="product-page">
      <Toaster toastOptions={{duration:3000}}/>
      <h1 className="product-page-title">{productId !== Number(productId) ? "Создать товар" : `Изменить ${productByIdData?.detail.product_name}`} </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="product-form">
        <div className="form-group">
          <label>Название товара</label>
          <input
            type="text"
            placeholder="Название"
            {...register("product_name", {
              required: { message: "Введите название товара", value: true },
            })}
          />
          {errors.product_name && (
            <p className="error">{errors.product_name.message}</p>
          )}
        </div>

        <div className="form-group">
          <label>Размер товара</label>
          <input
            type="text"
            placeholder="Размер"
            {...register("product_size", {
              required: { message: "Введите размер товара", value: true },
            })}
          />
          {errors.product_size && (
            <p className="error">{errors.product_size.message}</p>
          )}
        </div>

        <div className="form-group">
          <label>Цена товара</label>
          <input
            type="text"
            placeholder="Цена"
            {...register("product_price", {
              required: { message: "Введите цену товара", value: true },
              pattern: {
                value: /^[1-9][0-9]*$/,
                message: "Вводить можно только положительные цифры",
              },
            })}
          />
          {errors.product_price && (
            <p className="error">{errors.product_price.message}</p>
          )}
        </div>

        {/* Product Additional Prices */}
        <div className="form-group">
          <label>Дополнительные цены</label>
          {fields.map((field, index) => (
            <div key={field.id} className="additional-price-group">
              <div className="form-group-additional">
              <label>От</label>
              <input
                type="text"
                placeholder="С какого количества"
                {...register(`product_additional_prices.${index}.product_from`, {
                  required: "Введите количество",
                })}
              />
              {errors.product_additional_prices?.[index]?.product_from && (
                <p className="error">
                  {errors.product_additional_prices[index].product_from?.message}
                </p>
              )}
              </div>
              <div className="form-group-additional">
              <label>Цена</label>
              <input
                type="number"
                placeholder="Цена"
                {...register(
                  `product_additional_prices.${index}.product_additional_price`,
                  {
                    required: "Введите цену",
                  }
                )}
              />
              {errors.product_additional_prices?.[index]?.product_additional_price && (
                <p className="error">
                  {
                    errors.product_additional_prices[index]
                      .product_additional_price?.message
                  }
                </p>
              )}
              </div>
              <button
                type="button"
                onClick={() => remove(index)}
                className="btn-secondary"
              >
                Удалить
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() =>
              append({ product_from: "", product_additional_price: 0 })
            }
            className="btn-primary"
          >
            Добавить цену
          </button>
        </div>

        <div className="form-group">
          <label>Вес товара</label>
          <input
            type="text"
            placeholder="Вес"
            {...register("product_weight", {
              required: { message: "Введите вес товара", value: true },
              pattern: {
                value: /^[1-9][0-9]*$/,
                message: "Вводить можно только положительные цифры",
              },
            })}
          />
          {errors.product_weight && (
            <p className="error">{errors.product_weight.message}</p>
          )}
        </div>

        <div className="form-group">
          <label>Описание товара</label>
          <textarea placeholder="Описание" {...register("note")} />
        </div>

        <div className="form-group">
          <label>Цвет товара</label>
          <input
            type="text"
            placeholder="Цвет"
            {...register("product_color", {
              required: { message: "Введите цвет товара", value: true },
            })}
          />
          {errors.product_color && (
            <p className="error">{errors.product_color.message}</p>
          )}
        </div>

        <div className="form-group">
          <label>Выберите категорию</label>
          <select
            {...register("category_id", {
              required: { message: "Выберите категрию", value: true },
            })}
          >
            {categoryData?.detail.map((category) => (
              <option value={category.category_id} key={category.category_id}>
                {category.category_name}
              </option>
            ))}
          </select>
          {errors.category_id && (
            <p className="error">{errors.category_id.message}</p>
          )}
        </div>

        <div className="form-group">
          <label>Выберите изображение для товара</label>
          <input type="file" multiple {...register("images",{required:{message:"Выберите изображение товара",value:true}})} />
          {errors.images && (
            <p className="error">{errors.images.message}</p>
          )}
        </div>

        <div className="form-actions">
          <button
            type="button"
            className="btn-secondary"
            onClick={() => {
              history.back();
              reset();
            }}
          >
            Отмена
          </button>
          <button type="submit" className="btn-primary">
          {productId !== Number(productId) ? "Создать" : "Изменить"} товар
          </button>
        </div>
      </form>
    </div>
  );
}
