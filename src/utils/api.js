import axios from "axios";

// GET request to backend to fetch degrees of separation between two casts (actors)

export const fetchDegreesOfSeparation = async (castsId, casts2Id) => {
  try {
    const response = await axios.get(
      `/api/degreesOfSeparation/${castsId}/${casts2Id}`
    );
    return response.data;
  } catch (err) {
    console.error(err);
    return [];
  }
};
