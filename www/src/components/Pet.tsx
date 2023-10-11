import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CardActionArea, CardActions, CardContent, Divider, IconButton, Tooltip, Typography } from "@mui/material";
import { faBone, faSyringe, faCalendarCheck, faGear, faCat, faCircleQuestion } from "@fortawesome/free-solid-svg-icons";
import Card from "@mui/material/Card";
import { Component, ReactNode } from "react";

export interface PetProps {
    name: string
    type: string
    breed: string
}

export default class Pet extends Component<PetProps, {}> {
    render(): ReactNode {
        let typeImage;

        if(this.props.type == 'Dog'){
            typeImage = faBone
        }else if(this.props.type == 'Cat'){
            typeImage = faCat
        }else
            typeImage = faCircleQuestion

        return (
            <Card variant="outlined" sx={{margin: "1em", width: "15em"}}>
                <CardActionArea>
                    <CardContent sx={{paddingBottom: 0}}>
                        <FontAwesomeIcon icon={ typeImage } size="4x"/>                    
                        <Typography variant="h5" gutterBottom sx={{marginBottom: 0}}>
                            {this.props.name}
                        </Typography>
                        <Typography color="text.secondary">
                            {this.props.breed}
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <Divider />
                <CardActions disableSpacing sx={{paddingTop: 0}}>
                    <Tooltip title="Profile">
                        <IconButton aria-label="pet settings">
                            <FontAwesomeIcon icon={ faGear } size="sm"/>
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Immunizations">
                        <IconButton aria-label="pet immunization">
                            <FontAwesomeIcon icon={ faSyringe } size="sm"/>
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Appointments">
                        <IconButton aria-label="pet appointments">
                            <FontAwesomeIcon icon={ faCalendarCheck } size="sm"/>
                        </IconButton>
                    </Tooltip>
                </CardActions>
            </Card>
        )
    }
}