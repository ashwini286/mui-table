import { css } from "@emotion/css";
import { useTheme } from "@emotion/react";
import { useMemo } from "react";
const useClasses = (stylesElement, customprops) => {
    const theme = useTheme();
    return useMemo(() => {
        const rawClasses =
            typeof stylesElement === "function" ? stylesElement(theme) : stylesElement;
        const prepared = {};

        Object.entries(rawClasses).forEach(([key, value = {}]) => {
            prepared[key] = css(value);
        });

        return prepared;
    }, [stylesElement, theme, customprops]);
};

const styles = (theme) => ({
    progressWrapper: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
    },
}

);

export const useStyles = (customprops) => useClasses(styles, customprops);
