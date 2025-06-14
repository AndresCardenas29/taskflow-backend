import * as bcrypt from "bcrypt";

async function hashPassword(plainPassword: string): Promise<string> {
	try {
		const saltOrRounds = 10;
		const hash = await bcrypt.hash(plainPassword, saltOrRounds);
		return hash;
	} catch (error) {
		console.error(error);
		return "";
	}
}
export default hashPassword;
