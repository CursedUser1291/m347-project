import {Card, CardContent, Typography, Input, Box, Grid} from '@mui/joy';

export function AppointmentCard() {

return (
<Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
    <Box>
        <Card>
            <CardContent>
                <Grid
                    container
                    rowSpacing={1}
                    width="400px"
                >
                    <Grid xs={6}>
                        <Typography level="title-md">Date</Typography>
                    </Grid>
                    <Grid xs={6}>
                        <Input readOnly={true} />
                    </Grid>
                    <Grid xs={6}>
                        <Typography level="title-md">Time</Typography>
                    </Grid>
                    <Grid xs={6}>
                        <Input readOnly={true} />
                    </Grid>
                    <Grid xs={6}>
                        <Typography level="title-md">Description</Typography>
                    </Grid>
                    <Grid xs={6}>
                        <Input readOnly={true} />
                    </Grid>
                    <Grid xs={6}>
                        <Typography level="title-md">Participants</Typography>
                    </Grid>
                    <Grid xs={6}>
                        <Input readOnly={true}/>
                    </Grid>
                    <Grid xs={6}>
                        <Typography level="title-md">Public-Key</Typography>
                    </Grid>
                    <Grid xs={6}>
                        <Input readOnly={true} />
                    </Grid>
                    <Grid xs={6}>
                        <Typography level="title-md">Private-Key</Typography>
                    </Grid>
                    <Grid xs={6}>
                        <Input readOnly={true} />
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    </Box>
</Box>
);
}
export default AppointmentCard;