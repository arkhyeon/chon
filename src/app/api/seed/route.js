import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function POST() {
	try {
		const user = await prisma.user.create({
			data: {
				name: 'Alice',
				email: 'alice@prisma.io',
			},
		})
		return NextResponse.json({ message: 'Test user created', user }, { status: 200 })
	} catch (e) {
		return NextResponse.json({ error: e.message }, { status: 500 })
	} finally {
		await prisma.$disconnect()
	}
}
