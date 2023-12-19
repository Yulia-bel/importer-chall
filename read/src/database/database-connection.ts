import mongoose from "mongoose";


export async function connectDatabase(mongo_address: any) {

	try {
		await mongoose.connect(
			mongo_address)
		console.log('MongoDB Connected')
	} catch (error) {
		console.log(error)
	}

}

