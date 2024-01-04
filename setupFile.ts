import "@testing-library/jest-dom"
import {vi, beforeEach} from 'vitest'

beforeEach(() => {
    const matchMediaMock=vi.fn().mockImplementation((query) => ({
        matches: false,
        media:query,
        onchange: null,
        addListener: vi.fn(), // Deprecated
        removeListener: vi.fn(), // Deprecated
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
    }))

    const computedStuleMock=vi.fn().mockImplementation(()=>({}))
    vi.stubGlobal("matchMedia",matchMediaMock)
    vi.stubGlobal("computedStyle",computedStuleMock)
    
});
