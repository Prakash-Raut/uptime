export const handler =
	(fn: any) =>
	(req: any, res: any, next: any): Promise<any> =>
		Promise.resolve(fn(req, res, next)).catch(next);
