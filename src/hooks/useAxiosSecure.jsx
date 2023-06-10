import axios from "axios";


const axiosSecure = axios.create({
  baseURL: `${import.meta.env.VITE_api_url}`, 
});

const useAxiosSecure = () => {
  return (
    <div>
      
    </div>
  );
};

export default useAxiosSecure;