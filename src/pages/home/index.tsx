import { Container, Typography } from "@mui/material";
import BlogInput from "../../components/blog_input";
import BlogList from "../../components/blog_list";

function Home() {

    return (
        <Container>
            <BlogInput />
            <BlogList />
        </Container>
    )

}


export default Home;
