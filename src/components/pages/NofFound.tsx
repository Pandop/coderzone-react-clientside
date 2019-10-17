import React, { ReactNode } from 'react'


const NotFoundPage: React.SFC<ReactNode> = () => {
	return (
		<div className="container-fluid" style={{minHeight: '83vh'}}>
			<section className="d-flex flex-row justify-content-center flex-wrap my-1">
				<div className="row p-3">
					<div className="col-md-12">
						<img className="d-block w-100" src="assets/404.svg" alt="page not found"/>
					</div>
				</div>
			</section>
		</div>
	)
}

// Export home page component
export default NotFoundPage
