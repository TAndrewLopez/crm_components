import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type Props = {};

const HomePage = ({ }: Props) => {
    return (
        <div className="bg-primary/15 h-full flex flex-col">
            <div className="h-full flex">
                <div className="flex-1 hidden xl:block">
                    <div className="flex gap-x-3">
                        <Link href='/dashboard'>Dashboard</Link>
                        <Link href='/submissions'>Submissions</Link>
                        <Link href='/calendar'>Calendar</Link>
                        <Link href='/messages'>Messages</Link>
                        <Link href='/contacts'>Contacts</Link>
                    </div>
                </div>
                <div className="flex-1 flex items-center justify-center pt-4 xl:border-l xl:border-primary/20">
                    <Tabs defaultValue="client" className="w-[400px]">
                        <TabsList className="grid w-full grid-cols-3">
                            <TabsTrigger value="client">Client</TabsTrigger>
                            <TabsTrigger value="admin">Admin</TabsTrigger>
                            <TabsTrigger value="owner">Owner</TabsTrigger>
                        </TabsList>
                        <TabsContent value="client">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Client Login</CardTitle>
                                    <CardDescription>
                                        Login as a client to submit a payment, view your history, or
                                        submit a new request.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-2">
                                    <div className="space-y-3">
                                        <div className="space-y-1">
                                            <Label htmlFor="email">Email</Label>
                                            <Input id="email" placeholder="Enter email" />
                                        </div>
                                        <div className="space-y-1">
                                            <Label htmlFor="password">Password</Label>
                                            <Input
                                                id="password"
                                                placeholder="Enter password"
                                                type="password"
                                            />
                                        </div>
                                        <Button
                                            className="w-full" type="submit" variant="primary">
                                            Submit
                                        </Button>
                                    </div>
                                </CardContent>
                                <CardFooter>
                                    <div className="text-sm">
                                        <p>
                                            Don&apos;t have an account? Register
                                            <span className="cursor-pointer pl-1 hover:underline hover:underline-offset-2 hover:text-white text-emerald-500">
                                                here
                                            </span>
                                            .
                                        </p>
                                    </div>
                                </CardFooter>
                            </Card>
                        </TabsContent>
                        <TabsContent value="admin">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Admin Login</CardTitle>
                                    <CardDescription>
                                        Review and manager submissions. Manage calendar events and
                                        collaborate with the team.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-2">
                                    <div className="space-y-3">
                                        <div className="space-y-1">
                                            <Label htmlFor="email">Email</Label>
                                            <Input id="email" placeholder="Enter email" />
                                        </div>
                                        <div className="space-y-1">
                                            <Label htmlFor="password">Password</Label>
                                            <Input
                                                id="password"
                                                placeholder="Enter password"
                                                type="password"
                                            />
                                        </div>
                                        <Button type="submit" variant="primary">
                                            Submit
                                        </Button>
                                    </div>
                                </CardContent>
                                <CardFooter>
                                    <div className="text-sm">
                                        <p>
                                            Need help? Contact administrator for assistance.
                                        </p>
                                    </div>
                                </CardFooter>
                            </Card>
                        </TabsContent>
                        <TabsContent value="owner">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Owner Login</CardTitle>
                                    <CardDescription>
                                        View Dashboard and metrics, manage submissions, and manage
                                        users.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-2">
                                    <div className="space-y-3">
                                        <div className="space-y-1">
                                            <Label htmlFor="email">Email</Label>
                                            <Input id="email" placeholder="Enter email" />
                                        </div>
                                        <div className="space-y-1">
                                            <Label htmlFor="password">Password</Label>
                                            <Input
                                                id="password"
                                                placeholder="Enter password"
                                                type="password"
                                            />
                                        </div>
                                        <Button type="submit" variant="primary">
                                            Submit
                                        </Button>
                                    </div>
                                </CardContent>
                                <CardFooter>
                                    <div className="text-sm">
                                        <p>
                                            Need help? Contact developers for assistance.
                                        </p>
                                    </div>
                                </CardFooter>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
