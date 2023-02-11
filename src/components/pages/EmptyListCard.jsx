import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import {CardActionArea} from '@mui/material';
import NoDataFound from "../../assets/images/empty-list.png";

export default function ActionAreaCard() {
    return (
        <Card align={"center"} sx={{margin: 30, borderRadius: 5, justifyContent: 'center'}}>
            <CardActionArea disabled={true}>
                <CardContent>
                    <img src={NoDataFound} style={{height: 300}} alt={'No Data Found'}/>
                    <Typography align={"center"} variant="h5" component="div">
                        No Data Found
                    </Typography>
                    <Typography align={"center"} variant="body2" color="text.secondary">
                        Try reload this Page
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}