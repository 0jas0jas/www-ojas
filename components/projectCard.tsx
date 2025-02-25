import React, { FC } from "react";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Avatar } from "@nextui-org/avatar";
import { Button } from "@nextui-org/button";
import Link from "next/link";

export interface projectCardProps {
    projectName: string;
    skills: string;
    monthYear: string;
    url: string;
    desc: string;
}

export const ProjectCard: FC<projectCardProps> = ({
    projectName, skills, monthYear, url, desc
}) => {
    console.log("Hereeee");
    return (
        <Card className=" p-4 grid grid-cols-2 gap-6">
            <CardHeader className="justify-between">
                <div className="flex gap-5">
                    <div className="flex flex-col gap-2 items-start justify-center">
                        <h4 className="text-6xl font-semibold leading-none text-default-600">{projectName}</h4>
                        <h4 className="text-large font-semibold text-right leading-none text-default-300">{monthYear}</h4>
                        <h5 className="text-3xl tracking-tight text-default-500">{skills}</h5>
                    </div>
                </div>
                {/* <Button
                    className={isFollowed ? "bg-transparent text-foreground border-default-200" : ""}
                    color="primary"
                    radius="full"
                    size="sm"
                    variant={isFollowed ? "bordered" : "solid"}
                    onPress={() => setIsFollowed(!isFollowed)}
                >
                    {isFollowed ? "Unfollow" : "Follow"}
                </Button> */}
            </CardHeader>
            <CardBody className="p-3 py-0 text-default-400">
                <div className="h-12"></div>
                <p>{desc}</p>
            </CardBody>
            <CardFooter className="px-3 gap-3">
                <Link href={url}>
                    <Button className="flex gap-1" color="primary">
                        <p className="text-default ">GitHub</p>
                    </Button>
                </Link>
                {/* <div className="flex gap-1">
                    <p className="font-semibold text-default-400 text-small">97.1K</p>
                    <p className="text-default-400 text-small">Followers</p>
                </div> */}
            </CardFooter>
        </Card>
    );
}
