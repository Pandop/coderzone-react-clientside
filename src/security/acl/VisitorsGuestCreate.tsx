
import { IAcl } from '../IAcl';

export class VisitorsGuestCreateUser implements IAcl {
	public group: string;
	public constructor() {
		this.group = 'Visitors';
	}
	public canRead = (): boolean => false;
	public canCreate = (): boolean => true;
	public canUpdate = (): boolean => false;
	public canDelete = (): boolean => false;
}