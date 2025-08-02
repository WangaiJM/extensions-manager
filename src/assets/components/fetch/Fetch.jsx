import { useEffect, useState } from "react";
import axios from "axios";

const Fetch = () => {
  const [extensions, setExtensions] = useState([]);

  useEffect(() => {
    const fetchExtensions = async () => {
      try {
        const response = await axios.get("./config/data.json");
        setExtensions(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchExtensions();
  }, []);
  return extensions;
};
export default Fetch;
