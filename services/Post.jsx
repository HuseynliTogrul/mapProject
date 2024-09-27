import { useEffect } from "react";
import axios from "axios";

const Post = ({ setGeoData }) => {
    useEffect(() => {
        const fetchGeoData = async () => {
            const response = await axios.get("https://raw.githubusercontent.com/johan/world.geo.json/master/countries.geo.json");
            setGeoData(response.data);
        };

        fetchGeoData();
    }, [setGeoData]);
};

export default Post;