
import { IAcl } from '../IAcl';

export class UsersData implements IAcl {
	public group: string;
	public constructor() {
		this.group = 'Users';
	}
	public canRead = (): boolean => true;
	public canCreate = (): boolean => true;
	public canUpdate = (): boolean => true;
	public canDelete = (): boolean => true;
}