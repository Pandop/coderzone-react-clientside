
type FetchType<T>={loading: boolean, error: Error, data: T}

export const dataFromBackend=<T>({ loading, error, data }:FetchType<T>):T|boolean|Error => {
	if (loading) return loading;
	
	if (error) return error;

	return data;
}