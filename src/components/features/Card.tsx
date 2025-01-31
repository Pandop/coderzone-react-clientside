import React from 'react';
import { Link } from "react-router-dom";
import { IProgrammer } from '../../App';

//interface ICardProps extends RouteComponentProps{ coder: ICoderItem;}
export interface ICardProps { coder: IProgrammer; }

const Card: React.FC<ICardProps> = ({ coder }) => {
    return (
        <section className="card m-1 card-transition" style={{ width: "16rem" }}>
            <div className="card-image-trans">
                <img className="card-img-top" src={coder.profile.avatar || "assets/coder-default.png"} alt="coder" />
            </div>
            <div className="card-body card-content-trans" >
                <div className="card-content" >
                    <h4 className="card-title">{`${coder.profile.firstName} ${coder.profile.lastName}`}</h4>
                    <h6 className="card-subtitle mb-2 text-muted">Senior Developer</h6>
                    <p className="card-text" >{coder.profile.bio.substring(0, 80)}...</p>
                    <Link to="#" className="card-link">Reach out</Link>
                    <Link to={`coder/${coder.id}`} className="card-link">View profile</Link>
                </div>
            </div>

        </section>
    )
}

// Export Card component
export default Card
