import { Outlet, redirect } from "react-router";
import { UserFooter, UserHeader } from "components";
import { account } from "~/appwrite/client";
import { getExistingUser, storeUserData } from "~/appwrite/auth";
export async function clientLoader() {
  try {
    const user = await account.get();

     if(!user.$id) return redirect('/sign-in');

     const existingUser = await getExistingUser(user.$id);
    return existingUser?.$id ? existingUser : await storeUserData();
  } catch (error) {
    console.log("Error in clientLoader", error);
    return redirect("/sign-in");
  }
}
const PageLayout = () => {
  return (
      <div className="">
            <UserHeader/>
          <aside className="user-trip ">
             
              <Outlet />
          </aside>
          <UserFooter/>
      </div>
  )
}
export default PageLayout