import { useParams } from "react-router-dom";


export const MoviePage = () => {

    const { id } = useParams();
    
    return (
        <h1>Movie page</h1>
    );

};
