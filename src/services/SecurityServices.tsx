
import { IModelAttributes, Model } from 'Models/Model';
import CodersStore  from '../store/codersStore';
import { IAcl } from '../security/IAcl';
import { useContext } from 'react';


export class SecurityService {
	public static canRead<T extends {acls?: IAcl[], new (...args: any[]): InstanceType<T>}>(modelType: T): boolean {
		const store = useContext(CodersStore);
		if (modelType.acls && modelType.acls.some(acl => store.userGroups.some(ug => acl.group === ug.name ? acl.canRead() : false))) 
		{
			return true;
		} else {
			return false;
		}
	}
	public static canCreate<T extends {acls?: IAcl[], new (...args: any[]): InstanceType<T>}>(modelType: T): boolean {
		const store = useContext(CodersStore);
		if (modelType.acls && modelType.acls.some(acl => store.userGroups.some(ug => acl.group === ug.name ? acl.canCreate() : false))) 
		{
			return true;
		} else {
			return false;
		}
	}
	public static canUpdate<T extends {acls?: IAcl[], new (...args: any[]): InstanceType<T>}>(modelType: T): boolean {
		const store = useContext(CodersStore);
		if (modelType.acls && modelType.acls.some(acl => store.userGroups.some(ug => acl.group === ug.name ? acl.canUpdate() : false))) 
		{
			return true;
		} else {
			return false;
		}
	}
	public static canDelete<T extends {acls?: IAcl[], new (...args: any[]): InstanceType<T>}>(modelType: T): boolean {
		const store = useContext(CodersStore);
		if (modelType.acls && modelType.acls.some(acl => store.userGroups.some(ug => acl.group === ug.name ? acl.canDelete() : false))) 
		{
			return true;
		} else {
			return false;
		}
	}
}