import {it,describe, expect} from 'vitest'
import LoginPage from './login'
import {render,screen} from '@testing-library/react'

describe('login page', () => { 
    it("should has required input fields",()=>{
        render(<LoginPage/>)
        // getBy-> throw an error
        // findBy-> Async
        // queryBy-> null
        expect(screen.getByText(/Sign In/)).toBeInTheDocument()
        expect(screen.getByPlaceholderText("Username")).toBeInTheDocument()
        expect(screen.getByPlaceholderText("Password")).toBeInTheDocument()
        expect(screen.getByRole("button",{name:"Log In"})).toBeInTheDocument()
        expect(screen.getByRole("checkbox",{name:"Remember me"})).toBeInTheDocument()
        expect(screen.getByText("Forgot Password")).toBeInTheDocument()
    })
 })