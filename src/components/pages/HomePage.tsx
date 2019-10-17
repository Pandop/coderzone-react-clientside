import React from 'react'
import { ICoderItem, ServerResponse, Programmer} from '../../App'
import Card  from '../features/Card'
import { RouteComponentProps } from 'react-router'

interface ICoderProps extends RouteComponentProps{
	coders: ICoderItem[];
}
interface IProgrammer extends RouteComponentProps{
	programmers: Array<Programmer>

}

const HomePage: React.FunctionComponent<IProgrammer> = ({programmers, ...restProps}) => {
	console.log("Data===>", programmers);
	console.log("Array.isArra===>", Array.isArray(programmers));
	if(programmers.length==0) return null;

	return (
		<div className="container-fluid">
			<section className="d-flex flex-row justify-content-center flex-wrap my-1">
				{ programmers.map((coder)=> <Card key={coder.id} coder={coder} {...restProps} />) }
			</section>
		</div>
		
	)
}

// Export home page component
export default HomePage
