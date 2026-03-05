import { getAdminProfileApi } from "@/features";
import { useEffect } from "react";

const ProfilePage = () => {
  useEffect(() => {
    testApi();
  }, []);

  const testApi = async () => {
    await getAdminProfileApi();
  };

  return <div>Welcome to the Admin Profile Page</div>;
};

export default ProfilePage;
