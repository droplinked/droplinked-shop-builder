import { Box, Grid } from '@chakra-ui/react';
import React from 'react';
import styles from "./spinnerStyles.module.scss"

function GamificationSpinner() {
    return (
        <Grid width={"100%"} height={"100%"} position={"absolute"} zIndex={10} placeItems={"center"}>
            <div className={styles.spinner} />
        </Grid>
    )
}

export default GamificationSpinner