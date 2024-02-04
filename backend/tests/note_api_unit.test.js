import { getTokenFrom, createNewNote } from "../controllers/NoteController"
import jwt from "jsonwebtoken"

// jest.mock('jsonwebtoken', () => ({
//     verify: jest.fn(),
// }));
jest.unstable_mockModule('../controllers/NoteController', () => ({
    getTokenFrom: jest.fn(() => "Mocked token")
}))

describe("Unit Tests for Note APIs", () => {
    describe("Unit tests for getTokenfunction", () => {
        const token = '123456789'
    
        test("when header starts with 'Bearer' token is correctly extracted", () => {
            const authHeader = `Bearer ${token}`
            const authorizedUserToken = getTokenFrom(authHeader)
    
            expect(authorizedUserToken).toBe(token);
        })
    
        test("when header does not start with 'Bearer' getTokenFrom returns null", () => {
            const authHeader = `Invalid ${token}`
            const invalidFormatToken = getTokenFrom(authHeader)
            const emptyToken = getTokenFrom('')
    
            expect(invalidFormatToken).toBeNull
            expect(emptyToken).toBeNull
    
        })
    })

    describe("Unit Tests for createNewNote", () => {
        beforeAll(async () => {
            jest.spyOn(jwt, 'verify').mockReturnValue({})

            const noteController = await import('../controllers/NoteController')
            mockGetTokenFrom = noteController.getTokenFrom
        });

        afterAll(() => {
            jest.resetAllMocks()
        });

        const reqBody = {content: "Test Note", important: false}

        test("when authorization header is empty, return error", async () => {
            const req = {
                body: reqBody,
                get: jest.fn().mockReturnValue('')
            }
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn().mockReturnThis()
            }

            await createNewNote(req, res)
            
            expect(req.get).toHaveBeenCalledWith('authorization')
            expect(res.status).toHaveBeenCalledWith(400)
            expect(res.json).toHaveBeenCalledWith({ error: 'must provide auth token' })
        })

        //TODO check that correct method is being called 
        test("when decoded token has no id, return error", async ()  => {
            const req = {
                body: reqBody,
                get: jest.fn().mockReturnValue('')
            }
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn().mockReturnThis()
            }

            jwt.verify.mockReturnValue({})
            mockGetTokenFrom.mockReturnValue('Token without ID')

            await createNewNote(req, res)

            expect(res.status).toHaveBeenCalledWith(401)
            expect(res.json).toHaveBeenCalledWith({ error: 'token invalid' })
        })
    })
})