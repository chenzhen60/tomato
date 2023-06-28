import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
	const error: any = useRouteError();
	console.log(error);

	return (
		<div>
			<p>
				Oops!
			</p>
			<p>
				Sorry, an unexpected error has occurred.
			</p>

			<p>
				<i>{error.statusText || error.message}</i>
			</p>


		</div >
	)

}
