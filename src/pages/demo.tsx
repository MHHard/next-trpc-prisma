"use client";
import { useEffect } from "react";
import trpc from "../trpcClient/trpc";
function Demo() {
  const addUser = trpc.userCreate.useMutation();
  useEffect(() => {
    const req = addUser.mutate({
      name: "wwwwsss",
      email: "123121299@qq",
    });
    console.log("eqp111", req);
  }, []);
  const user = trpc.userList.useQuery();
  // const user3 = trpc.test.useQuery();
  console.log(12345, user);

  return <div>122121</div>;
}

export default Demo;
