export interface IAcl {
	group: string;
	canRead: () => boolean;
	canCreate: () => boolean;
	canUpdate: () => boolean;
	canDelete: () => boolean;
}