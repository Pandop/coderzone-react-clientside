import React from 'react'

function loadSpinner() {
	return (
		<>
			<div className="d-flex justify-content-center">
				<div className="spinner-border text-primary center" role="status">
					<span className="sr-only">Loading...</span>
				</div>
			</div>
		</>
	);
}
// export loader
export default loadSpinner
