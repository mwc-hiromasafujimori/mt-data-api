type ContentType = 'application/x-www-form-urlencoded' | 'multipart/form-data';

export const unauthorizedHeader = (
	contentType: ContentType = 'application/x-www-form-urlencoded',
): HeadersInit => {
	return {
		'Content-Type': contentType,
	};
};

export const authorizedHeader = (
	token: string,
	contentType: ContentType = 'application/x-www-form-urlencoded',
): HeadersInit => {
	return {
		'Content-Type': contentType,
		'X-MT-Authorization': `MTAuth accessToken=${token}`,
	};
};
