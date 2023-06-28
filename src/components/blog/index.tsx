import {Blog as BlogType} from "../../types";

function Blog(props: {blog: BlogType}) {
    return (
        <div className="">
            <div className="flex flex-row">
                <p>
                    <body>{new Date(props.blog.created_at * 1000).toLocaleString()} </body>
                </p>
            </div>
            <div>
				<p>
                  <h5>  {props.blog.content} </h5>
                </p>
            </div>
        </div>
    )
}


export default Blog;
