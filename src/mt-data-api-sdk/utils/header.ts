type ContentType = 'application/x-www-form-urlencoded' | 'multipart/form-data';

export const createHeader = (
	contentType: ContentType = 'application/x-www-form-urlencoded',
): HeadersInit => {
	return {
		'Content-Type': 'application/x-www-form-urlencoded',
	};
};

export const createAuthorizedHeader = (
	token: string,
	contentType: ContentType = 'application/x-www-form-urlencoded',
): HeadersInit => {
	return {
		'Content-Type': contentType,
		'X-MT-Authorization': `MTAuth accessToken=${token}`,
	};
};
