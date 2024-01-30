"use client";
import {
    ReactNode,
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";
import { Container } from "react-bootstrap";

export enum COLOR_MODE {
    STANDARD = "blue",
    CHRISTMAS = "christmas",
    DARK = "dark",
}
export interface CMColorModeContextData {
    currentColorMode: string;
    changeColorMode: (newColorMode: COLOR_MODE) => void;
}

const CMColorModeContext = createContext<CMColorModeContextData>(
    {} as CMColorModeContextData
);

export interface CMColorModeProviderProps {
    children: ReactNode;
}

export function CMColorModeProvider({ children }: CMColorModeProviderProps) {
    const [currentColorMode, setCurrentColorMode] = useState<string>(
        "" + COLOR_MODE.STANDARD
    );

    useEffect(() => {
        if (localStorage) {
            const preferredTheme: string | null =
                localStorage.getItem("preferredTheme");
            preferredTheme &&
                setCurrentColorMode(preferredTheme || COLOR_MODE.STANDARD);
        }
    }, []);

    function changeColorMode(newColorMode: COLOR_MODE) {
        setCurrentColorMode(newColorMode);
        localStorage.setItem("preferredTheme", newColorMode);
    }
    return (
        <CMColorModeContext.Provider value={{ currentColorMode, changeColorMode }}>
            <main data-bs-theme={currentColorMode}>
                <Container className="full-width theme-provider" fluid>
                    {children}
                </Container>
            </main>
        </CMColorModeContext.Provider>
    );
}

export function useCMColorModeProviderContext(): CMColorModeContextData {
    const context = useContext(CMColorModeContext);
    if (!context) {
        throw new Error(
            "CMColorModeProviderContext must be used within an CMColorModeProvider"
        );
    }

    return context;
}

