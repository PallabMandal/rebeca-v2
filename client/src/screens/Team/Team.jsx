import React, { useState, useEffect } from "react";
import Heading from "../../components/Heading/Heading";
import "./Team.css";
import {
    Accordion,
    AccordionDetails,
    Button,
    AccordionSummary,
    Card,
    CardContent,
    Typography,
    CircularProgress,
    Container,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { getAllAdmins } from "../../services/userApi";
import CustomAvatar from "../../components/CustomAvatar/CustomAvatar";
import {
    AdminPanelSettings,
    AttachMoney,
    Palette,
    Event,
    Info,
    DirectionsBus,
    Handshake,
    Article,
    Campaign,
    Brush,
    Groups,
    Code,
    Restaurant,
    VolunteerActivism,
    CameraAlt,
    AssignmentInd,
    AccountBalance,
    MenuBook,
} from "@mui/icons-material";
import { useAuth } from "../../AuthContext";
import { skeleton } from "../../AuthContext";

const profs = [
    { name: "Dr. Nityananda Nandi", position: "Chairperson", img: "./assets/imgs/team/nityanandanandi.webp" },
    { name: "Dr. Ananya Barui", position: "Joint Convenor", img: "./assets/imgs/team/ananyabarui.webp" },
    { name: "Dr. Subhabrata Koley", position: "Joint Convenor", img: "./assets/imgs/team/subhabratakoley.webp" },
    { name: "Dr. Santanu Maity", position: "Treasurer", img: "./assets/imgs/team/santanumaity.webp" },
];

const TeamLoading = () => {
    return (
        <div className="teamspage-loading">
            <Card sx={{ width: "min(100%, 400px)" }}>
                <CardContent style={{ display: "flex", alignItems: "center", flexDirection: "column", width: "100%" }}>
                    <CircularProgress color="primary" size={80} thickness={5} />
                    <Typography variant="h5">Hang tight, Fetching Teams Data...</Typography>
                    <Typography variant="body1" color="grey" sx={{ mb: 2, textAlign: "center" }}>
                        The best part of any party? When it becomes a story you swear you'll never tell.
                    </Typography>
                </CardContent>
            </Card>
        </div>
    );
};

function ProfessorsList() {
    return (
        <Container
            sx={{
                maxWidth: "1200px",
                padding: 3,
                margin: "0 2rem",
                gap: 4,
                borderRadius: "5px",
                bgcolor: "hsla(237, 100%, 70%, 0.2)",
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                alignItems: "start",
            }}
        >
            {profs.map((professor, i) => {
                return (
                    <CustomAvatar
                        title={professor.name}
                        src={professor.img}
                        subtitle={professor.position}
                        icon={skeleton[0].icon}
                    />
                );
            })}
        </Container>
    );
}

const Team = () => {
    // const [teamsData, setTeamData] = useState(skeleton);
    // const [loading, setLoading] = useState(false);
    const {teamsData, teamsLoad} = useAuth()

    // useEffect(() => {
    //     const handleFetchAdmins = async () => {
    //         try {
    //             setLoading(true);
    //             const res = await getAllAdmins();
    //             const admins = res.data?.data;
    //             console.log(admins);
    //             const nteamsData = JSON.parse(JSON.stringify(skeleton));
    //             admins.map((admin) => {
    //                 var index = teamNameToId[admin.team];
    //                 nteamsData[index - 1]?.members.push(admin);
    //             });
    //             setTeamData(nteamsData);
    //         } catch (err) {
    //             console.log(err);
    //         } finally {
    //             setLoading(false);
    //         }
    //     };

    //     handleFetchAdmins();
    // }, [user]);

    if (teamsLoad) {
        return <TeamLoading />;
    }

    return (
        teamsData &&
        !teamsLoad && (
            <div className="team">
                <h1>Meet Our Team</h1>
                <ProfessorsList />
                <Container className="team-container">
                    {teamsData.map((teamData, i) => {
                        if (teamData.members.length === 0) return;
                        console.log(teamData);

                        return (
                            <Accordion
                                sx={{ m: 0, p: 0 }}
                                slotProps={{ heading: { component: "h2" } }}
                                disableGutters
                                elevation={3}
                                key={i}
                            >
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1-content"
                                    id="panel1-header"
                                >
                                    <div className="accordion-h">
                                        <div>{skeleton[i].icon}</div>
                                        {teamData.team}
                                    </div>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Container
                                        sx={{
                                            p: 2,
                                            display: "flex",
                                            flexWrap: "wrap",
                                            gap: 2,
                                            bgcolor: "#171717",
                                            borderRadius: "5px",
                                        }}
                                    >
                                        {teamData.members.map((member, ki) => {
                                            return (
                                                <CustomAvatar
                                                    title={member.name}
                                                    src={member.image}
                                                    subtitle={member.position}
                                                    phone={member.phone}
                                                    icon={skeleton[i].icon}
                                                    key={ki}
                                                />
                                            );
                                        })}
                                    </Container>
                                </AccordionDetails>
                            </Accordion>
                        );
                    })}
                </Container>
            </div>
        )
    );
};

export default Team;
