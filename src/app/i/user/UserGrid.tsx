import { useDeleteUserMutation } from "@/hook/userHook";
import { IUserResponse } from "@/interface/user";
import Image from "next/image";
import React from "react";

interface Props {
  userData: IUserResponse;
  setUserId: any;
  setUserType: any;
}

export default function UserGrid({
  userData,
  setUserId,
  setUserType,
}: Props) {
  const { mutate: deleteUserMutation } = useDeleteUserMutation();

  return (
    <>
      <div className="container">
        <div className="row">
          <div data-wow-delay="0.4s">
            <table className="table table-dark table-striped">
              <thead>
                <tr>
                  <th scope="col">Id</th>
                  <th scope="col">User name</th>
                  <th scope="col">Логин</th>
                  <th scope="col">Email</th>
                  <th scope="col">Телефон</th>
                  <th scope="col">Действия</th>
                </tr>
              </thead>
              <tbody>
                {userData &&
                  userData?.detail.map((user) => (
                    <tr key={user.user_id}>
                      <th scope="row">{user.user_id}</th>
                      <td>{user.username}</td>
                      <td>{user.login}</td>
                      <td>{user.email}</td>
                      <td>{user.phone}</td>
                      <td style={{display:"flex",alignItems:"center",flexWrap:"wrap"}}>
                        <button
                          data-bs-toggle="modal"
                          data-bs-target="#exampleModal"
                          className="btn btn-outline-success"
                          onClick={() => {
                            setUserType("Изменить");
                            setUserId(user.user_id);
                          }}
                        >
                          Редактировать
                        </button>
                        <button
                          onClick={() =>
                            deleteUserMutation({
                              ...user,
                              user_id: user.user_id,
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
