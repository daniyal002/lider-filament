import React, { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import "./UserModal.scss";
import { useUpdateUserMutation, useUserDataById } from "@/hook/userHook";
import { IUserDetail } from "@/interface/user";

interface Props {
  userId: number;
  setUserId:any,
  type:"Создать" | "Изменить",
}

export default function CategoryModal({userId,setUserId,type}:Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IUserDetail>({ mode: "onChange" });
  const {mutate:updateUserMutation} = useUpdateUserMutation()
  const {userByIdData} = useUserDataById(String(userId))

  const onSubmit: SubmitHandler<IUserDetail> = (data) => {
    updateUserMutation(data);
    setUserId(undefined);
    reset();
  };

  useEffect(() => {
    if (userId === undefined && type === 'Создать') {
      reset();
    } else if (userId) {
      reset({
       user_id:userId,
       is_active:userByIdData?.detail.is_active,
       is_verified:userByIdData?.detail.is_verified
      });
    }
  }, [reset, userId, userByIdData, type]);

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
                Изменить пользователя
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => {setUserId(undefined);reset()}}
              ></button>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="modal-body">
                <div className="mt-side-widget">
                  <div className="mb-3" style={{display:"flex",flexDirection:"row",alignItems:"center"}}>
                    <label className="form-label">Активный пользователь</label>
                    <input
                      type="checkbox"
                      className="input"
                      placeholder="Категория"
                      {...register("is_active")}
                    />
                  </div>

                  <div className="mb-3" style={{display:"flex",flexDirection:"row",alignItems:"center"}}>
                    <label className="form-label">Потвержденный пользователь</label>
                    <input
                      type="checkbox"
                      className="input"
                      placeholder="Категория"
                      {...register("is_verified")}
                    />
                  </div>

                </div>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                  onClick={() => {setUserId(undefined);reset()}}
                >
                  Закрыть
                </button>
                <button type="submit" className="btn-type1" data-bs-dismiss="modal">
                Изменить пользователя
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
