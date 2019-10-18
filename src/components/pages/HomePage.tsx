import React, { useContext } from 'react';
import { observer } from 'mobx-react';
import { RouteComponentProps } from 'react-router';

import { Programmer} from '../../App';
import Card  from '../features/Card';
import CodersStore from '../../store/codersStore';


// programmers={coderStore.programmers}
const HomePage: React.FunctionComponent<RouteComponentProps> = ({...restProps}) => {
	const {loadingInitial,programmers} = useContext(CodersStore);

	console.log("Data===>", programmers);
	console.log("Array.isArra===>", Array.isArray(programmers));
	if(programmers.length==0 || loadingInitial) 
		return <div className="container-fluid"><h3>Loading ....</h3></div>;

	return (
		<div className="container-fluid">
			<section className="d-flex flex-row justify-content-center flex-wrap my-1">
				{ programmers.map((coder:Programmer)=> <Card key={coder.id} coder={coder} {...restProps} />) }
			</section>
		</div>
	)
}

// Export home page component
export default observer(HomePage);
