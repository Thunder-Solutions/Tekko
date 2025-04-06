export const randomUUID = () => {
	const timestamp = Date.now().toString(16)
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
		const r = Math.floor(Math.random() * 16).toString(16)
		const v = c === 'x' ? r : (parseInt(r, 16) & 0x3 | 0x8).toString(16)
		return v
	}) + '-' + timestamp
}
