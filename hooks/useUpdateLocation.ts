import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { api } from "@/lib/api";

const useUpdateLocation = () => {
  const mutation = useMutation({
    mutationFn: async ({ lat, lon }: { lat: number; lon: number }) => {
      console.log("Sending location:", { lat, lon });

      const { data } = await api.post("/api/user/update-location", {
        lat,
        lon,
      });

      return data;
    },

    onSuccess: (data) => {
      console.log("Server response:", data);

      toast.success(data.message || "Location updated successfully.");
    },

    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || "Failed to update location.",
      );
    },
  });

  const updateCurrentLocation = () => {
    if (!navigator.geolocation) {
      toast.error("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        mutation.mutate({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
      },
      (error) => {
        switch (error.code) {
          case error.PERMISSION_DENIED:
            toast.error("Location permission denied.");
            break;
          case error.POSITION_UNAVAILABLE:
            toast.error("Location unavailable.");
            break;
          case error.TIMEOUT:
            toast.error("Location request timed out.");
            break;
          default:
            toast.error("Failed to get your location.");
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      },
    );
  };

  return {
    updateCurrentLocation,
    isPending: mutation.isPending,
  };
};

export default useUpdateLocation;

// use case one

// <button onClick={updateCurrentLocation} disabled={isPending}>
//   Update Location
// </button>

// use case two

// const { updateCurrentLocation, isPending } = useUpdateLocation();

// useEffect(() => {
//   updateCurrentLocation();
// }, []);
