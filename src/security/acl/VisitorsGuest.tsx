
import { IAcl } from '../IAcl';

export class VisitorsGuest implements IAcl {
	public group: string;
	public constructor() {
		this.group = 'Visitors';
	}
	public canRead = (): boolean => true;
	public canCreate = (): boolean => false;
	public canUpdate = (): boolean => false;
	public canDelete = (): boolean => false;
}