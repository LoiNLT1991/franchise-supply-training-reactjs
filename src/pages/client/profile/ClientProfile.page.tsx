import { getCustomerProfileApi } from "@/features";
import { showFormatErrors } from "@/utils";
import { useEffect } from "react";

const ProfilePage = () => {
  useEffect(() => {
    const showProfile = async () => {
      try {
        await getCustomerProfileApi();
      } catch (error) {
        showFormatErrors(error);
      }
    };

    showProfile();
  }, []);

  return <div>Welcome to the Profile Page</div>;
};

export default ProfilePage;
