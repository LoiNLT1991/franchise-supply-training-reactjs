import { getFranchiseDetailApi } from "@/features";
import { useFranchiseStore } from "@/stores";

export const changeFranchiseUseCase = async (franchiseId: string) => {
  const store = useFranchiseStore.getState();

  try {
    const detail = await getFranchiseDetailApi(franchiseId);
    if (detail) {
      store.setFranchiseDetail(detail);
      store.setSelectedFranchiseId(franchiseId);
    }
  } catch (error) {
    console.log(error);
  }
};
