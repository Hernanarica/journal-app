export const fileUpload = async file => {
	const cloudUrl = 'https://api.cloudinary.com/v1_1/kickads/upload';
	const formData = new FormData;
	formData.append('upload_preset', 'react-journal');
	formData.append('file', file);
	
	try {
		const resFetch = await fetch(cloudUrl, {
			method: 'POST',
			body: formData
		});
		
		if (resFetch.ok) {
			const cloudRes = await resFetch.json();
			return cloudRes.secure_url;
		} else {
			throw await resFetch.json();
		}
		
	} catch (err) {
		throw err;
	}
};