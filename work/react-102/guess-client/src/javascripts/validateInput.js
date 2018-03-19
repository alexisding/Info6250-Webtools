export const validateInput = (word) => {
	if (word.length > 5) {
		return word.substring(0, 5);
	}
	return word;
};